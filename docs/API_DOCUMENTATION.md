# API Documentation

## Base URL
```
http://localhost:3050/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null,
  "error": string | null
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "error": null
}
```

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "error": null
}
```

### Get User Profile
**GET** `/auth/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "error": null
}
```

## Task Endpoints

### Get All Tasks
**GET** `/tasks`

Retrieve all tasks for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional): Filter by task status (`pending`, `in_progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `type` (optional): Filter by task type

**Response:**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the project",
      "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
      "type": "work",
      "priority": "high",
      "status": "in_progress",
      "overdue": false,
      "dueTime": "2023-07-25T15:00:00.000Z",
      "createdAt": "2023-07-20T10:30:00.000Z",
      "updatedAt": "2023-07-20T10:30:00.000Z"
    }
  ],
  "error": null
}
```

### Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the project",
  "type": "work",
  "priority": "high",
  "status": "pending",
  "dueTime": "2023-07-25T15:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the project",
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "type": "work",
    "priority": "high",
    "status": "pending",
    "overdue": false,
    "dueTime": "2023-07-25T15:00:00.000Z",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "error": null
}
```

### Get Task by ID
**GET** `/tasks/:id`

Retrieve a specific task by its ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id`: Task ID

**Response:**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the project",
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "type": "work",
    "priority": "high",
    "status": "in_progress",
    "overdue": false,
    "dueTime": "2023-07-25T15:00:00.000Z",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "error": null
}
```

### Update Task
**PUT** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id`: Task ID

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Updated task title",
    "description": "Updated description",
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "type": "work",
    "priority": "medium",
    "status": "completed",
    "overdue": false,
    "dueTime": "2023-07-25T15:00:00.000Z",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T12:45:00.000Z"
  },
  "error": null
}
```

### Delete Task
**DELETE** `/tasks/:id`

Delete a task (soft delete).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id`: Task ID

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": null,
  "error": null
}
```

## Data Models

### User Model
```typescript
interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // bcrypt hashed
  createdAt: Date;
  updatedAt: Date;
}
```

### Task Model
```typescript
interface ITask {
  _id: ObjectId;
  title: string;
  description?: string;
  userId: ObjectId;
  type: TaskType;
  priority: PriorityLevel;
  status: ProgressStatus;
  overdue: boolean;
  dueTime?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Enums
```typescript
enum TaskType {
  PERSONAL = "personal",
  WORK = "work",
  SHOPPING = "shopping",
  HEALTH = "health",
  OTHER = "other"
}

enum PriorityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

enum ProgressStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed"
}
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": "\"email\" must be a valid email"
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "Authentication failed",
  "data": null,
  "error": "Invalid token"
}
```

### Not Found Error
```json
{
  "success": false,
  "message": "Resource not found",
  "data": null,
  "error": "Task not found"
}
```

### Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "data": null,
  "error": "Database connection failed"
}
```

## Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Access denied
- `404` - Not Found: Resource not found
- `422` - Unprocessable Entity: Validation failed
- `500` - Internal Server Error: Server error

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Example Usage

### JavaScript/Node.js
```javascript
// Login
const loginResponse = await fetch('http://localhost:3050/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'securePassword123'
  })
});

const { data } = await loginResponse.json();
const token = data.token;

// Create task
const taskResponse = await fetch('http://localhost:3050/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description',
    type: 'work',
    priority: 'high',
    dueTime: '2023-07-25T15:00:00.000Z'
  })
});
```

### cURL Examples
```bash
# Login
curl -X POST http://localhost:3050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"securePassword123"}'

# Get tasks
curl -X GET http://localhost:3050/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create task
curl -X POST http://localhost:3050/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"New Task","type":"work","priority":"high"}'
```
