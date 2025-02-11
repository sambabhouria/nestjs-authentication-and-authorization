# Nestjs Authentication and Authorization

In this backend app will go step by step on how to create a security (Authentication and Authroizaion) app using Nest (NestJS) framework

<p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

# A- Authentication

Authentication is an essential part of most applications. There are many different approaches and strategies to handle authentication.

## Creating an authentication module

We'll start by generating an "AuthModule" and in it, an "AuthService" and an "AuthController". We'll use the "AuthService" to implement the authentication logic, and the AuthController to expose the authentication endpoints.

<p align="center">
  1.  <img src="./1-auth-module.png" width="120" height="120" alt="auth module" />
</p>
## Creating user module

As we implement the AuthService, we'll find it useful to encapsulate user operations in a UsersService, so let's generate that module and service now:

<p align="center">
  2.  <img src="./2-user-module.png " width="120" height="120"  alt="user module" />
</p>
# Implementing the authentication guard

Protecting endpoints by requiring a valid JWT be present on the request.
We'll do this by creating an AuthGuard that we can use to protect our routes.

<p align="center">
  2.  <img src="./4-ahtGard.png "  width="120" height="120"  alt="auth gard" />
</p>
We're applying the AuthGuard that we just created to the GET /profile route so that it will be protected.

Ensure the app is running, and test the routes using cURL

<p align="center">
  5.  <img src="./5-curl.png " width="120" height="120" alt="curl" />
</p>
<p align="center">
  6.  <img src="./6-aunauthorized.png " width="120" height="120" alt="curl" />
</p>
<p align="center">
  7.  <img src="./7-authorized-user.png " width="120" height="120" alt="authorized" />
</p>
<p align="center">
  8.  <img src="./8-epire-token.png " width="120" height="120" alt="expire-token" />
</p>
<p align="center">
  9.  <img src="./9-get-profile.png " width="120" height="120"  alt="get-profile" />
</p>  
# B- Authorization

Authorization refers to the process that determines what a user is able to do. For example, an administrative
user is allowed to create, edit, and delete posts. A non-administrative user is only authorized to read the posts.
Authorization is orthogonal and independent from authentication. However, authorization requires an authentication mechanism.
