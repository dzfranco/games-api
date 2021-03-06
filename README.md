# My Microservice

This repo is just a simple games management API sample

- [My Microservice](#my-microservice)
  - [About this repo](#about-this-repo)
  - [Starting this project](#starting-this-project)
  - [Endpoints](#endpoints)
  - [Other Goodies](#other-goodies)

## About this repo

This repo uses the following technologies

-   [TypeScript](https://github.com/Microsoft/TypeScript) - Main Language
-   [Backpack](https://github.com/jaredpalmer/backpack) - Building Tooling based on Webpack
-   [InversifyJS](https://github.com/inversify/InversifyJS) - Inversion of Control
-   [TypeORM](https://typeorm.io/#/) - ORM for typescript
-   [MySQL](https://www.mysql.com/) - Database engine
-   [Jest](jestjs.io) - Testing utils
-   [Docker](https://www.docker.com) - Containerization platform

## Starting this project

To develop this project you can use Docker Compose and run the following command:

```bash
$ docker-compose up
```

That should start MySQL and the project. You could also run the following and run the container with an active MySQL Database.

```bash
 docker build -f ./Docker/Dockerfile.staging -t myContainer .
```

This option should take into account the variables on the `staging.env` file.

## Endpoints

The endpoints can be found [here](https://danielfranco.docs.apiary.io/#reference)

## Other Goodies

There is an example deployment for a Kubernetes integration (i.e Rancher)