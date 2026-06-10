# Task 2 - User Management REST API

## Description
Node.js + Express + MongoDB is used to make CRUD API. Users can be Created, Read, Updated, Deleted.

## Tech Stack
- Node.js
- Express.js  
- MongoDB + Mongoose
- dotenv, cors

## How to Run
1. `npm install`
2. Add `.env` file in  `MONGO_URI`
3. `node index.js`
4. Server runs on port 3000

## API Endpoints
- GET /users - brings all users
- POST /users - create new user
- DELETE /users/:id - delete user