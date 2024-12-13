# Vaydr API Documentation

## Authentication

All API endpoints require authentication using NextAuth.js. Include the session token in your requests.

## Endpoints

### Profile Management

#### Update Profile
- **PUT** `/api/profile`
- Updates user's basic profile information
- Request body:
```json
{
    "name": "string",
    "email": "string"
}
```
- Response:
```json
{
    "user": {
        "name": "string",
        "email": "string"
    }
}
```

#### Change Password
- **PUT** `/api/profile/password`
- Updates user's password
- Request body:
```json
{
    "currentPassword": "string",
    "newPassword": "string"
}
```
- Response:
```json
{
    "success": true
}
```

#### Upload Profile Image
- **POST** `/api/profile/image`
- Updates user's profile picture
- Request: multipart/form-data
  - Field: "image" (file)
- Response:
```json
{
    "imageUrl": "string"
}
```

### Chat Management

#### Delete Chat
- **DELETE** `/api/chat/{id}`
- Deletes a specific chat conversation
- Response:
```json
{
    "success": true
}
```

## Error Responses

All endpoints may return the following error responses:

```json
{
    "error": "Error message"
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse. Limits are:
- 100 requests per minute per IP
- 1000 requests per hour per user

## File Upload Restrictions

Profile image uploads:
- Maximum file size: 5MB
- Allowed formats: JPEG, PNG, GIF
- Images are stored in AWS S3
- Original filenames are not preserved
