# API Integration Example

A simple Node.js Express server demonstrating API integration patterns.

## What It Does

Calls external APIs, transforms the data, and serves it back.

This is the pattern used for most integration work:
1. **Fetch** from external API
2. **Transform** the data (filter, enrich, format)
3. **Serve** the result

## Real Use Case

Your company uses multiple tools. This shows how to:
- Call Tool A's API
- Transform data to match Tool B's format
- Automatically sync between tools

## How To Use

### Setup
```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

### Endpoints

**Get a user:**
GET http://localhost:3000/api/user/1

Returns:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "company": "Company Name",
    "fetched_at": "2025-03-10T14:32:45.123Z"
  }
}
```

**Get user's posts:**

