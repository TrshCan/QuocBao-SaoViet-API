# SAOVIET API

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

0. Checkout [.env.example](./.env.example)

1. Run depencies

```bash
yarn
```

2. Setup .env (see more .env.example) and docker compose (development)

```bash
yarn dev:services
```

3. Create Generate Prisma Client code (use it to build query postgres)

```bash
yarn db:generate
```

4. OPTION - Create document from Prisma Client by TypeDoc

```bash
yarn typedoc:generate:prisma
```

5. Migrate new Database

```bash
yarn db:migrate
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run documents

1. Compodoc:

```bash
yarn docs:app
```

2. Typedoc - Prisma Client

```bash
npm i serve -g
```

```bash
yarn docs:prisma
```

3. Database markup language

> At [documents/ERD.dbml](./documents/ERD.dbml/schema.dbml)

Copy the schema.dbml content and visualize it as an Entity-Relationship Diagram
> At [dbdiagram](https://dbdiagram.io/d)

## Deployment

## Resources

- [Development Guide](documents/development_guide.md)
- [Lifecycle events in NestJS](https://docs.nestjs.com/fundamentals/lifecycle-events)
- [Query with Prisma](https://docs.nestjs.com/recipes/prisma#create-two-database-tables-with-prisma-migrate)
- [Health check with Terminus](https://docs.nestjs.com/recipes/terminus#healthchecks-terminus)
- [API Reference's NestJS](https://api-references-nestjs.netlify.app/api)
- [Compodoc Reference in NestJS](https://docs.nestjs.com/recipes/documentation)
- [Generates realistic-looking fake data for your Prisma models that can be used in unit/integration tests, demos, and more](https://github.com/luisrudge/prisma-generator-fake-data)
- [Transforms the Prisma schema into Database Markup Language (DBML)](https://notiz.dev/blog/prisma-dbml-generator)
- [Multi file prisma schema](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema)
- [Provision preview databases with GitHub Actions](https://www.prisma.io/docs/guides/github-actions)
- [Prisma openapi](https://github.com/nitzano/prisma-openapi)
- [Reference's TypeDoc](https://typedoc.org/index.html)
