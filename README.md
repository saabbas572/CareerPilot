# CareerPilot

CareerPilot will be a full-stack, generative AI-powered job preparation application designed to help users optimize their resumes and prepare for interviews. Development is currently in the early backend stage, with user authentication as the first implemented feature set.

## Current Progress

- Express application and development server are set up.
- MongoDB connection is configured with Mongoose.
- User schema includes a unique username, unique email, and password.
- Registration checks required fields and existing users, hashes passwords with bcrypt, creates a user, and issues a JWT in a cookie.
- Login checks credentials, compares the password hash, and issues a JWT in a cookie.
- The register and login APIs have been tested with Postman.
- Logout and server-side token revocation are not implemented yet.

The current codebase is an in-progress backend foundation; the full application, frontend, and AI-powered resume and interview preparation features are still under development.

## Current Backend Stack

- Node.js and Express 5
- MongoDB and Mongoose
- bcrypt for password hashing
- JWT for authentication
- Cookies for delivering the token
- nodemon for local development

## Planned Application Stack

- Frontend: React.js
- Backend: Node.js and Express.js
- Authentication: JWT with server-side token blacklisting for logout/revocation
- Generative AI: Gemini API
- PDF generation: Puppeteer

The React frontend, Gemini integration, Puppeteer-based PDF generation, and token-blacklisting logout flow are planned and are not implemented in the current codebase yet.

## Getting Started

### Requirements

- Node.js and npm
- A MongoDB connection string

### Install and configure

```bash
npm install
```

Create a `.env` file in the project root with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
```

Start the development server:

```bash
npm run dev
```

The server listens on port `3000`.

## Authentication API

Base path: `/api/auth`

### Register

`POST /api/auth/register`

JSON body:

```json
{
  "username": "jordan",
  "email": "jordan@example.com",
  "password": "your-password"
}
```

On success, returns HTTP `201`, a success message, the new user's ID, username, and email, and sets a `token` cookie. Missing fields or an existing email/username return HTTP `400`.

### Login

`POST /api/auth/login`

JSON body:

```json
{
  "email": "jordan@example.com",
  "password": "your-password"
}
```

On success, returns HTTP `200`, a success message, the user's ID, username, and email, and sets a `token` cookie. Missing fields or invalid credentials return HTTP `400`.

## Logout and Token Revocation

There is no logout endpoint yet. Clearing a cookie in the browser removes it from that browser, but it does not invalidate a copied JWT; that token can remain usable until it expires. Server-side revocation requires the backend to reject revoked tokens, for example through a token denylist or a server-side session/version check. The client should also clear its cookie when logging out. This project has not implemented those steps yet.

## Learning Context

The project is being developed while following lessons from [Sheryians Coding School](https://www.youtube.com/@sheryians), taught by Ankur Prajapati. One key takeaway so far is understanding the difference between clearing a browser cookie and invalidating a token on the server.

## Project Structure

```text
server.js
src/
  app.js
  config/
    database.js
  controllers/
    auth.controller.js
  models/
    user.model.js
  routes/
    auth.route.js
```

## Next Steps

- Implement logout with server-side token/session invalidation.
- Add authentication middleware for protected routes.
- Set appropriate cookie security options, including `httpOnly`, `secure` in production, and a deliberate `sameSite` policy.
- Add automated tests and validate edge cases.
- Build the frontend for the full-stack application.
- Add AI-powered resume optimization and interview preparation features.