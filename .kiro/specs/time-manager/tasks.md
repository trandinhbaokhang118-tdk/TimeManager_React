# Implementation Plan

## Phase 1: Infrastructure Setup (Days 1-3)

- [ ] 1. Setup Docker and PostgreSQL
  - [ ] 1.1 Create docker-compose.yml with PostgreSQL 16 container
    - Container name: time_manager_postgres
    - Port mapping: 5432:5432
    - Persistent volume for data
    - Healthcheck using pg_isready
    - _Requirements: 1.2_
  - [ ] 1.2 Create .env.example files for backend and frontend
    - Backend: DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN
    - Frontend: VITE_API_URL
    - _Requirements: 10.4_

- [ ] 2. Setup Backend Project Structure
  - [ ] 2.1 Initialize NestJS project with TypeScript
    - Install dependencies: @nestjs/core, @nestjs/common, @nestjs/platform-express
    - Configure ESLint + Prettier
    - _Requirements: 1.1, 10.1_
  - [ ] 2.2 Setup Prisma ORM
    - Install prisma and @prisma/client
    - Create prisma.config.ts for Prisma v7
    - Configure datasource for PostgreSQL
    - _Requirements: 1.3_
  - [ ] 2.3 Create Prisma schema with all models
    - Models: User, RefreshToken, Task, Tag, TaskTag, TimeBlock, Reminder, Notification
    - Add enums: Role, TaskStatus, TaskPriority
    - Add indexes and constraints
    - _Requirements: 12.1, 12.2, 12.3_
  - [ ]* 2.4 Write property test for time block constraint
    - **Property 13: Time Block Temporal Validity**
    - **Validates: Requirements 5.1, 12.2**
  - [ ] 2.5 Run initial migration
    - Execute npx prisma migrate dev
    - Verify all tables created
    - _Requirements: 1.3_
  - [ ] 2.6 Create seed script
    - Create admin user (role: ADMIN)
    - Create demo user (role: USER)
    - _Requirements: 1.5_

- [ ] 3. Setup Frontend Project Structure
  - [ ] 3.1 Initialize React + Vite + TypeScript project
    - Configure ESLint + Prettier
    - Setup folder structure: app/, services/, pages/, components/, store/, types/
    - _Requirements: 1.1, 10.1_
  - [ ] 3.2 Configure axios client
    - Create api.ts with baseURL from VITE_API_URL
    - Setup request/response interceptors
    - _Requirements: 9.3_
  - [ ] 3.3 Configure TanStack Query
    - Create queryClient.ts with default options
    - Setup QueryClientProvider in App.tsx
    - _Requirements: 9.4_
  - [ ] 3.4 Setup React Router
    - Create router.tsx with public/private route structure
    - Create placeholder pages: Login, Register, Dashboard
    - _Requirements: 9.1, 9.2_

- [ ] 4. Setup Common Backend Infrastructure
  - [ ] 4.1 Create Prisma module and service
    - PrismaService extends PrismaClient
    - Handle connection lifecycle
    - _Requirements: 1.3_
  - [ ] 4.2 Create common DTOs and response format
    - ApiResponse<T> with data and meta
    - ErrorResponse with code, message, details
    - PaginationDto with page, limit
    - _Requirements: 8.1, 8.2_
  - [ ]* 4.3 Write property tests for API response format
    - **Property 21: Success Response Format**
    - **Property 22: Error Response Format**
    - **Validates: Requirements 8.1, 8.2**
  - [ ] 4.4 Create global exception filter
    - Handle HttpException
    - Handle unknown errors
    - Return consistent error format
    - _Requirements: 8.2_
  - [ ] 4.5 Create logging interceptor
    - Log request method, path, status, response time
    - _Requirements: 8.5_
  - [ ] 4.6 Create health endpoint
    - GET /health returns { ok: true }
    - _Requirements: 8.4_
  - [ ] 4.7 Setup Swagger/OpenAPI
    - Configure @nestjs/swagger
    - Document all endpoints
    - Serve at /api-docs
    - _Requirements: 8.3_

- [ ] 5. Checkpoint - Infrastructure Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Authentication (Days 4-10)

- [ ] 6. Implement User Module
  - [ ] 6.1 Create UsersModule, UsersService
    - findByEmail, findById, create methods
    - Password hashing with argon2
    - _Requirements: 2.1_
  - [ ]* 6.2 Write property test for password hashing
    - **Property 1: Password Hashing Integrity**
    - **Validates: Requirements 2.1**

- [ ] 7. Implement Auth Module
  - [ ] 7.1 Create AuthModule, AuthController, AuthService
    - POST /auth/register endpoint
    - POST /auth/login endpoint
    - POST /auth/refresh endpoint
    - POST /auth/logout endpoint
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ] 7.2 Implement JWT strategy
    - Install @nestjs/jwt, @nestjs/passport, passport-jwt
    - Configure JWT with secret and expiration
    - _Requirements: 2.2_
  - [ ] 7.3 Implement refresh token logic
    - Store hashed refresh token in database
    - Rotate token on refresh
    - Invalidate on logout
    - _Requirements: 2.3, 2.4_
  - [ ]* 7.4 Write property tests for token flow
    - **Property 2: Token Round-Trip Consistency**
    - **Property 3: Logout Invalidation**
    - **Validates: Requirements 2.2, 2.3, 2.4**
  - [ ] 7.5 Create JwtAuthGuard
    - Validate JWT on protected routes
    - Return 401 for invalid/missing token
    - _Requirements: 2.5_
  - [ ]* 7.6 Write property test for authentication enforcement
    - **Property 4: Authentication Enforcement**
    - **Validates: Requirements 2.5**
  - [ ] 7.7 Create @CurrentUser decorator
    - Extract user from request
    - _Requirements: 2.6_

- [ ] 8. Implement Frontend Auth
  - [ ] 8.1 Create auth service
    - register, login, refresh, logout API calls
    - Token storage in localStorage
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ] 8.2 Create auth store
    - User state, isAuthenticated
    - Login/logout actions
    - _Requirements: 9.1_
  - [ ] 8.3 Create Login page
    - Email/password form
    - Form validation
    - Error handling
    - _Requirements: 2.2_
  - [ ] 8.4 Create Register page
    - Email/password/name form
    - Form validation
    - Redirect to login on success
    - _Requirements: 2.1_
  - [ ] 8.5 Implement PrivateRoute component
    - Check authentication
    - Redirect to login if not authenticated
    - _Requirements: 9.1_
  - [ ]* 8.6 Write property test for private route redirect
    - **Property (Frontend): Unauthenticated Redirect**
    - **Validates: Requirements 9.1**

- [ ] 9. Checkpoint - Auth Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: Task Management (Days 11-18)

- [ ] 10. Implement Tags Module
  - [ ] 10.1 Create TagsModule, TagsController, TagsService
    - GET /tags - list user tags
    - POST /tags - create tag
    - DELETE /tags/:id - delete tag
    - _Requirements: 4.1, 4.4_
  - [ ] 10.2 Implement tag ownership validation
    - User can only access own tags
    - _Requirements: 2.6_
  - [ ]* 10.3 Write property test for tag deletion cascade
    - **Property 12: Tag Deletion Cascade**
    - **Validates: Requirements 4.4**

- [ ] 11. Implement Tasks Module
  - [ ] 11.1 Create TasksModule, TasksController, TasksService
    - GET /tasks - list with pagination
    - POST /tasks - create task
    - GET /tasks/:id - get single task
    - PATCH /tasks/:id - update task
    - DELETE /tasks/:id - delete task
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ] 11.2 Implement task ownership validation
    - User can only access own tasks
    - Return 403 for unauthorized access
    - _Requirements: 2.6, 3.2_
  - [ ]* 11.3 Write property tests for task data isolation
    - **Property 5: Authorization Enforcement**
    - **Property 6: Task Data Isolation**
    - **Validates: Requirements 2.6, 3.2**
  - [ ] 11.4 Implement task-tag relationship endpoints
    - POST /tasks/:id/tags - assign tags
    - DELETE /tasks/:id/tags/:tagId - remove tag
    - _Requirements: 4.2, 4.3_
  - [ ]* 11.5 Write property test for tag relationship integrity
    - **Property 11: Tag-Task Relationship Integrity**
    - **Validates: Requirements 4.2, 4.3**
  - [ ] 11.6 Implement task filtering
    - Filter by status, priority, date range
    - Sorting by dueAt, createdAt, priority
    - _Requirements: 3.5_
  - [ ]* 11.7 Write property test for task filter correctness
    - **Property 9: Task Filter Correctness**
    - **Validates: Requirements 3.5**
  - [ ] 11.8 Implement task search
    - Search by keyword in title/description
    - Case-insensitive matching
    - _Requirements: 3.6_
  - [ ]* 11.9 Write property test for task search correctness
    - **Property 10: Task Search Correctness**
    - **Validates: Requirements 3.6**
  - [ ]* 11.10 Write property tests for task CRUD
    - **Property 7: Task CRUD Consistency**
    - **Property 8: Task Deletion Cascade**
    - **Validates: Requirements 3.1, 3.3, 3.4**

- [ ] 12. Implement Frontend Tasks
  - [ ] 12.1 Create tasks service
    - CRUD API calls
    - Filter/search API calls
    - _Requirements: 3.1-3.6_
  - [ ] 12.2 Create tags service
    - CRUD API calls
    - _Requirements: 4.1-4.4_
  - [ ] 12.3 Create Tasks page
    - Task list with pagination
    - Filter controls (status, priority, date)
    - Search input
    - _Requirements: 3.2, 3.5, 3.6_
  - [ ] 12.4 Create TaskForm component
    - Create/edit task modal
    - Tag selection
    - Form validation
    - _Requirements: 3.1, 3.3, 4.2_
  - [ ] 12.5 Create TaskCard component
    - Display task info
    - Status/priority badges
    - Tag chips
    - Delete action
    - _Requirements: 3.2, 3.4_

- [ ] 13. Checkpoint - Tasks Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 4: Calendar & Time Blocks (Days 19-24)

- [ ] 14. Implement Time Blocks Module
  - [ ] 14.1 Create TimeBlocksModule, TimeBlocksController, TimeBlocksService
    - GET /time-blocks - list with date range
    - POST /time-blocks - create block
    - PATCH /time-blocks/:id - update block
    - DELETE /time-blocks/:id - delete block
    - _Requirements: 5.1, 5.3, 5.4, 5.5_
  - [ ] 14.2 Implement time validation
    - Validate startAt < endAt
    - Return 400 for invalid range
    - _Requirements: 5.1_
  - [ ] 14.3 Implement overlap detection
    - Check overlap: startA < endB AND startB < endA
    - Return 409 for overlap
    - _Requirements: 5.2, 5.4_
  - [ ]* 14.4 Write property tests for time blocks
    - **Property 14: Time Block Non-Overlap**
    - **Property 15: Time Block Range Query**
    - **Validates: Requirements 5.2, 5.3, 5.4**

- [ ] 15. Implement Frontend Calendar
  - [ ] 15.1 Create time-blocks service
    - CRUD API calls
    - Range query API call
    - _Requirements: 5.1-5.5_
  - [ ] 15.2 Create Calendar page
    - Week/month view toggle
    - Display time blocks
    - _Requirements: 5.3_
  - [ ] 15.3 Create TimeBlockForm component
    - Create/edit time block modal
    - Date/time pickers
    - Overlap error handling
    - _Requirements: 5.1, 5.2_
  - [ ] 15.4 Create CalendarGrid component
    - Day/hour grid layout
    - Time block positioning
    - Click to create block
    - _Requirements: 5.3_

- [ ] 16. Checkpoint - Calendar Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 5: Reminders & Notifications (Days 25-27)

- [ ] 17. Implement Reminders Module
  - [ ] 17.1 Create RemindersModule, RemindersController, RemindersService
    - GET /reminders - list user reminders
    - POST /reminders - create reminder
    - DELETE /reminders/:id - delete reminder
    - _Requirements: 6.1_

- [ ] 18. Implement Notifications Module
  - [ ] 18.1 Create NotificationsModule, NotificationsController, NotificationsService
    - GET /notifications - list with pagination
    - GET /notifications/unread-count - get count
    - PATCH /notifications/:id/read - mark as read
    - _Requirements: 6.3, 6.4, 6.5_
  - [ ]* 18.2 Write property tests for notifications
    - **Property 17: Notification Ordering**
    - **Property 18: Notification Read State**
    - **Validates: Requirements 6.3, 6.4, 6.5**

- [ ] 19. Implement Scheduler
  - [ ] 19.1 Create SchedulerModule, SchedulerService
    - Install node-cron
    - Run every minute to check reminders
    - Create notifications for triggered reminders
    - _Requirements: 6.2_
  - [ ]* 19.2 Write property test for reminder trigger
    - **Property 16: Reminder Trigger Creates Notification**
    - **Validates: Requirements 6.2**

- [ ] 20. Implement Frontend Notifications
  - [ ] 20.1 Create notifications service
    - List, unread count, mark read API calls
    - _Requirements: 6.3, 6.4, 6.5_
  - [ ] 20.2 Create reminders service
    - CRUD API calls
    - _Requirements: 6.1_
  - [ ] 20.3 Create NotificationBadge component
    - Display unread count
    - Poll for updates
    - _Requirements: 6.5_
  - [ ] 20.4 Create Notifications page
    - Notification list
    - Mark as read action
    - _Requirements: 6.3, 6.4_
  - [ ] 20.5 Create Reminders page
    - Reminder list
    - Create reminder form
    - _Requirements: 6.1_

- [ ] 21. Checkpoint - Notifications Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 6: Dashboard & Analytics (Days 28-29)

- [ ] 22. Implement Dashboard Module
  - [ ] 22.1 Create DashboardModule, DashboardController, DashboardService
    - GET /dashboard/stats - task statistics
    - GET /dashboard/focus-time - weekly focus time
    - _Requirements: 7.1, 7.2_
  - [ ]* 22.2 Write property tests for dashboard
    - **Property 19: Statistics Accuracy**
    - **Property 20: Focus Time Calculation**
    - **Validates: Requirements 7.1, 7.2**

- [ ] 23. Implement Frontend Dashboard
  - [ ] 23.1 Create dashboard service
    - Stats and focus time API calls
    - _Requirements: 7.1, 7.2_
  - [ ] 23.2 Create Dashboard page
    - Statistics cards (tasks today, overdue, completed)
    - Focus time card
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ] 23.3 Create StatsChart component
    - Daily task completion chart (recharts)
    - _Requirements: 7.3_

- [ ] 24. Checkpoint - Dashboard Complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 7: Serialization & Final Testing (Day 29)

- [ ] 25. Implement Date Serialization
  - [ ] 25.1 Configure date serialization
    - Ensure ISO 8601 format for all timestamps
    - Configure Prisma date handling
    - _Requirements: 12.4, 12.5_
  - [ ]* 25.2 Write property test for date round-trip
    - **Property 23: Date Serialization Round-Trip**
    - **Validates: Requirements 12.4, 12.5**

## Phase 8: Documentation & CI (Day 30)

- [ ] 26. Create Documentation
  - [ ] 26.1 Create docs/SRS.md
    - Functional requirements
    - Non-functional requirements
    - Use-case descriptions
    - Acceptance criteria
    - _Requirements: 11.1_
  - [ ] 26.2 Create docs/SDD.md
    - System architecture
    - Module descriptions
    - Sequence diagrams
    - Data model design
    - _Requirements: 11.2_
  - [ ] 26.3 Create docs/ERD.md
    - Entity-relationship diagram
    - Table descriptions
    - Relationship explanations
    - Index documentation
    - _Requirements: 11.3_
  - [ ] 26.4 Create docs/API.md
    - Endpoint list
    - Request/response examples
    - Authentication requirements
    - Error codes
    - _Requirements: 11.4_
  - [ ] 26.5 Create docs/TestPlan.md
    - Test cases mapped to requirements
    - Given/When/Then format
    - _Requirements: 11.5_
  - [ ] 26.6 Create docs/UserManual.md
    - Step-by-step usage instructions
    - Screenshots
    - _Requirements: 11.6_
  - [ ] 26.7 Create docs/Deployment.md
    - Local setup instructions
    - Docker commands
    - Environment configuration
    - _Requirements: 11.7_
  - [ ] 26.8 Create docs/ProjectPlan.md
    - 30-day Gantt chart (Mermaid)
    - _Requirements: 11.8_

- [ ] 27. Setup CI/CD
  - [ ] 27.1 Create GitHub Actions workflow
    - Trigger on pull_request
    - Backend: npm ci → lint → test → build
    - Frontend: npm ci → lint → build
    - _Requirements: 10.2, 10.3_

- [ ] 28. Update README.md
  - [ ] 28.1 Write comprehensive README
    - Prerequisites (Node LTS, Docker Desktop)
    - Quick start commands
    - URL references
    - Demo account info
    - _Requirements: 1.1_

- [ ] 29. Final Checkpoint - All Tests Pass
  - Ensure all tests pass, ask the user if questions arise.
