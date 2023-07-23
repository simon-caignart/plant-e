# 🚰🪴 PLANT-E

Plant-e is a web application and a prototype of an automatic plant watering system. Plant-e is a connected object powered by an Arduino Nano 33 IOT for the WIFI connection, linked to various sensors, which capture and send the data collected to this web application.

This web application was implemented with the following stack:
- [**TypeScript**](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**Firebase Cloud Messaging**](https://firebase.google.com/products/cloud-messaging): Notifications system
 

## Prerequisites

- Create a GitHub OAuth app to allow signing in via GitHub, you will fill the .env later with the GitHub id and secret.
- Create a PostgreSQL database.

## Getting started - Web App

1. Install dependencies
```
  yarn install
```

2. Clone the .env.example and rename it to .env, then fill it in.

3. Run the database migrations

```
 npx prisma migrate dev
```

4. Finally, run the development server
```
  yarn dev
```

## Getting started - Arduino

You can find the arduino code of the prototype in the `arduino` folder.

- Change the plantId variable in the arduino code, to match the one you use when creating a plant.
- Change the WIFI SSID and Password variables.
- Change the server url to match your web app url.

## Screenshots of the app

![Capture-2022-10-20-181601](https://user-images.githubusercontent.com/44498056/197003155-8a5043b8-f1de-4728-9513-f17b15515bd0.png)

![Capture-2022-10-20-184520](https://user-images.githubusercontent.com/44498056/197009307-cb8a9b03-75d8-4766-ad45-e18d2ded829a.png)

![Capture-2022-10-20-181730](https://user-images.githubusercontent.com/44498056/197003658-ee6bf31f-40eb-46e8-9044-66156abc01dd.png)

![Capture-2022-10-20-181817](https://user-images.githubusercontent.com/44498056/197003682-f0812cb7-b178-42d3-8a03-7cb0b58f9706.png)

## Pictures of the prototype

<p align="center">
  <img alt="Light" src="https://user-images.githubusercontent.com/44498056/197005514-cca3b93f-73ec-4c9c-898a-0ccdd1c4ceb7.png" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="https://user-images.githubusercontent.com/44498056/197342585-666a89cf-e841-4ca2-ba8e-c3ea3ea6dafc.png" width="45%">
</p>

