![ConsiderHerbsLogo](https://user-images.githubusercontent.com/63110489/107135374-16312700-68c8-11eb-9aec-8244d7c9c410.JPG)

This repository holds the code used for the Consider Herbs web application. This code was developed by students (Team 5 - BMSS Tech) at the University of Florida in the Spring 2021 Introduction to Software Engineering Course (CEN3031).

Consider Herbs aims to educate and show people healthy and natural ways on how to take control of their own well-being. In order to accomplish this, Consider Herbs requires a storefront for users to purchase products, submit testimonials, and view relevant information to educate them on healthy lifestyles.  

# Instructions For Local Set Up

Download Node.js from here: https://nodejs.org/en/download/

Once you clone the repo navigate to the client and server directories on Terminal/Command line interface and run: 

npm ci 

npm start



# Pages Information

## Home Page

The home page will welcome users with information about the website such as a mission statement and contact information.

## Product Page

The product page will allow users to purchase a variety of products, such as tinctures, infused oils, and spice blends. Product information will include pictures, pricing, and descriptions. Purchases will be managed by a shopping cart that email users once a purchase is made. Sales and discounts will be be managed by the site administrator.

## Information Page

The information page will have integration through shared articles and social media platforms such as Instagram. The page will also allow videos to be embedded within. 



# PROJECT ACCOUNT INFORMATION BELOW
User Accounts for ecommerce FireBase:
application.devadm@gmail.com RS2pgU7J8U3QYFH
application.devuser1@gmail.com RS2pgU7J8U3QYFJ

User Accounts for MongoDB Atlas:
application.devmongodbadm@gmail.com RS2pgU7J8U3QYFH
application.devmongodbuser@gmail.com RS2pgU7J8U3
application.devmongodbowner@gmail.com RS2pgU7J8U3QYFI (used to register for MongoDB Atlas free)

MongoDB Users:
Admin: AppDevMongoDBAdm RS2pgU7J8U3QYFH (use this to login and administer database at mongo atlas site)

password: RS2pgU7J8U3QYFH
dbname: AppDevDbase

Connection Info:
mongodb+srv://AppDevMongoDBAdm:<password>@nodeapi.crakh.mongodb.net/<dbname>?retryWrites=true&w=majority


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://AppDevMongoDBAdm:<password>@nodeapi.crakh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

User: AppDevMongoDBUser RS2pgU7J8U3QYFJ

Database(collection): AppDevDbase.NodeAPI

Cloudinary for Images (need URLs in database):
application.devadm@gmail.com
RS2pgU7J8U3QYFH!!
Assigned Cloud Name: dqdpito3m

STRIPE:
application.devadm@gmail.com RS2pgU7J8U3QYFH

SQUARE:
application.devadm@gmail.com RS2pgU7J8U3QYFH
application: ecommerce_ch 

GOOGLE CLOUD PLATFORM MAIL
