# API Endpoints

This document lists all available API routes, their methods, parameters, and sample responses for the Node Search Backend.

Base URL
http://localhost:3000

Replace localhost:3000 with your deployed backend URL in production.

---

## 1. Health Check

- Endpoint: `/health`
- Method: `GET`
- Description: Checks if the server is running.
- Request Parameters: None

Sample Response:

```json
{
  "status": "ok",
  "uptime": 123.45
}
```

---

## 2. Search Products

- Endpoint: `/api/search`
- Method: `GET`
- Description: Search products using a query, with optional pagination.

### Query Parameters

| Parameter | Type   | Required | Default | Description                |
| --------: | :----- | :------: | :------ | :------------------------- |
|         q | string |    No    | ""      | Search keyword             |
|      page | number |    No    | 1       | Page number for pagination |
|     limit | number |    No    | 10      | Number of items per page   |

Sample Request:

GET /api/search?q=apple&page=1&limit=10

Sample Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Apple iPhone 14",
      "price": 999,
      "description": "Latest iPhone model"
    },
    {
      "id": "2",
      "name": "Apple MacBook Air",
      "price": 1299,
      "description": "M2 Chip MacBook Air"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 50
}
```

Error Response Example:

```json
{
  "success": false,
  "error": {
    "message": "Invalid page number"
  }
}
```

---

## Notes

- All API responses are in JSON format.
- The `success` field indicates whether the request was successful.
- Error messages are standardized through centralized error handling.
- Pagination defaults: `page=1`, `limit=10` if not provided.
- Swagger docs at `/api/docs` provide an interactive interface to test these endpoints.
