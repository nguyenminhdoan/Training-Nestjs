
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Config to use

We use MongoDB for database so please following the config below to use

in app.module file change path
MongooseModule.forRoot('mongodb://your host mongo/name')

in app.e2e-spec file change path
mongoose.connect('mongodb://your host mongo/name')

## set up Docker

# Run in Docker

docker-compose up

# use -d flag to run in background

# Tear down

docker-compose down

# To re-build

docker-compose build

## Vagrant set up

## Init vagrant

vagrant up

## Update vagrant file

vagrant reload

## control vagrant from host

vagrant ssh
