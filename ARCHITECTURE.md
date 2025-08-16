# System Architecture Documentation

## Overview
This document provides detailed architectural information for the Todo Redis task management system, including component interactions, data flow, and technical implementation details.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser / Mobile App / API Client                         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API GATEWAY LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Express.js Server (Port 3050)                                 │
│  ├── CORS Middleware                                           │
│  ├── Authentication Middleware (JWT)                           │
│  ├── Request Validation (Joi)                                  │
│  └── Error Handling                                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Handlers     │  │   Use Cases     │  │   Validators    │ │
│  │                 │  │                 │  │                 │ │
│  │ • auth.handler  │  │ • tasks.usecase │  │ • task.validation│ │
│  │ • task.handler  │  │ • users.usecase │  │ • user.validation│ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVICE & MANAGER LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Services     │  │    Managers     │  │   Background    │ │
│  │                 │  │                 │  │     Engine      │ │
│  │ • auth.service  │  │ • queue.manager │  │                 │ │
│  │ • mail.service  │  │ • error.manager │  │ • Workers       │ │
│  │ • cache.service │  │ • response.mgr  │  │ • Schedulers    │ │
│  └─────────────────┘  └─────────────────┘  │ • Jobs          │ │
│                                            │ • Queues        │ │
│                                            └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │  Repositories   │  │     Models      │                      │
│  │                 │  │                 │                      │
│  │ • task.repo     │  │ • Task.model    │                      │
│  │ • user.repo     │  │ • User.model    │                      │
│  └─────────────────┘  └─────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PERSISTENCE LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐              ┌─────────────────┐          │
│  │    MongoDB      │              │     Redis       │          │
│  │                 │              │                 │          │
│  │ • Users         │              │ • Job Queues    │          │
│  │ • Tasks         │              │ • Cache         │          │
│  │ • Indexes       │              │ • Sessions      │          │
│  └─────────────────┘              └─────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. API Gateway Layer
- **Express.js Server**: Main HTTP server handling all client requests
- **Middleware Stack**:
  - CORS: Cross-origin resource sharing
  - Authentication: JWT token validation
  - Validation: Request payload validation using Joi
  - Error Handling: Centralized error management

### 2. Business Logic Layer
- **Handlers**: HTTP request/response handling
- **Use Cases**: Core business logic implementation
- **Validators**: Input validation schemas

### 3. Service & Manager Layer
- **Services**: External integrations (email, auth, cache)
- **Managers**: Internal business logic coordination
- **Background Engine**: Asynchronous job processing

### 4. Data Access Layer
- **Repositories**: Data access abstraction
- **Models**: Database schema definitions

### 5. Persistence Layer
- **MongoDB**: Primary data storage
- **Redis**: Caching and job queue storage

## Background Job Processing Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRON SCHEDULER                               │
├─────────────────────────────────────────────────────────────────┤
│  node-cron (Every 30 seconds)                                  │
│  └── Triggers Database Check Job                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   JOB QUEUE SYSTEM                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐              ┌─────────────────┐          │
│  │ Database Queue  │              │  Email Queue    │          │
│  │                 │              │                 │          │
│  │ • CHECK_DB      │              │ • SEND_WELCOME  │          │
│  │   Jobs          │              │ • SEND_REMINDER │          │
│  └─────────────────┘              └─────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     WORKERS                                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐              ┌─────────────────┐          │
│  │ Database Worker │              │  Email Worker   │          │
│  │                 │              │                 │          │
│  │ 1. Find Tasks   │              │ 1. Process Job  │          │
│  │ 2. Check Overdue│              │ 2. Send Email   │          │
│  │ 3. Queue Emails │              │ 3. Log Result   │          │
│  │ 4. Update Tasks │              │                 │          │
│  └─────────────────┘              └─────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Task Creation Flow
```
Client Request → Validation → Handler → Use Case → Repository → Database
     ↓
Response ← Response Manager ← Use Case Result ← Repository Result ← Database
```

### Email Reminder Flow
```
Cron Trigger → Database Worker → Find Overdue Tasks → Queue Email Jobs
     ↓
Email Worker → Send Email → Update Task Status → Log Completion
```

### Authentication Flow
```
Login Request → Validation → Auth Handler → Auth Service → User Repository
     ↓
JWT Token ← Response Manager ← Token Generation ← User Verification
```

## Technology Stack Details

### Core Technologies
- **Node.js**: JavaScript runtime
- **TypeScript**: Type-safe JavaScript
- **Express.js**: Web application framework

### Database & Storage
- **MongoDB**: Document database for primary data
- **Mongoose**: ODM for MongoDB
- **Redis**: In-memory data store for queues and caching

### Job Processing
- **BullMQ**: Redis-based job queue


### Authentication & Security
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Passport.js**: Authentication middleware

### Communication
- **Nodemailer**: Email sending
- **CORS**: Cross-origin resource sharing

## Configuration Management

### Environment Variables
```
# Database Configuration
MONGO_URI=mongodb://localhost:27017/todo-redis

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your-secret-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Configuration Files
- `src/config/env.config.ts`: Environment variable management
- `src/config/redis.config.ts`: Redis connection configuration
- `src/config/bullMq.config.ts`: Job queue configuration
- `src/config/nodemailer.config.ts`: Email service configuration

## Security Architecture

### Authentication
- JWT tokens with 3-day expiration
- Bcrypt password hashing with salt rounds
- Passport.js middleware for route protection

### Data Validation
- Joi schema validation for all inputs
- Type safety with TypeScript
- MongoDB schema validation

### Error Handling
- Centralized error management
- Detailed logging without exposing sensitive data
- Graceful degradation for service failures

## Performance Considerations

### Database Optimization
- Indexes on frequently queried fields (`userId`, `dueTime`, `overdue`)
- Connection pooling for MongoDB
- Efficient query patterns in repositories

### Caching Strategy
- Redis caching for frequently accessed data
- Session storage in Redis
- Queue-based background processing

### Job Queue Optimization
- Configurable retry logic (2 attempts)
- Job cleanup (keep last 10 completed jobs)
- Separate queues for different job types

## Monitoring & Logging

### Application Logging
- Structured logging with timestamps
- Job processing logs with success/failure status
- Error logs with stack traces

### Health Checks
- Database connection monitoring


### Future Enhancements
- 30 mins or 1 hour reminder time instead of overdue
- Database sharding capabilities

