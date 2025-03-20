# Express Setup with Docker Compose

## Setup ENV

```sh
cp .env.example .env
```
#### Fill the google api service and amazone service for store image

## (I).Build Project using docker
#### Your computer must have docker 

```sh
docker compose build
```
## Run Project

```sh
docker compose up -d
```


## (II).Build Project using npm
#### using node 22

```sh
npm install
```

```sh
npm run dev
```

## Run Project

```sh
npm run start
```

## Read the api documentation

```sh
localhost:5000/docs/
```