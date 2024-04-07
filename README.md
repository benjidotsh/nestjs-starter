# nestjs-starter

nestjs-starter is a production-ready NestJS boilerplate that contains everything to quickly set up a new NestJS project. 🚀

## Contents

### Features

- Type-safe environment variables
- Improved logging ([`nest-winston`](https://www.npmjs.com/package/nest-winston))
- Swagger
- Request validation
- API versioning
- Database integration ([Prisma](https://www.prisma.io))

### Security

- Secure HTTP response headers ([`Helmet`](https://www.npmjs.com/package/helmet))
- Cross-Origin Resource Sharing (CORS)
- Rate limiting

### Other

- Node Version Manager configuration
- Improved linting ([`eslint-plugin-simple-import-sort`](https://www.npmjs.com/package/eslint-plugin-simple-import-sort))

## Installation

```bash
$ pnpm install
```

## Setting up a local database environment

We use [Docker Desktop](https://www.docker.com/products/docker-desktop) to set up a local database environment.

```bash
$ pnpm run setup:dev
```

This will set up a [Redis](https://redis.io) and a [PostgreSQL](https://www.postgresql.org) database.

Now we need to create the database:

```bash
$ pnpm run db:deploy
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Database

```bash
# apply pending migrations (and create the database if it doesn't exist)
$ pnpm run db:deploy

# generate a new migration
$ pnpm run db:migrate

# reset the database
$ pnpm run db:reset
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](LICENSE)
