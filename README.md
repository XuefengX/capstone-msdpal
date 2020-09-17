# MSDPal
MSDPal alumni community.

## Development plan: 
### Goal: 

Build a server-side rendering responsive web app for MSD faculties and alumni. 
With MSDPal, you can scan MSD news, find interested alumni, and send posts about recruitment, internship or everyday life. Our goal is to promote long-term interaction between MSD alumni, building our own network and sharing information in order to help each other.

### App Features: 

#### Basic Functions:
* Browse official news posted by the MSD faculties.
* Register as an alumni. Choose if you want to reveal some personal and placements info to others. It can strengthen the communication and help current students get help from alumni.
* Post blogs so every alumni can like and comment.
* (Optional) Send instant messages to whoever you want to talk.
* (Optional) Build iOS and Android apps with the same functions using react native.
#### Users w/ Different Authority
* Authorization system ensure that different user have different access to functions of the app: Faculties as administrators can manage and delete users and see all the informations. Alumni can see other people’s public account info and posts. Visitors can only scan the news about MSD program. 
* Invitation Code will send manually to invite faculties and alumni to create account. Visitors cannot sign up.  
#### Responsive Web App
* The web layout will be responsive and optimized for the mobile device. The grid system will ensure that the user can get the best visual experience in both desktop and mobile device.
#### Server-side Rendering:
* React is a single-page web application framework so a lot of computations will happen in the client side (inside the browser). To improve the main page performance, we will use NextJS framework to render the main page inside the server and send directly to the client. 
* Since the main page is open for everyone (who don’t even have an account), the server-side rendered main page is also good for the search engine so more people will have the chance to know our MSD program.
#### Microservice Backend:
* Each service will run independently. Even if a service goes wrong, the other services will keep running properly. 
* Services will communicate with each other using standard messages and errors through the event bus. So each service can develop and test independently. We can add more features in the future easily without touching any code we have so far (We can even use a different language and a different framework to build new services). 
* Docker, Kubernetes and Scaffold will make sure that different services can deploy fast and isolated.

### Technical Stack:

* Frontend: React, JavaScript, NextJS, Material-UI, React Native (Optional)
* Backend: TypeScript, NodeJS, Express, MongoDB, Docker, Kubernetes, NATS, NextJS

### Detailed Plans: 

This is a challenging and real-world project. We understand that we are facing the probabilities that it will not be fully completed. So we are going to develop this app one service at a time. Even some services are not completed at the end, the rest functions will work as expected. The developing plan contains all basic features we want to implement. The optional features will continue to develop once we finish basic ones and publish the web app.
See next page for details.

![working-plan](https://github.com/XuefengX/MSDPal/blob/master/img/working-plan.png?raw=true)

### Backend Design

1. Backend will support 5 different services: Authentication Service, News Service, Posts Service, Comments Service, and Query Service. Those four services communicate with each other by an event bus. The event bus will take whatever message it gets and send it to every services with a type and contents. Services will discard the message with a type they don’t want.
2. Each Service associate with a MongoDB database. Databases will not directly communicate with other services. All data will be passed through the event bus. 
3. Authentication Service will handle registration and store the user’s name, password (hashed) and other info. After the user login, a 15 minutes temporary JWT will be stored in the cookies so other services who need authentication will verify the token. If a user try to delete the account (or the administrator try to delete the account), a delete account event will be send to other services. Other services will temporary remember the deleted user and reject any operation requested by that user.
4. The other three services will be similar to each other and only store and send the data the client needs. 
5. The event bus will use NATS, an open source messaging system. 
6. Each server and database will run in separate docker containers. Kubernetes will be used to manage all containers and build an ingress service for inner communication. I’ll use Google cloud platform for the development and tests, so different services can run on the cloud and Scaffold tools will manage the Kubernetes cluster. 
