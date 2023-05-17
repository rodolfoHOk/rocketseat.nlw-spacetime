# 🚀 NLW Spacetime - Server 🚀

> NLW Spacetime Server Project: created during RocketSeat's NLW Setup event

## 👨‍💻 Main technologies 👩‍💻

- Typescript
- Node Js
- Fastify
- Prisma
- SQLite

### 📚 Additional libraries 🗃️

- eslint
- @rocketseat/eslint-config
- zod
- @fastify/cors

## 📃 Setup Guide (Portuguese) 📖

- Iniciando projeto NodeJs: npm init -y

- Instalando o Typescript: npm install -D typescript

- Instalando a tipagem do node: npm install -D @types/node

- Configurando o Typescript no projeto:

  - npx tsc --init
  - tsconfig.json: "target": "es2020"

- Instalando o tsx: npm install -D tsx

- Configurando o tsx no projeto: package.json:

        "scripts": {
          "dev": "tsx watch src/server.ts"
        },

- Rodando o projeto com Typescript: npm run dev

- Instalando o Fastify: npm install fastify

- Instalando o EsLint: npm install -D eslint

- Configurando o EsLint no projeto: 

  - .eslintrc.json:

        {
          "extends": ["@rocketseat/eslint-config/node"]
        }


  - package.json:

        "scripts": {
          "dev": "tsx watch src/server.ts",
          "lint": "eslint src --ext .ts --fix"
        },

- Instalando o Prisma: npm install -D prisma

- Iniciando o Prisma no projeto: npx prisma init --datasource-provider SQLite

- Criando migration no Prisma: npx prisma migrate dev

- Verificar banco de dados no Prisma: npx prisma studio

- Instalando o prisma client: npm install @prisma/client

## 🔗 Projects repositories links ✨

- [Server project](https://github.com/rodolfoHOk/rocketseat.nlw-spacetime/tree/main/server)

- [Web project](https://github.com/rodolfoHOk/rocketseat.nlw-spacetime/tree/main/web)

- [Mobile project](https://github.com/rodolfoHOk/rocketseat.nlw-spacetime/tree/main/mobile)


1:14:00
