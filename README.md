# Server Base - Proyecto ONG

💻 It is a NodeJS grupal project for <a href="https://www.alkemy.org/"/>Alkemy</a> developing website backend. 

* Database creation (mySql)
* API rest building (Express and Sequelize)
* Functionalities: register, login, mailing, Amazon S3 store, Mercado SDK
* Documentation: Swagger
* Testing: Mocha-Chai
* Organization: SCRUM
* Managment soft: Jira

## Envinroment setup

Create a db called ong, install dependencies, execute migrations, seeders and start local server

    npm install
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    npm start

It will be deployed soon!

## Contributors contact info

* Zayra Velasco linkedIn ☞ <a href="https://www.linkedin.com/in/zayra-velasco">linkedIn</a> / <a href="mailto:zayra.contacto@gmail.com">email</a>

## Snips

<p align="center">Project Structure</p>

![imagen](https://user-images.githubusercontent.com/95602965/192578852-f8526ea6-cb4f-4b7f-a7f1-82a9c65dd2f3.png)

<p align="center">Documentation</p>

![imagen](https://user-images.githubusercontent.com/95602965/192575687-ca8e291d-66bb-4e08-b246-3a630e070d6d.png)

<p align="center">Some endpoints</p>


![imagen](https://user-images.githubusercontent.com/95602965/192579380-c36f67b0-6080-404f-b6fa-cb21e8742f69.png)

![testimony getAll 2](https://user-images.githubusercontent.com/95602965/192578476-03d00bac-c4c1-44e8-9070-9baa0e046151.png)

<p align="center">Testing</p>

![testimonies get](https://user-images.githubusercontent.com/95602965/192578329-e1e43f78-ae4f-4a76-bfed-6fff43e781d0.png)

<p align="center">Mercado Pago payment</p>

![donation 2-approved](https://user-images.githubusercontent.com/95602965/192578142-e09f11fd-5b30-4103-bdb8-700b469eacfd.png)

* Test User

    "id": 46,
    "firstName": "AdminUser",
    "lastName": "lastName",
    "email": "myAdminUser@gmail.com",
    "password": "$2b$10$pXJOYoCjLNSqPURL8.qxLe/rQVIXItYPbsdoMmMe2FuMX7Z/PeOxK",
    "image": "http://adminUserImage.jpg",
    "roleId": 1,

Good Life! ( ͡~ ͜ʖ ͡°)
