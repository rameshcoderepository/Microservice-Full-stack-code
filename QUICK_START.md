# Quick Start Guide

Get up and running with the Microservices project in 5 minutes!

## Prerequisites
- Docker & Docker Compose
- Node.js 18+
- npm 9+

## 🚀 Start Everything

### Step 1: Start Backend Services (Docker)

```bash
# From project root
docker-compose up --build

# Wait until all services are healthy (2-3 minutes)
# Check: docker-compose ps
```

### Step 2: Start Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies (first time only)
npm install

# Start Angular development server
npm start

# Application opens at http://localhost:4200
```

## 🔐 Login

```
Username: demo
Password: password123
```

Or use any username (min 3 chars) and password (min 6 chars).

## 📱 Demo the Features

### 1. Dashboard
- View system overview
- Check all services status
- Quick access to features

### 2. Exchange Rates
- Select currencies (USD, EUR, GBP, INR, etc.)
- Click "Get Rate"
- View current exchange rates

### 3. Currency Conversion
- Enter amount to convert
- Select source/destination currency
- View conversion result

### 4. Limits Management
- View current limits
- Update minimum/maximum values
- Submit changes

## 📊 Monitor Services

### Check Service Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
```

### Check Service Health
```bash
curl http://localhost:8765/actuator/health
curl http://localhost:8761  # Eureka
```

## 🛑 Stop Everything

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔗 Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4200 |
| API Gateway | http://localhost:8765 |
| Eureka | http://localhost:8761 |
| Config Server | http://localhost:8888 |
| Currency Exchange | http://localhost:8000-8002 |
| Currency Conversion | http://localhost:8100-8102 |
| Limits Service | http://localhost:8085 |

## ⚠️ Troubleshooting

### Services won't start
```bash
# Clean up and restart
docker-compose down -v
docker-compose up --build
```

### Frontend can't connect
```bash
# Check API Gateway is running
curl http://localhost:8765/actuator/health

# Clear browser cache (Ctrl+Shift+Delete)
# Try again
```

### Port already in use
```bash
# Find process using port
netstat -an | grep 8765

# Or change port in .env file
# Then restart
```

## 💡 Tips

- **Load Balancing**: Each request to Exchange/Conversion services goes to a different instance
- **Check Port in Response**: See which service instance handled your request
- **Unsaved Changes Warning**: Try leaving Conversion page with unsaved form
- **Try Different Currencies**: USD, EUR, GBP, INR, JPY, AUD, CAD, CHF

## 📚 Documentation

- Full setup: See [README.md](./README.md)
- Docker details: See [DOCKER_SETUP.md](./DOCKER_SETUP.md)
- Frontend: See [frontend/FRONTEND_README.md](./frontend/FRONTEND_README.md)

---

**Need help?** Check the main README.md or DOCKER_SETUP.md for detailed information.
