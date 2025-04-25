# Full Stack Todo List App

This project was made to showcase my understanding of middleware in express, as well as JWTs and backend integration with react!

## Getting started

To start, make sure you're in the route directory, and run

```bash
npm install

npm run install-all

npm run dev
```

These commands will install all dependencies project-wide, and then run both the frontend and backend server.

## Task requirements

- The user is able to securely register and log in

  - This is done by using JWTs and password encrypting with bcrypt.
  - The user is able to click "remember me" in order to extend the expiration of their token

- The user is able to add/edit/remove/read tasks

  - I decided to also implement individual list pages, so the user can seperate tasks into categories if they wish
    (This was inspired by Notion.io)

- I've implemented middleware to:

  - Forbid all request from users who's emails do not end wil the substring @gmail.com
  - Reject the addition of tasks that exceed 140 characters
  - Reject any requests that are not of JSON content-type

- The user can only do any of this if they are logged in

- The app connects to a MongoDB cluster

## Additional bits

- I decided to use tailwindCSS to aide my styling of the webapp

## Improvements

- When researching, I heard about refresh tokens, which I think would be a great addition to this page in order to prevent a user's session expiring after 1h

- As I was developing this, I started debating whether it's best to update the global store and the DB seperately, or both at the same time. As a result, there are some functions that rely on a database fetch to update the store, and some that do it indepentantly. This could obviously be a bit messy
