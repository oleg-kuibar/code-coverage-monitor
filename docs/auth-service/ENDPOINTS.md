# Auth Service Endpoints

## /register
  Endpoint for new user registration.

```
  Request
    Method: POST
    Body:
      json
      {
        "name": "user_name",
        "email": "user_email",
        "password": "user_password"
      }
  Response
    201: Successfully registered
    400: Invalid request body
    409: Email already exists
```

## /login
  Endpoint for user login.

```
  Request
    Method: POST
    Body:
      json
      {
        "email": "user_email",
        "password": "user_password"
      }
  Response
    200: Successful login
    400: Invalid request body
    401: Incorrect email or password
```

## /reset-password
  Endpoint for password reset.

```
  Request
    Method: PATCH
    Body:
      json
      {
        "email": "user_email",
        "password": "new_password"
      }
  Response
    200: Successful password reset
    400: Invalid request body
    401: Email not found
```

## /logout
  Endpoint for logout.

```
  Request
    Method: POST
  Response
    200: Successful logged out
    400: Failed to logout
```
