# <p align="center">Hurst Hotel</p>
<p align="center">
  <img src="https://github.com/lurickardo/test-hotel-booking/assets/34722198/58dab62b-951c-48f0-82a4-d9c1f0574e13" alt="Logo" width="300">
</p>
<p align="center">Microservices Flow for Hotel Reservations in <a href="https://nodejs.org" target="_blank">Node.js</a> using Fastify.</p>
<p align="center">
  <a><img src="https://img.shields.io/badge/license-MIT-green" alt="Package License" /></a>
  <a href="https://www.npmjs.com" target="_blank"><img src="https://img.shields.io/badge/npm-v10.2.3-green?logo=npm" alt="NPM Version" /></a>
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-v20.10.0-green?logo=nodedotjs" alt="Node Version"></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-v5.3.3-green?logo=typescript" alt="Typescript Version"></a>
  <a href="https://fastify.dev" target="_blank"><img src="https://img.shields.io/badge/fastify-v4.25.2-green?logo=fastify" alt="Fastify Version"></a>
  <a href="https://jestjs.io" target="_blank"><img src="https://img.shields.io/badge/jest-v29.7.0-green?logo=jest" alt="Jest Version"></a>
  <a href="https://biomejs.dev" target="_blank"><img src="https://img.shields.io/badge/biome-v1.5.3-green?logo=biome" alt="Biome Version"></a>
  <a href="https://zod.dev/" target="_blank"><img src="https://img.shields.io/badge/zod-v3.22.4-green?logo=zod" alt="Zod Version"></a>
</p>

## Description

Hotel Booking is a microservices system designed to book a stay at a hotel.

## Comments

The ideal would be for each service to be a lambda, and SQS would trigger the lambdas according to the messages arriving. Due to time, I was unable to develop this part. Unfortunately it was also not possible to do unit testing.

## Diagram
<a href="https://miro.com/app/board/uXjVKGOoZpw=/?share_link_id=530227404362">Diagram Link</a>
<a href="https://miro.com/app/board/uXjVKGOoZpw=/?share_link_id=530227404362" target="_blank"><img src="https://github.com/lurickardo/test-hotel-booking/assets/34722198/8e3df416-ce78-43b7-9dcb-c09332459890" alt="Flow" /></a>
<img src="https://github.com/lurickardo/test-hotel-booking/assets/34722198/a5205ab2-3411-49c2-b94c-68652c886407" alt="Bonus" width="300">

## Installation

Go to each microservice, add your environment variables and run
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production
$ npm run build
$ npm run start:prod
```

## Swagger

`http://localhost:PORT/api/SERVICENAME/docs`

## Postman

Add the file `Hurst Hoteis.postman_collection.json` to your postman to get all the application routes
