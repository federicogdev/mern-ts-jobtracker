# MERN Job Tracker API

A Job tracking API with User Auth and simple CRUD operations

## Installation & Run

```bash
# Clone the repo
git clone https://github.com/federicogdev/mern-ts-jobtracker.git
```

Before running API server, make sure to create a .env file in the root directory of the project.

```
PORT = Your desidered port
MONGO_URI = Your mongo connection URI
JWT_SECRET = Your generated JWT Secret
```

```bash
# Build and Run

cd mern-ts-jobtracker
npm install
npm run dev

# API Endpoint : http://localhost:PORT -> this will be replaced to the value specified in the .env file
```

## Structure

```
└── src
   ├── index.ts                    // Server entry point
   ├── .env                        // Enviroment variabes setup
   │
   ├── controllers                 // Our application controllers
   │   ├── auth-controller.ts      // Authentication related controller
   │   └── job-controller.ts       // Jobs related controller
   │
   ├── middleware                  // Our application middlewares
   │   ├── auth-middleware.ts      // Auth related middleware
   │   └── error-handler.ts        // Error related handler/middleware
   │
   ├── models                      // Our application models
   │   ├── user-model.ts           // User models and schema
   │   └── job-model.ts            // Job models and schema
   │
   ├── routes                      // Our application routes
   │   ├── auth-routes.ts          // Authentication routes
   │   └── job-routes.ts           // Job routes
   │
   ├── services                    // Our application services
   │   ├── auth-services.ts        // Authentication services
   │   └── job-services.ts         // Job services
   │
   ├── types                       // Our application type definitions
   │   ├── user-types.ts           // Typescript User types/interfaces
   │   ├── jwt-types.ts            // Typescript JWT types/interfaces
   │   └── job-types.ts            // Typescript Job types/interfaces
   │
   └── util                        // Our apllication utils
       └── ...                     // Different utils for all around use in the server
```

## API

#### /auth/register

- `POST` : Registers a new user

#### /auth/login

- `POST` : Logs in a user

#### /jobs

- `GET` : Get an array of Jobs created by the logged in user
- `POST` : Create a new job

#### /jobs/:id

- `GET` : Gets a specific Job based req.params.id created by the logged in user
- `PUT` : Updates a spacific Job based on req.params.id created by the logged in user
- `DELETE` : Deletes a spacific Job based on req.params.id created by the logged in user

#### /jobs/stats

- `GET` : Get statistics about the user's Jobs

## Todo

- [x] Support basic REST APIs.
- [x] Support Authentication with user for securing the APIs.
- [ ] Write the tests for all APIs.
- [x] Organize the code with packages
- [ ] Building a deployment process
