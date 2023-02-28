# MERN Job Tracker API

A Job tracking API with User Auth and simple CRUD operations

## Installation & Run

```bash
# Clone this repo
git clone https://github.com/federicogdev/mern-ts-jobtracker.git
```

Before running API server, make sure to create a .env file in the root directory of the project.

```
PORT = Your desidered port
MONGO_URI = Your mongo connection URI
JWT_SECRET = Your desidered JWT Secret
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
   ├── index.ts
   ├── controllers                 // Our application controllers
   │   ├── auth-controller.ts
   │   └── job-controller.ts
   ├── middleware                  // Our application middlewares
   │   ├── auth-middleware.ts
   │   └── erro-handler.ts
   ├── models                      // Our application models
   │   ├── auth-model.ts
   │   └── job-model.ts
   ├── routes                      // Our application routes
   │   ├── auth-routes.ts
   │   └── job-routes.ts
   ├── services                    // Our application services
   │   ├── auth-services.ts
   │   └── job-services.ts
   ├── types                       // Our application type definitions
   │   ├── user-types.ts
   │   ├── jwt-types.ts
   │   └── job-types.ts
   └── util                        // Our apllication utils
       └── ...                     // Different utils for all around use in the server
```
