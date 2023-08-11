# JWT Authentication Boilerplate

A JWT-based authentication system boilerplate to use as an example for future projects.

## Overview

This boilerplate provides a secure authentication system built using Node.js, Express.js, and TypeScript. It integrates JSON Web Tokens (JWT) for authentication and authorization. By leveraging TypeScript's strong typing and Mongoose's ORM capabilities, it offers a solid foundation for building secure authentication features in your applications.

## Features

- **Node.js and Express.js Backend:** Built with the robust and scalable Node.js runtime and the popular Express.js framework, ensuring efficient server-side operations.

- **TypeScript Implementation:** Developed using TypeScript, which offers static typing and helps catch errors during development, enhancing the reliability of your codebase.

- **MongoDB with Mongoose:** Utilizes MongoDB as the database and employs Mongoose, an Object-Document Mapping (ODM) library, to create well-structured models and enhance data consistency.

- **JWT Customization:** Easily configurable to set JWT expiration times and secrets, allowing you to tailor the authentication system to your application's needs.

## Getting Started

1. **Clone Repository:** Start by cloning this repository to your local machine.

2. **Navigate to Server Directory:** Move into the `server` directory of the cloned repository.

3. **Install Dependencies:** Install the required dependencies by running `npm install`.

4. **Navigate to Client Directory:** Move into the `client` directory of the cloned repository.

5. **Install Dependencies:** Install the required dependencies by running `npm install`.

6. **Run the Server:** Launch the development server using the command `npm run dev` from the root directory of the cloned repository.

## API Routes

### `/api/v1/auth/register`

Registers a new user. Send a POST request with the following JSON body:

```json
{
    "username": "SomeUsername",
    "password": "SomePassword"
}
```

### `/api/v1/auth/login`

Logs in an existing user. Send a POST request with the following JSON body:

```json
{
    "username": "SomeUsername",
    "password": "SomePassword"
}
```

### `/api/v1/auth/refresh`

Refreshes an expired token. Send a POST request with the following JSON body:

```json
{
    "token": "RefreshToken"
}
```

### `/api/v1/test`

A protected endpoint that requires a valid token. Include the token in the `x-auth-token` header.
