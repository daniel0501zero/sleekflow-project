# sleekflow-project

## Prerequisites
- Docker Desktop installed (https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Setup Environment Variables

Edit `.env.example` file to customize if needed (MongoDB credentials, ports, etc).
Rename it to `.env`.

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

## What's Included in this repo

### Services
- **Frontend**: React + Vite app on port 3000
- **Backend**: Node.js + Express API on port 5000
- **MongoDB**: Database on port 27017

### Configuration
- Auto-healthcheck for MongoDB
- Proper networking between containers
- Environment variable management
- Volume persistence for database