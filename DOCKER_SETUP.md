# Docker Setup Guide for Todo App

## Prerequisites
- Docker Desktop installed (https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` file to customize if needed (MongoDB credentials, ports, etc).

### 2. Build and Run
```bash
# Build images and start containers
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 3. Stop Containers
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears MongoDB data)
docker-compose down -v
```

## What's Included

### Services
- **Frontend**: React + Vite app on port 3000
- **Backend**: Node.js + Express API on port 5000
- **MongoDB**: Database on port 27017

### Configuration
- Auto-healthcheck for MongoDB
- Proper networking between containers
- Environment variable management
- Volume persistence for database

## Development vs Production

### Development (Current Setup)
```bash
docker-compose up --build
```

### Production Deployment
Before deploying to production:

1. **Update CORS in backend** (`server.js`):
```javascript
app.use(cors({
    origin: "https://yourdomain.com",  // Change this
    credentials: true
}));
```

2. **Set environment variables**:
```bash
NODE_ENV=production
MONGODB_URL=your_production_db_url
```

3. **Build optimized images**:
```bash
docker-compose -f docker-compose.yml build
```

## Useful Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Access container shell
```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Rebuild specific service
```bash
docker-compose up --build backend
```

### View running containers
```bash
docker ps
```

### Stop a specific service
```bash
docker-compose stop backend
```

## Environment Variables

### Backend
- `PORT`: API port (default: 5000)
- `MONGODB_URL`: MongoDB connection string
- `NODE_ENV`: Environment mode (development/production)

### Frontend
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:5000/api/v1)

## Troubleshooting

### Port Already in Use
If ports 3000, 5000, or 27017 are already in use, modify `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "3001:3000"  # Changed from 3000:3000
```

### MongoDB Connection Issues
```bash
# Check MongoDB container logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Backend Connection Issues
```bash
# Verify backend is running
docker-compose logs backend

# Check if backend can connect to MongoDB
docker-compose exec backend ping mongodb
```

### Frontend Not Loading API
Ensure `VITE_API_BASE_URL` in `.env` matches your backend URL and update frontend's axios interceptor if needed.

## Pushing to Production

### Docker Hub
```bash
# Login to Docker Hub
docker login

# Tag image
docker tag todo-backend:latest yourusername/todo-backend:latest

# Push image
docker push yourusername/todo-backend:latest
```

### AWS, Azure, GCP
Use their container registry services with similar commands.

## Additional Resources
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
