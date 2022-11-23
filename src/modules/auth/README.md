# Auth Module

This is a simple auth module with login using `username` and `password`, also called the `Local Strategy` in `Passport`. It also implements the JWT Token for Bearer Authentication. The auth module is built using the following things:

- `Passport`
- `Jwt Module`
- `bcrypt`

## Signup

The signup flow looks like this.

- When the signup endpoint is called with the required body, the signup controller is called.
- The signup controller calls `authService` -> `signUp`, which handles the signUp of the user.
- Inside the `authService`, password sent through the request is hashed and then saved to the database.

## Login

The login flow is a bit more complicated, it follows the following steps.

- The login endpoint is called with the `username` and `password`.
- The login controller is decorated with the `LocalStrategy` AuthGuard which uses the `passport-local` strategy for login.
- Inside `local-strategy.ts` file, the local strategy is defined. This gets called internally by the `AuthGuard`. Here, the `authService` is called to validate the user.
- During validation `auth.service.ts` -> `validateUser`, the password is checked against the hashed password using `bcrypt`. If the password matches, a user is returned, else null is returned and `UnAuthorizedException` is thrown.
- The `LocalAuthGuard` attaches the user to the request.
- Then, the login service is called by the controller `auth.service.ts` -> `login`, which does the work of signing the jwt.
- The login controller signs a payload and returns a response back to the client with the `access_token` and the user details.

## Jwt AuthGuard

A `JwtAuthGuard` has been created inside `guards/jwt.guard.ts`, which can be used in any controllers or individual controller handlers for protected routes.

The JwtStrategy automatically extracts the `Bearer Token` from the request header and validates it. If the token is valid, the route handler will be invoked, else an `UnAuthorizedException` will be thrown.
