# REUS


## DESCRIPTION

This is a web application that allows the users to give a new life to items that they don’t use anymore or even find products that he never knew he needed. The user can create the products that he wishes to donate and manage the alerts related to them.

## USER STORIES

- **404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **Homepage - As a Donee, I want to be able to sign up, log in, see the products available and make a request on the products that I want. As a Donor, I want to be able to sign up and log in so I can access my profile.
- **Sign up - As a user I want to sign up on the webpage.
- **Login - As a user I want to be able to log in on the webpage.
- **Logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Profile - As a Donor I want to be able to create new products, update and delete the products previously added and check for the alerts sent regarding my products.

<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions 		   | Behavior                                                      |
| ------------------------- | ------------------------------ | --------------------------- | ------------------------------------------------------------- |
| `/`                       | SplashPage                     | public `<Route>`            | Home page: List all products                             	   |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage or profile   |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to login after logout				   |           
| `/profile`                | Profile	                     | user only  `<PrivateRoute>` | Check profile with stat information                           |

## Components

- SignupForm

- LoginForm

- SingleProduct

- ListProductsHome

- ListAlerts

- LayoutComponent

- EditProduct

- DeleteAllProductsButtons

- CreateProducts

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Home Products Service 
  - alerts(user: donor)

- Profile Service
  - products

<br>

# Server / Backend

## MODELS

Donor model

```javascript
{
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    enum: ["donor", "donee"],
    required: true,
  },
  productList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  alertsList: [{ type: Schema.Types.ObjectId, ref: "Alert" }]
}
```

Donee model

```javascript
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: ['donor', 'donee'],
      required: true,
    },
  }
```

Product model
```javascript
{
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  donor: { type: Schema.Types.ObjectId, ref: "Donor" }
}
```

Alert model
```javascript
{
  donee: { 
      type: Schema.Types.ObjectId, ref: "Donee", required: true
  },
  donor: {
    type: Schema.Types.ObjectId, ref: "Donor", required: true
  },
  product: { 
      type: Schema.Types.ObjectId, ref: "Product", required: true 
}
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`               | {role, name, email, password}      | 201            | 400          | Checks if fields not empty (400) and user not exists (400), checks if the user is donor or donee (400) then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {role, email, password}         | 200            | 400          | Checks if fields not empty (400), if user exists (400), and if password matches (400), checks if the user is donor or donee (400) then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                          |                                             |
| GET         | `/products`             |                              |                | 400          | Show all products                                          |
| PUT         | `/products`                 |                              | 200            | 400          | Edit product                                                  |
| DELETE      | `/products/:id`                 |                              | 201            | 400          | Delete product                                            |
| POST         | `/products`                |                              |                | 400          | Creat product                                        |
| GET         | `/alerts`             |                              |                | 400          | Show all alerts                                          |
| PUT         | `/:id`                 |                              | 200            | 400          | Create alert                                                  |

<br>

## LINKS:
### Trello/Kanban

[Link to your trello board](https://trello.com/) 

### Git

[Client repository Link](https://github.com/DaianyNascimento/reus-client)

[Server repository Link](https://github.com/DaianyNascimento/reus-server)

[Deployed App Link](https://ironhack-reus.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1agmgiy67ms3CWZ3cKzA1eqtD2xySUW33IiUz6jy0ouk/)
