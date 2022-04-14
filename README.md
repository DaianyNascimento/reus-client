# REUS


## DESCRIPTION

This is a web application that allows the users to give a new life to items that they don’t use anymore or even find products that he never knew he needed. The user can create the products that he wishes to donate and manage the alerts related to them.

## USER STORIES

404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
Homepage - As a Donee, I want to be able to sign up, log in, see the products available and make a request on the products that I want. As a Donor, I want to be able to sign up and log in so I can access my profile.
Sign up - As a user I want to sign up on the webpage.
Login - As a user I want to be able to log in on the webpage.
Logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
Profile - As a Donor I want to be able to create new products, update and delete the products previously added and check for the alerts sent regarding my products.

## ROUTES

//INDEX
GET /
renders the Homepage

POST /:id
creates a new alert

//AUTH
GET /auth/signup
redirects to / if user logged in
renders the signup form

POST /auth/signup
redirects to / if user logged in
body:
username
password

GET /auth/login
redirects to / if user logged in
renders the login page
POST /auth/login
redirects to / if user logged in
body:
username
password

POST /auth/logout
Render the login

//PROFILE
GET /profile/products
renders the profile page and the list of products
body: 
	_id, 
	title, 
	description, 
	image


POST /profile/products
renders the form to create the product

PUT /profile/products
renders the form to update the product

DELETE /profile/products/:id
deletes product

## MODELS

DONOR - name: String, email: String, password: String, role: String, productList:[ Schema.Types.ObjectId], alertsList:[ Schema.Types.ObjectId] 
DONEE - name: String, email: String, password: String, role: String
ALERT - donee:[ Schema.Types.ObjectId], donor:[ Schema.Types.ObjectId], product: donee:[ Schema.Types.ObjectId] 
PRODUCT - title: String, description: String, image: String, donor:[ Schema.Types.ObjectId] 

## ADDITIONAL LINKS:

Link to the application: https://ironhack-reus.netlify.app
Link to the presentation: https://docs.google.com/presentation/d/1agmgiy67ms3CWZ3cKzA1eqtD2xySUW33IiUz6jy0ouk/edit?usp=sharing
