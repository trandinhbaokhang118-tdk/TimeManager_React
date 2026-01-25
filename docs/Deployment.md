# Deployment Guide
# Time Manager Application

## 1. Prerequisites

### Required Software
- **Node.js**: v18 LTS or higher
- **Docker Desktop**: Latest version
- **npm**: v9 or higher (comes with Node.js)
- **Git**: For version control

### Verify Installation
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
docker --version  # Should be v20+
```

## 2. Local Development Setup

### 2.1 Clone Repository
```bash
git clone <repository-url>
cd time-manager
```

### 2.2 Start Database
```bash
# Start PostgreSQL container
docker compose up -d

# Verify container is running
docker ps

# Check database connection
docker exec -it time_manager_postgres psql -U tm_user -d time_manager -c "SELECT version();"
```

### 2.3 Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env    # Windows
# cp .env.example .env    # Linux/Mac

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed demo data
npm run prisma:seed

# Start development server
npm run dev
```

Backend will be available at: `http://localhost:3000`
Swagger docs at: `http://localhost:3000/api-docs`

### 2.4 Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env    # Windows
# cp .env.example .env    # Linux/Mac

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 3. Environment Configuration

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://tm_user:tm_password@localhost:5432/time_manager?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```env
VITE_API_URL="http://localhost:3000"
```

## 4. Docker Commands

### Start Services
```bash
# Start database
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes (reset database)
docker compose down -v
```

### Database Management
```bash
# Connect to database
docker exec -it time_manager_postgres psql -U tm_user -d time_manager

# Backup database
docker exec time_manager_postgres pg_dump -U tm_user time_manager > backup.sql

# Restore database
docker exec -i time_manager_postgres psql -U tm_user time_manager < backup.sql
```

## 5. Prisma Commands

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name <migration_name>

# Apply migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Seed database
npm run prisma:seed
```

## 6. Build for Production

### Backend
```bash
cd backend

# Build
npm run build

# Start production server
npm run start:prod
```

### Frontend
```bash
cd frontend

# Build
npm run build

# Preview build
npm run preview
```

## 7. Production Deployment

### 7.1 Environment Variables
Set these in your production environment:

**Backend:**
- `DATABASE_URL`: Production database URL
- `JWT_SECRET`: Strong random secret (32+ characters)
- `JWT_EXPIRES_IN`: "15m"
- `REFRESH_TOKEN_EXPIRES_IN`: "7d"
- `PORT`: 3000
- `NODE_ENV`: "production"
- `FRONTEND_URL`: Production frontend URL

**Frontend:**
- `VITE_API_URL`: Production backend URL

### 7.2 Database Setup
```bash
# Run migrations
npx prisma migrate deploy

# Seed initial data (optional)
npm run prisma:seed
```

### 7.3 Process Manager (PM2)
```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start dist/main.js --name time-manager-api

# View logs
pm2 logs time-manager-api

# Restart
pm2 restart time-manager-api
```

### 7.4 Nginx Configuration (Example)
```nginx
# Backend API
server {
    listen 80;
    server_name api.timemanager.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name timemanager.com;

    root /var/www/time-manager/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 8. Troubleshooting

### Database Connection Failed
```bash
# Check if container is running
docker ps

# Check container logs
docker logs time_manager_postgres

# Restart container
docker compose restart
```

### Prisma Migration Failed
```bash
# Reset database and re-run migrations
npx prisma migrate reset

# Or manually fix and re-run
npx prisma migrate dev
```

### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000    # Windows
lsof -i :3000                   # Linux/Mac

# Kill process
taskkill /PID <pid> /F          # Windows
kill -9 <pid>                   # Linux/Mac
```

### CORS Errors
- Verify `FRONTEND_URL` in backend .env
- Check browser console for specific error
- Ensure both servers are running

## 9. Health Checks

### Backend Health
```bash
curl http://localhost:3000/health
# Expected: {"ok":true}
```

### Database Health
```bash
docker exec time_manager_postgres pg_isready -U tm_user
# Expected: accepting connections
```

## 10. Monitoring

### Logs
```bash
# Backend logs (development)
npm run dev

# Backend logs (production with PM2)
pm2 logs time-manager-api

# Database logs
docker logs -f time_manager_postgres
```

### Prisma Studio
```bash
npx prisma studio
# Opens at http://localhost:5555
```
