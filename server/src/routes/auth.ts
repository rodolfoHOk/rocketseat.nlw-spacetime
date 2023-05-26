import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  const userAgentList = ['okhttp', 'Dalvik', 'AppleWebKit', 'Darwin']

  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const userAgent = request.headers['user-agent']
    const isMobile =
      userAgent &&
      userAgentList.filter((ua) => userAgent.includes(ua)).length > 0

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: isMobile
            ? process.env.GITHUB_MOBILE_CLIENT_ID
            : process.env.GITHUB_WEB_CLIENT_ID,
          client_secret: isMobile
            ? process.env.GITHUB_MOBILE_CLIENT_SECRET
            : process.env.GITHUB_WEB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return {
      token,
    }
  })
}
