# Node Search Backend

A scalable Node.js backend for search functionality with caching, validation, and API documentation.

## Features

- REST API: `/api/search?q="apple"&page=1&limit=10` — supports `query`, `page`, and `limit` parameters
- Request validation to ensure correct input
- Caching using `node-cache` for improved performance
- Centralized error handling
- Swagger API documentation available at `/api/docs`
- Unit tests and code coverage

## Folder structure

- `src/cache/` → Caching utilities
- `src/config/` → Configuration files (Swagger, dotenv, etc.)
- `src/controllers/` → API controllers
- `src/middleware/` → Middleware (error handling, validation)
- `src/repositories/` → Database / data access layer
- `src/routes/` → Express routes
- `src/services/` → Business logic
- `src/utils/` → Helper functions (e.g. `AppError`)
- `src/validators/` → Request validators
- `tests/` → Unit tests

## Quickstart

1. Clone the repository and enter its directory:

   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the project root and set required variables:

   ```env
   PORT=3000
   CACHE_TTL_SECONDS=60
   API_SERVER_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Visit the API:
   - Swagger UI / API docs: `http://localhost:3000/api/docs`
   - Health check: `http://localhost:3000/health`
   - Search endpoint: `http://localhost:3000/api/search?q="apple"&page=1&limit=10`

## API Usage

- Endpoint: `GET /api/search`
- Query parameters:
  - `q` (string) — search term (required)
  - `page` (number) — page number (default: `1`)
  - `limit` (number) — items per page (default: `10`)
- Example:
  ```
  GET /api/search?q=apple&page=2&limit=10
  ```

## Tests & Coverage

- Run tests and generate coverage:
  ```bash
  npm run test:coverage
  then, npm run coverage:open
  ```
  The second command opens a browser with the detailed coverage report.

## Docker (development)

1. Build containers:

   ```bash
   docker compose build
   ```

2. Start services:
   ```bash
   docker compose up
   ```

Logs will show the server URL. Access the same endpoints above on the configured port.

## Deployment (Render)

- Push changes to the `main` branch — Render will pick up the repo and deploy automatically.
- For manual setup on Render:
  1. Create a new service
  2. Provide environment variables (or upload `.env`)
  3. Connect your GitHub repo and deploy

## Notes

- Ensure environment variables are set correctly (port, caching TTL, API URL).
- Swagger at `/api/docs` provides an interactive testing UI.
- Pagination defaults to `page=1` and `limit=10` when not provided.
- Caching TTL is controlled by `CACHE_TTL_SECONDS` to balance freshness and performance.
- For more details go through /DOCS/**AVAILABLE DOCS**
