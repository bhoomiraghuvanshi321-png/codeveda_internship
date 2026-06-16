#  Level 1 - User Management System

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: HTML, CSS, Vanilla JavaScript
- API Testing: Postman

## How to Run
1. Backend: `cd task2-rest-api && npm install && npm start`
2. Frontend: Open `task3-frontend/index.html` with Live Server
3. API runs on `http://localhost:3000`

## Features
- GET, POST, DELETE API endpoints
- Frontend connected via fetch API
- Add, view, delete users


# Level 2 — User Management Web App with Database + Login

### Features Implemented
- **Email Indexing**: Added `index: true` to User schema for faster queries
- **Uniqueness Constraint**: Added `unique: true` to prevent duplicate emails
- **Validation Testing**: Verified with Postman - 201 for new user, E11000 for duplicate
- **Documentation**: Complete process documented in `Notes.txt`

### Tech Stack
Node.js, Express.js, MongoDB, Mongoose, Postman

### Screenshots
See `/screenshots` folder for validation proof:
- `screenshot_201_created.png` - Successful user creation
- `screenshot_duplicate_error.png` - Duplicate email error

### How to Run
1. `npm install`
2. `node server.js`
3. API runs on `http://localhost:3000`

#CodvedaJourney #CodvedaExperience Level 2 DONE!
