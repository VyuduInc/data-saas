# Data SaaS Platform API Documentation

## Authentication

All API endpoints require authentication using NextAuth.js. Include the session token in your requests.

## Rate Limiting

API endpoints are rate-limited using Upstash Redis:
- 10 requests per 10 seconds per IP address
- Rate limits are enforced globally for all API routes
- Headers returned with each request:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in window
  - `X-RateLimit-Reset`: Time when the rate limit resets
- Exceeded limits return 429 Too Many Requests

## WebSocket Events

Real-time updates are handled through Pusher Channels:

### Message Events
- `message:sent` - New message created
  ```typescript
  interface MessageSent {
    id: string;
    content: string;
    type: 'text' | 'code' | 'image';
    userId: string;
    createdAt: string;
  }
  ```
- `message:updated` - Message content updated
  ```typescript
  interface MessageUpdated {
    id: string;
    updates: {
      content?: string;
      type?: 'text' | 'code' | 'image';
    }
  }
  ```
- `message:deleted` - Message removed
  ```typescript
  type MessageDeleted = string; // messageId
  ```

### Chat Events
- `chat:updated` - Chat details updated
- `chat:deleted` - Chat removed

## API Endpoints

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
        "email": "string",
        "updatedAt": "string"
    }
}
```

#### Upload Profile Image
- **POST** `/api/profile/image`
- Updates user's profile picture
- Request: multipart/form-data
  - Field: "image" (file)
- Restrictions:
  - Max size: 5MB
  - Allowed types: image/jpeg, image/png, image/gif
  - Maximum dimensions: 2048x2048
- Response:
```json
{
    "imageUrl": "string",
    "updatedAt": "string"
}
```

### Settings Management

#### Get Settings
- **GET** `/api/settings`
- Retrieves user's settings
- Response:
```json
{
    "settings": {
        "model": "string",
        "theme": "light" | "dark" | "system",
        "context": "string",
        "runtime": "string",
        "isPremium": boolean,
        "responseStyle": "concise" | "detailed",
        "alwaysShowCode": boolean,
        "updatedAt": "string"
    }
}
```

#### Update Settings
- **PUT** `/api/settings`
- Updates user's settings
- Request body:
```json
{
    "settings": {
        "model": "string",
        "theme": "light" | "dark" | "system",
        "context": "string",
        "runtime": "string",
        "responseStyle": "concise" | "detailed",
        "alwaysShowCode": boolean
    }
}
```
- Response: Same as GET settings

### Chat Management

#### Create Chat
- **POST** `/api/chats`
- Creates a new chat
- Request body:
```json
{
    "title": "string"
}
```
- Response:
```json
{
    "id": "string",
    "title": "string",
    "createdAt": "string"
}
```

#### Get Chat Messages
- **GET** `/api/chats/{chatId}/messages`
- Retrieves messages for a chat
- Query parameters:
  - `page`: number (default: 1)
  - `limit`: number (default: 50, max: 100)
  - `type`: "text" | "code" | "image" (optional)
  - `search`: string (optional)
  - `startDate`: ISO date string (optional)
  - `endDate`: ISO date string (optional)
- Response:
```json
{
    "messages": [
        {
            "id": "string",
            "content": "string",
            "type": "text" | "code" | "image",
            "userId": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    ],
    "total": number,
    "page": number,
    "limit": number
}
```

#### Send Message
- **POST** `/api/chats/{chatId}/messages`
- Sends a new message
- Request body:
```json
{
    "content": "string",
    "type": "text" | "code" | "image"
}
```
- Response:
```json
{
    "id": "string",
    "content": "string",
    "type": "text" | "code" | "image",
    "userId": "string",
    "createdAt": "string"
}
```

#### Update Message
- **PUT** `/api/chats/{chatId}/messages/{messageId}`
- Updates an existing message
- Request body:
```json
{
    "content": "string",
    "type": "text" | "code" | "image"
}
```
- Response:
```json
{
    "id": "string",
    "content": "string",
    "type": "text" | "code" | "image",
    "updatedAt": "string"
}
```

#### Delete Message
- **DELETE** `/api/chats/{chatId}/messages/{messageId}`
- Deletes a message
- Response: 204 No Content

## Error Responses

All error responses follow this format:
```json
{
    "error": {
        "message": "string",
        "code": "string",
        "details": {} // Optional additional information
    }
}
```

Common error codes:
- `unauthorized`: Authentication required
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `validation_error`: Invalid request data
- `rate_limited`: Too many requests
- `internal_error`: Server error
