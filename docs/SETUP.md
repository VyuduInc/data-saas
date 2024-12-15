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
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"

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

3. Create an IAM user with S3 access:
   - Create a new IAM user
   - Attach the `AWSs3FullAccess` policy or create a custom policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

### Pusher Configuration

1. Create a new Pusher Channels app at https://pusher.com
2. Get your app credentials from the "App Keys" section
3. Update your `.env` file with the credentials
4. Configure client-side options in your Pusher dashboard:
   - Enable client events
   - Add your development and production domains to the CORS origins

### Upstash Redis Setup

1. Create a new Redis database at https://upstash.com
2. Get your REST URL and token from the "REST API" section
3. Update your `.env` file with the credentials

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Access the application at `http://localhost:3000`

3. Default test account credentials:
   - Email: test@example.com
   - Password: test123

## Features and Testing

### Real-time Chat
- Create a new chat
- Send messages (text, code, images)
- Test real-time updates across multiple browsers
- Try search and filters

### File Upload
- Test profile image upload
- Verify file type restrictions
- Check file size limits (max 5MB)

### Rate Limiting
- API endpoints are limited to 10 requests per 10 seconds
- Test with rapid requests to verify limiting

## Common Issues and Solutions

### Database Connection
If you can't connect to the database:
1. Verify PostgreSQL is running
2. Check your DATABASE_URL format
3. Ensure the database exists

### Real-time Updates Not Working
1. Verify Pusher credentials
2. Check browser console for connection errors
3. Ensure WebSocket connections are allowed by your firewall

### File Upload Issues
1. Verify S3 bucket permissions
2. Check CORS configuration
3. Validate AWS credentials

## Production Deployment

1. Update environment variables for production
2. Build the application:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## Security Considerations

1. **Environment Variables**:
   - Never commit `.env` file
   - Use different secrets for development and production
   - Rotate secrets periodically

2. **API Keys**:
   - Use restricted API keys
   - Set up proper CORS policies
   - Implement rate limiting

3. **File Upload**:
   - Validate file types
   - Limit file sizes
   - Scan for malware

4. **Authentication**:
   - Use HTTPS in production
   - Set secure cookie options
   - Implement proper session management

## Support and Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Pusher Documentation](https://pusher.com/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3)
- [Upstash Documentation](https://docs.upstash.com)
