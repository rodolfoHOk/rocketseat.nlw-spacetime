import './globals.css'
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjurre,
} from 'next/font/google'

import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'
import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjurre = BaiJamjurre({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-jamjurre',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React.Js, Next.Js, Tailwind CSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjurre.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen md:grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-6 py-4 md:px-28 md:py-16">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full border-r border-white/10 bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 hidden w-2 bg-stripes md:block" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <div className="hidden md:block">
              <Copyright />
            </div>
          </div>

          {/* Right */}
          <div className="relative flex max-h-screen flex-col bg-[url(../assets/bg-stars.svg)] bg-cover md:overflow-y-scroll">
            {/* Stripes */}
            <div className="absolute bottom-0 left-1.5 top-0 w-2 bg-stripes md:hidden" />

            {children}

            <div className="flex items-center justify-center pb-4 md:hidden">
              <Copyright />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
