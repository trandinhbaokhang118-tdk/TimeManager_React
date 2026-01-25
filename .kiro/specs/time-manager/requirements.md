# Requirements Document

## Introduction

Website Quản lý thời gian (Time Manager) là một ứng dụng web full-stack giúp người dùng quản lý công việc, lên lịch thời gian, và theo dõi năng suất làm việc. Hệ thống được xây dựng theo chuẩn học thuật và dự án thực tế với Node.js + React + PostgreSQL (Docker) + Prisma, bao gồm đầy đủ tài liệu, quy trình CI/CD, và kiểm thử.

## Glossary

- **Time_Manager**: Hệ thống quản lý thời gian web application
- **User**: Người dùng đã đăng ký tài khoản trong hệ thống
- **Admin**: Người dùng có quyền quản trị hệ thống (role = ADMIN)
- **Task**: Công việc cần thực hiện với các thuộc tính title, description, status, priority, dueAt
- **Tag**: Nhãn phân loại công việc với name và color
- **Task_Tag**: Bảng liên kết nhiều-nhiều giữa Task và Tag
- **Time_Block**: Khối thời gian được lên lịch cho một hoạt động cụ thể với startAt và endAt
- **Reminder**: Nhắc nhở được đặt cho một thời điểm cụ thể (triggerAt)
- **Notification**: Thông báo trong ứng dụng gửi đến người dùng
- **JWT**: JSON Web Token dùng cho xác thực (access token)
- **Refresh_Token**: Token dùng để làm mới access token, lưu hashed trong database
- **Overlap**: Trùng lặp thời gian giữa các time block (startA < endB AND startB < endA)
- **Scheduler**: Tiến trình chạy nền kiểm tra và xử lý reminders (node-cron)

## Requirements

### Requirement 1: Project Infrastructure Setup

**User Story:** As a developer, I want a well-structured mono-repo with Docker, PostgreSQL, and Prisma setup, so that I can develop and deploy the application consistently.

#### Acceptance Criteria

1. WHEN the developer clones the repository THEN the Time_Manager SHALL provide a mono-repo structure with backend/, frontend/, docs/, docker-compose.yml, README.md, and .gitignore
2. WHEN the developer runs docker compose up -d THEN the Time_Manager SHALL start PostgreSQL 16 container with name time_manager_postgres on port 5432 with persistent volume and healthcheck using pg_isready
3. WHEN the developer runs npx prisma migrate dev THEN the Time_Manager SHALL execute all database migrations successfully creating all required tables
4. WHEN the developer runs npx prisma studio THEN the Time_Manager SHALL open Prisma Studio interface for database inspection on default port
5. WHEN the developer runs the seed command THEN the Time_Manager SHALL create one admin user with role ADMIN and one demo user with role USER

### Requirement 2: User Authentication

**User Story:** As a user, I want to register, login, and manage my session securely, so that I can access my personal data safely.

#### Acceptance Criteria

1. WHEN a user submits valid registration data containing email, password, and name THEN the Time_Manager SHALL create a new user account with password hashed using argon2 or bcrypt algorithm
2. WHEN a user submits valid login credentials containing email and password THEN the Time_Manager SHALL return JWT access token and refresh token while storing hashed refresh token in refresh_tokens table
3. WHEN a user sends a valid refresh token to the refresh endpoint THEN the Time_Manager SHALL return a new access token and rotate the refresh token by invalidating the old one
4. WHEN a user sends logout request with valid refresh token THEN the Time_Manager SHALL invalidate the refresh token in the database and return success response
5. WHEN an unauthenticated request accesses a protected route THEN the Time_Manager SHALL return HTTP 401 Unauthorized error with appropriate error message
6. WHEN a user attempts to access another user's data THEN the Time_Manager SHALL return HTTP 403 Forbidden error with appropriate error message

### Requirement 3: Task Management

**User Story:** As a user, I want to create, read, update, and delete tasks with tags, so that I can organize my work effectively.

#### Acceptance Criteria

1. WHEN a user creates a task with title, description, status, priority, dueAt, and tags THEN the Time_Manager SHALL store the task associated with the user and return the created task with generated ID and timestamps
2. WHEN a user requests their task list THEN the Time_Manager SHALL return only tasks belonging to that authenticated user
3. WHEN a user updates an existing task with new data THEN the Time_Manager SHALL modify the task fields and return the updated task with new updatedAt timestamp
4. WHEN a user deletes a task THEN the Time_Manager SHALL remove the task and cascade delete its associated task_tags relationships
5. WHEN a user filters tasks by status, priority, or date range THEN the Time_Manager SHALL return matching tasks sorted by the specified criteria with pagination support
6. WHEN a user searches tasks by keyword THEN the Time_Manager SHALL return tasks with title or description containing the search term case-insensitively

### Requirement 4: Tag Management

**User Story:** As a user, I want to create and manage tags, so that I can categorize my tasks efficiently.

#### Acceptance Criteria

1. WHEN a user creates a tag with name and color THEN the Time_Manager SHALL store the tag associated with the user and return the created tag with generated ID
2. WHEN a user assigns one or more tags to a task THEN the Time_Manager SHALL create task_tags relationship records linking the task to each tag
3. WHEN a user removes a tag from a task THEN the Time_Manager SHALL delete the corresponding task_tags relationship record
4. WHEN a user deletes a tag THEN the Time_Manager SHALL cascade delete all task_tags relationships for that tag while preserving the tasks

### Requirement 5: Time Block Management

**User Story:** As a user, I want to schedule time blocks on a calendar, so that I can plan my focused work sessions.

#### Acceptance Criteria

1. WHEN a user creates a time block with title, startAt, and endAt THEN the Time_Manager SHALL validate that startAt timestamp is strictly before endAt timestamp and store the time block
2. WHEN a user creates a time block that overlaps with an existing block for the same user where startA < endB AND startB < endA THEN the Time_Manager SHALL reject the creation with HTTP 409 Conflict error containing overlap details
3. WHEN a user requests time blocks for a date range with start and end parameters THEN the Time_Manager SHALL return all time blocks within that range belonging to the user
4. WHEN a user updates a time block with new startAt or endAt THEN the Time_Manager SHALL validate no overlap occurs with other blocks and update the block
5. WHEN a user deletes a time block THEN the Time_Manager SHALL remove the time block record from the database

### Requirement 6: Reminder and Notification System

**User Story:** As a user, I want to set reminders and receive in-app notifications, so that I never miss important deadlines.

#### Acceptance Criteria

1. WHEN a user creates a reminder with message and triggerAt timestamp THEN the Time_Manager SHALL store the reminder associated with the user and return the created reminder
2. WHEN the scheduler detects a reminder's triggerAt time has passed and reminder is not yet triggered THEN the Time_Manager SHALL create a notification record for the user and mark the reminder as triggered
3. WHEN a user requests their notifications list THEN the Time_Manager SHALL return all notifications sorted by createdAt timestamp descending with pagination
4. WHEN a user marks a notification as read by sending notification ID THEN the Time_Manager SHALL update the notification's readAt timestamp to current time
5. WHEN a user requests unread notification count THEN the Time_Manager SHALL return the count of notifications where readAt is null

### Requirement 7: Dashboard and Analytics

**User Story:** As a user, I want to view my productivity statistics, so that I can track my progress and improve my time management.

#### Acceptance Criteria

1. WHEN a user requests dashboard statistics THEN the Time_Manager SHALL return count of tasks due today, count of overdue tasks, and count of tasks completed this week
2. WHEN a user requests focus time analytics THEN the Time_Manager SHALL return total duration in minutes of time blocks for the current week
3. WHEN a user views the dashboard page THEN the Time_Manager SHALL display statistics in card components and render a chart showing daily task completion for the week

### Requirement 8: API Standards and Documentation

**User Story:** As a developer, I want consistent API responses and documentation, so that I can integrate and maintain the system easily.

#### Acceptance Criteria

1. WHEN an API request succeeds THEN the Time_Manager SHALL return response body in format { data: T, meta?: { page, limit, total } }
2. WHEN an API request fails THEN the Time_Manager SHALL return error body in format { error: { code: string, message: string, details?: object } }
3. WHEN the developer accesses /api-docs endpoint THEN the Time_Manager SHALL display interactive OpenAPI/Swagger documentation
4. WHEN any client accesses GET /health endpoint THEN the Time_Manager SHALL return { ok: true } with HTTP 200 status
5. WHEN any API request is processed THEN the Time_Manager SHALL log request method, path, response status code, and response time in milliseconds

### Requirement 9: Frontend Application Structure

**User Story:** As a user, I want a responsive web interface, so that I can manage my time from any device.

#### Acceptance Criteria

1. WHEN an unauthenticated user accesses a private route THEN the Time_Manager SHALL redirect the user to the login page preserving the intended destination
2. WHEN an authenticated user accesses the root path THEN the Time_Manager SHALL display the dashboard as the default view
3. WHEN the frontend initializes THEN the Time_Manager SHALL configure axios client with baseURL from VITE_API_URL environment variable
4. WHEN the frontend fetches server data THEN the Time_Manager SHALL use TanStack Query for request caching, background refetching, and loading state management

### Requirement 10: Code Quality and CI/CD

**User Story:** As a developer, I want automated code quality checks and CI pipeline, so that I can maintain high code standards.

#### Acceptance Criteria

1. WHEN code files are saved THEN the Time_Manager SHALL enforce ESLint rules and Prettier formatting for both frontend and backend TypeScript files
2. WHEN a pull request is created to main or develop branch THEN the Time_Manager SHALL trigger GitHub Actions workflow executing npm ci, lint, test, and build steps
3. WHEN any CI workflow step fails THEN the Time_Manager SHALL mark the pull request as failing and block merge until fixed
4. WHEN reviewing committed files THEN the Time_Manager SHALL have .env.example files committed with placeholder values while .env files are listed in .gitignore

### Requirement 11: Documentation Deliverables

**User Story:** As a stakeholder, I want comprehensive documentation, so that I can understand, use, and maintain the system.

#### Acceptance Criteria

1. WHEN the project is delivered THEN the Time_Manager SHALL include docs/SRS.md containing functional requirements, non-functional requirements, use-case descriptions, and acceptance criteria
2. WHEN the project is delivered THEN the Time_Manager SHALL include docs/SDD.md containing system architecture diagram, module descriptions, sequence diagrams for main flows, and data model design
3. WHEN the project is delivered THEN the Time_Manager SHALL include docs/ERD.md containing database entity-relationship diagram, table descriptions, relationship explanations, and index documentation
4. WHEN the project is delivered THEN the Time_Manager SHALL include docs/API.md containing endpoint list, request/response examples, authentication requirements, and error codes
5. WHEN the project is delivered THEN the Time_Manager SHALL include docs/TestPlan.md containing test cases mapped to requirements using Given/When/Then format
6. WHEN the project is delivered THEN the Time_Manager SHALL include docs/UserManual.md containing step-by-step usage instructions with screenshots
7. WHEN the project is delivered THEN the Time_Manager SHALL include docs/Deployment.md containing local setup instructions, Docker commands, and environment configuration
8. WHEN the project is delivered THEN the Time_Manager SHALL include docs/ProjectPlan.md containing 30-day development schedule as Mermaid Gantt chart

### Requirement 12: Database Schema Design

**User Story:** As a developer, I want a well-designed database schema, so that I can store and query data efficiently.

#### Acceptance Criteria

1. WHEN the database is initialized THEN the Time_Manager SHALL create tables: users, refresh_tokens, tasks, tags, task_tags, time_blocks, reminders, notifications with appropriate columns and constraints
2. WHEN a time_block record is inserted or updated THEN the Time_Manager SHALL enforce database-level constraint that startAt column value is less than endAt column value
3. WHEN querying user-specific data THEN the Time_Manager SHALL utilize indexes on userId foreign key columns for query performance optimization
4. WHEN serializing database entities to JSON THEN the Time_Manager SHALL use consistent date format ISO 8601 for all timestamp fields
5. WHEN deserializing JSON to database entities THEN the Time_Manager SHALL parse ISO 8601 date strings back to proper timestamp values
