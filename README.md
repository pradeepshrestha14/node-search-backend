Node Search Backend

A scalable Node.js backend for search functionality with caching, validation, and API documentation.

Features

REST API: /api/search?q="apple"&page=1&limit=10 with query, page, and limit parameters

Request validation to ensure correct input

Caching using node-cache for performance

Centralized error handling

Swagger API documentation available at /api/docs

Folder Structure

src/cache/ → Caching utilities

src/config/ → Configuration files (Swagger, dotenv, etc.)

src/controllers/ → API controllers

src/middleware/ → Middleware (error handling, validation)

src/repositories/ → Database/data access layer

src/routes/ → Express routes

src/services/ → Business logic

src/utils/ → Helper functions (AppError)

src/validators/ → Request validators

tests/ → Unit tests

Setup

1. Clone the repository

Clone this repository to your local machine and navigate into it.

2. Install dependencies

Run the package manager to install all required dependencies.

3. Create .env file

Set the following environment variables:

PORT=3000

CACHE_TTL_SECONDS=60

API_SERVER_URL=http://localhost:3000 → This is the backend service URL to be used by your frontend

NODE_ENV=development

4. Start development server

Run the development server using:

npm run dev

5. Run tests and view coverage

Check the unit tests and code coverage using:

npm run test:coverage
npm run coverage:open

This will open a browser showing a detailed coverage report.

6. Access Swagger documentation

Swagger UI is available at:

http://localhost:3000/api/docs

You can interactively test all API endpoints here.

Docker Development

To run the backend in Docker:

Build the containers:

docker compose build

Start the services:

docker compose up

Once started, the logs will show the server URL. You can access the APIs:

Health check: http://localhost:3000/health

Search: http://localhost:3000/api/search

Search with query: http://localhost:3000/api/search?q="apple"&page=1&limit=10

Deployment
Using Render

Push your changes to the main branch

Render automatically deploys the service

Self-hosted Deployment

Create a Render account and new service

Provide the .env file according to your environment or adapt from .env.example

Connect your GitHub repository containing this project

Render builds and starts your Node.js backend

Notes

Make sure environment variables are set correctly for caching, port, and API URL

Swagger /api/docs provides an interactive API testing interface

Pagination parameters (page, limit) default to 1 and 10 if not provided
