# Data SaaS Platform API Documentation

## Authentication

All API endpoints require authentication using NextAuth.js. Include the session token in your requests.

## Rate Limiting

API endpoints are rate-limited using Upstash Redis:
- 10 requests per 10 seconds per user
- Rate limits are enforced per endpoint
- Exceeded limits return 429 Too Many Requests

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
        "email": "string"
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
  - Allowed types: image/*
- Response:
```json
{
    "imageUrl": "string"
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
        "theme": "string",
        "context": "string",
        "runtime": "string",
        "isPremium": boolean,
        "responseStyle": "string",
        "alwaysShowCode": boolean
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
        "theme": "string",
        "context": "string",
        "runtime": "string",
        "responseStyle": "string",
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
    "active": boolean,
    "createdAt": "string",
    "updatedAt": "string"
}
```

#### Get Messages
- **GET** `/api/chats/{chatId}/messages`
- Retrieves messages with pagination
- Query parameters:
  - page (default: 1)
  - limit (default: 50)
- Response:
```json
{
    "messages": [
        {
            "id": "string",
            "content": "string",
            "type": "text" | "code" | "image",
            "createdAt": "string",
            "user": {
                "id": "string",
                "name": "string",
                "image": "string"
            }
        }
    ]
}
```

#### Send Message
- **POST** `/api/chats/{chatId}/messages`
- Sends a new message
- Request body:
```json
{
    "content": "string",
    "type": "text" | "code" | "image",
    "metadata": {
        // Optional metadata
    }
}
```
- Response: Message object

#### Update Message
- **PATCH** `/api/chats/{chatId}/messages/{messageId}`
- Updates an existing message
- Request body:
```json
{
    "content": "string",
    "type": "text" | "code" | "image",
    "metadata": {
        // Optional metadata
    }
}
```
- Response: Message object

#### Delete Message
- **DELETE** `/api/chats/{chatId}/messages/{messageId}`
- Deletes a message
- Response: 204 No Content

#### Search Messages
- **GET** `/api/chats/{chatId}/search`
- Searches messages in a chat
- Query parameters:
  - query: search term
  - type: "all" | "text" | "code" | "image"
  - dateRange: "all" | "today" | "week" | "month"
- Response:
```json
{
    "messages": [
        // Array of message objects
    ]
}
```

## Real-time Events

Using Pusher Channels:

### Chat Events
- `chat:updated` - Chat details updated
- `chat:deleted` - Chat deleted

### Message Events
- `message:sent` - New message sent
- `message:updated` - Message updated
- `message:deleted` - Message deleted

Event channel format: `chat-{chatId}`

## Error Handling

All endpoints may return the following error responses:

```json
{
    "error": "Error message"
}
```

Common status codes:
- 400: Bad Request (invalid input)
- 401: Unauthorized (not logged in)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Too Many Requests (rate limit exceeded)
- 500: Internal Server Error

## File Upload

### Restrictions
- Maximum file size: 5MB
- Allowed image formats: Any image/* MIME type
- Storage: AWS S3
- File naming: UUIDs with original extension
- CORS: Configured per environment

### Security
- File type validation
- Size validation
- Malware scanning (production)
- Signed URLs for uploads
- Private bucket access

## Development Tools

### Testing the API
- Use the provided Postman collection: [download link]
- Environment variables template included
- Request/response examples for all endpoints

### Monitoring
- Rate limit metrics in Upstash dashboard
- Real-time events in Pusher dashboard
- AWS S3 metrics for file uploads

## Support

For API support:
- Check error responses for detailed messages
- Review the setup guide for configuration
- Contact the development team for access issues
