# Vaydr Setup Guide

This guide will help you set up and configure the Vaydr application for development.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- AWS account with S3 access
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
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vaydr"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32

# AWS S3 Configuration
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="your-bucket-name"

# Optional: OAuth Providers (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE vaydr;
```

2. Run database migrations:
```bash
npx prisma migrate dev
```

3. Seed the database (if needed):
```bash
npx prisma db seed
```

## AWS S3 Configuration

1. Create an S3 bucket in your AWS account
2. Configure CORS for your S3 bucket:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST"],
        "AllowedOrigins": ["http://localhost:3000", "your-production-domain"],
        "ExposeHeaders": []
    }
]
```

3. Create an IAM user with the following policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Access the application at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## Production Deployment

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm start
# or
yarn start
```
