# TodoMuebles Dashboard Backend

Backend API for the TodoMuebles Dashboard built with NestJS, TypeScript, and PostgreSQL.

Note: This backend project is intended to work with it's frontend project:

```bash

```

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Scripts](#scripts)

## ✨ Features

- 🔐 JWT-based authentication and authorization
- 📄 Landing page content management
- 📤 File upload with AWS S3 integration
- 🎯 Service details management
- 📅 Appointments management
- 🗄️ PostgreSQL database with TypeORM
- ✅ Input validation with class-validator
- 🔒 CORS configuration for frontend integration

## 🛠 Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (Passport.js)
- **File Storage**: AWS S3
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (or use Docker Compose)
- AWS Account with S3 bucket (for file uploads)
- Docker and Docker Compose (optional, for database setup)

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Configuration](#configuration) section)

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Application
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=cms_user
DB_PASSWORD=cms_password
DB_DATABASE=cms_db

# AWS S3
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=your_bucket_name

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=12h
```

> ⚠️ **Important**: Update the `JWT_SECRET` and AWS credentials with your own values. Never commit `.env` files to version control.

## 🗄️ Database Setup

### Using Docker Compose (Recommended)

The project includes a `docker-compose.yml` file for easy database setup:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port `5432`
- pgAdmin on port `5050` (email: `admin@admin.com`, password: `admin`)

### Manual Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE cms_db;
CREATE USER cms_user WITH PASSWORD 'cms_password';
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;
```

2. The database schema will be automatically synchronized in development mode.

### Database Seeding

To seed the database with initial data:

```bash
npm run seed
```

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will start on `http://localhost:3001` with hot-reload enabled.

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the application:
```bash
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## 📡 API Endpoints

The API is available at `/api` prefix. Main endpoints include:

- **Authentication**: `/api/auth/*`
- **Landing Page**: `/api/landing-page/*`
- **Upload**: `/api/upload/*`
- **Service Details**: `/api/service-details/*`
- **Appointments**: `/api/appointments/*`

### CORS Configuration

The API is configured to accept requests from:
- `http://localhost:4200` (Angular default port)
- `http://localhost:53862` (Angular alternative port)

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── landing-page/      # Landing page content management
│   ├── upload/            # File upload module
│   ├── service-details/   # Service details management
│   ├── appointments/      # Appointments management
│   ├── users/             # User entities and related code
│   ├── database/          # Database seeds and migrations
│   ├── config/            # Configuration files
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── test/                  # E2E tests
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

## 📜 Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot-reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests
- `npm run seed` - Seed the database

## 🔒 Security Notes

- Always use strong, unique `JWT_SECRET` values in production
- Keep AWS credentials secure and never commit them
- Set `NODE_ENV=production` in production environments
- Database synchronization is disabled in production mode

## 📝 License

MIT License

## 👥 Author

Fernando Gomez
