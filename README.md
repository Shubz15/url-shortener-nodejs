# URL Shortener with Stateful Authentication

A URL Shortener web application built using **Node.js, Express.js, MongoDB, and EJS**. The application allows users to register, log in, generate short URLs, track click analytics, and manage their URLs through a simple dashboard.

## Features

* User Signup and Login
* Stateful Authentication using Cookies
* Generate Short URLs
* Redirect to Original URLs
* Track Click Counts
* View URL Analytics
* Delete URLs
* User-specific URL Management
* Server-side Rendering using EJS

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Frontend

* EJS
* HTML
* CSS

### Authentication

* Cookie-based Stateful Authentication

## Project Structure

```text
URL_Short/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── service/
├── views/
│
├── connect.js
├── index.js
├── package.json
└── package-lock.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Shubz15/url-shortener-nodejs.git
cd url-shortener-nodejs
```

### Install Dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is running locally.

```bash
mongod
```

### Run Project

```bash
npm start
```

or

```bash
nodemon index.js
```

## How It Works

1. User creates an account and logs in.
2. User submits a long URL.
3. Application generates a unique short ID.
4. URL is stored in MongoDB.
5. Visiting the short URL redirects to the original URL.
6. Every visit is recorded in the database.
7. Users can view analytics and manage their URLs.

## Example

Original URL:

```text
https://www.google.com
```

Generated Short URL:

```text
http://localhost:8001/url/abc123
```


## Author

Shubham
GitHub: https://github.com/Shubz15
