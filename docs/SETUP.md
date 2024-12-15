# Data SaaS Platform Setup Guide

This guide will help you set up and configure the Data SaaS Platform for development.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- AWS account with S3 access
- Pusher account for real-time features
- Upstash Redis account for rate limiting
- Git

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/data-saas.git
cd data-saas
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update your `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dataviz"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

# Pusher (for real-time features)
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"         # Required for client-side
NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster" # Required for client-side
PUSHER_APP_ID="your-pusher-app-id"              # Required for server-side
PUSHER_KEY="your-pusher-key"                    # Required for server-side
PUSHER_SECRET="your-pusher-secret"              # Required for server-side
PUSHER_CLUSTER="your-pusher-cluster"            # Required for server-side

# Other APIs
HUGGINGFACE_API_KEY="your-huggingface-api-key"  # Optional, for AI features
```

## Service Configuration

### PostgreSQL Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE dataviz;
```

2. Run database migrations:
```bash
npx prisma migrate dev
```

3. Seed the database with initial data:
```bash
npx prisma db seed
```

### AWS S3 Configuration

1. Create an S3 bucket in your AWS account
2. Configure CORS for your S3 bucket:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["http://localhost:3000", "your-production-domain"],
        "ExposeHeaders": []
    }
]
```

### Pusher Configuration

1. Create a Pusher Channels app at [https://pusher.com](https://pusher.com)
2. Configure your Pusher app:
   - Enable client events
   - Add your development and production domains to the CORS origins
   - Note down all credentials (app_id, key, secret, cluster)
3. Important: All Pusher environment variables are required and validated at startup

### Upstash Redis Configuration

1. Create a Redis database at [https://upstash.com](https://upstash.com)
2. Configure rate limiting:
   - Default: 10 requests per 10 seconds per IP
   - Customize in `src/middleware.ts` if needed
3. Note: Rate limiting is enforced globally for all API routes

## Development

1. Start the development server:
```bash
npm run dev
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Configure production environment:
   - Set `NODE_ENV=production`
   - Update `NEXTAUTH_URL` to your production domain
   - Use secure WebSocket connections (wss://)
   - Configure proper CORS settings

3. Security considerations:
   - Enable HTTPS
   - Set secure cookie options
   - Implement proper session management
   - Use environment-specific API keys
   - Configure proper CORS headers

## Troubleshooting

### Common Issues

1. **Real-time Updates Not Working**:
   - Verify all Pusher environment variables are set
   - Check WebSocket connectivity
   - Ensure proper channel naming (no special characters)

2. **Rate Limiting Too Strict**:
   - Adjust limits in `src/middleware.ts`
   - Check Redis connection
   - Verify IP detection

3. **File Uploads Failing**:
   - Check S3 bucket permissions
   - Verify CORS configuration
   - Check file size limits

## Support

For additional help:
- Check our [GitHub Issues](https://github.com/your-org/data-saas/issues)
- Join our [Discord community](https://discord.gg/your-invite)
- Email support at support@your-domain.com
