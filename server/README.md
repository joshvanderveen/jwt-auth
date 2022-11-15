# JWT Authentication Boiler Plate

A JWT based authentication system boiler plate to use as an example for future projects.

## About

Built using NodeJS and ExpressJS as the backend frameworks.

Built with Typescript to safeguard against mistakes.

Uses Mongodb with Mongoose as an ORM interface.

Mongoose models set up fully with Typescript interfaces to further safeguard against mistakes.

Configurable to customise JWT expiries and secrets.

## Setup

- Clone repository
- `cd server`
- `npm run dev`

## Routes

### `/api/v1/auth/register`

Registers a new user by sending a request with the body:

```
{
    "username": "SomeUsername",
    "password": "SomePassword"
}
```

### `/api/v1/auth/login`

Logs in an existing user by sending a request with the body:

```
{
    "username": "SomeUsername",
    "password": "SomePassword"
}
```

### `/api/v1/auth/refresh`

Endpoint to get a new token once it's expired. Sent with the body:

```
{
    "token": "RefreshToken",
}
```

### `/api/v1/test`

Protected endpoint, queried with the header:

```
x-auth-token: "Token"
```

## Future additions

- Add more role based authorisation
- Create seperate role entity to add flexibility to permissions
