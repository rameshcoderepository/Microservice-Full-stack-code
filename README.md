# Microservices Project - Complete Setup Guide

Complete microservices architecture with Docker setup and Angular frontend for currency exchange and conversion operations.

## 📋 Project Overview

This project demonstrates a complete microservices architecture with:
- **Backend**: 6 Spring Boot microservices with Eureka service discovery
- **Frontend**: Complete Angular application with routing, guards, and interceptors
- **Infrastructure**: Docker Compose for orchestration with load balancing
- **Scalability**: Multiple instances of currency exchange and conversion services

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  Angular Frontend (Port 4200)           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│           API Gateway (Port 8765)                       │
│              (Routes all requests)                      │
└────────────┬──────────────────────────┬────────────────┘
             │                          │
    ┌────────▼────────┐         ┌──────▼──────────┐
    │  Currency       │         │  Currency       │
    │  Exchange       │         │  Conversion     │
    │  Service        │         │  Service        │
    │  (3 instances)  │         │  (3 instances)  │
    │  Ports:         │         │  Ports:         │
    │  8000, 8001,    │         │  8100, 8101,    │
    │  8002           │         │  8102           │
    └────────┬────────┘         └────────┬────────┘
             │                          │
             └────────────┬─────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │ Limits   │      │ Eureka  │      │ Config  │
   │ Service  │      │ Registry│      │ Server  │
   │ (8085)   │      │ (8761)  │      │ (8888)  │
   └──────────┘      └─────────┘      └─────────┘
```

## 🚀 Quick Start

### Option 1: Run Everything with Docker (Recommended)

```bash
# Clone/Navigate to project
cd MicroserviceProject

# Build and start all services
docker-compose up --build

# Wait for all services to be healthy
# Check status: docker-compose ps

# Frontend runs separately (see below)
```

### Option 2: Run Backend Services Individually

```bash
# Build all services
mvn clean package

# Or build specific services
cd api-gateway && mvn clean package
cd currency-exchange-service && mvn clean package
# ... etc

# Run each service
java -jar target/*.jar
```

### Start Frontend

```bash
cd frontend
npm install
npm start
```

Access the application at `http://localhost:4200`

## 📦 What's Included

### Backend Services

| Service | Port | Type | Instances | Purpose |
|---------|------|------|-----------|---------|
| **Naming Server** | 8761 | Eureka | 1 | Service Registry & Discovery |
| **Config Server** | 8888 | Config | 1 | Centralized Configuration |
| **API Gateway** | 8765 | Gateway | 1 | API Entry Point & Routing |
| **Currency Exchange** | 8000-8002 | Microservice | 3 | Exchange Rate Database |
| **Currency Conversion** | 8100-8102 | Microservice | 3 | Currency Conversion Logic |
| **Limits Service** | 8085 | Microservice | 1 | Transaction Limits |

### Frontend Modules

| Module | Route | Features |
|--------|-------|----------|
| **Home** | `/` | Login & Authentication |
| **Dashboard** | `/dashboard` | System Overview & Status |
| **Exchange Rates** | `/currency-exchange` | Get Real-time Rates |
| **Conversion** | `/currency-conversion` | Convert Currencies |
| **Limits** | `/limits` | Manage Configuration |

## 🔧 Installation & Setup

### Prerequisites

- Docker & Docker Compose
- Java 17+
- Maven 3.9+
- Node.js 18+
- npm 9+
- Angular CLI 17+ (optional)

### Backend Setup

#### Docker Compose (Recommended)

```bash
# Build images and start containers
docker-compose up --build

# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Without Docker

```bash
# Build all services
mvn clean package

# Start Naming Server first
cd naming-server
java -jar target/naming-server-0.0.1-SNAPSHOT.jar

# In new terminal - Start Config Server
cd spring-cloud-config-server
java -jar target/spring-cloud-config-server-0.0.1-SNAPSHOT.jar

# In new terminal - Start Currency Exchange Service
cd currency-exchange-service
java -jar target/currency-exchange-service-0.0.1-SNAPSHOT.jar

# In new terminal - Start Currency Conversion Service
cd currency-conversion-service
java -jar target/currency-conversion-service-0.0.1-SNAPSHOT.jar

# In new terminal - Start Limits Service
cd limits-service
java -jar target/limits-service-0.0.1-SNAPSHOT.jar

# In new terminal - Start API Gateway
cd api-gateway
java -jar target/api-gateway-0.0.1-SNAPSHOT.jar
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Application opens at http://localhost:4200
```

## 🌐 API Endpoints

### Via API Gateway (Recommended)

```bash
# Get Exchange Rate
GET http://localhost:8765/currency-exchange/from/USD/to/INR

# Convert Currency
GET http://localhost:8765/currency-conversion/from/USD/to/INR/quantity/100

# Get Limits
GET http://localhost:8765/limits-service/limits
```

### Direct Service Calls

```bash
# Currency Exchange (Instance 1)
GET http://localhost:8000/currency-exchange/from/USD/to/INR

# Currency Conversion (Instance 1)
GET http://localhost:8100/currency-conversion/from/USD/to/INR/quantity/100

# Limits Service
GET http://localhost:8085/limits
```

## 🔐 Authentication

The frontend includes a simple demo authentication system:

### Login Flow
1. Navigate to http://localhost:4200
2. Enter any username (min 3 characters)
3. Enter any password (min 6 characters)
4. Click Login

### Features
- Token stored in localStorage
- Automatic token injection in all API requests
- Protected routes with AuthGuard
- Logout clears token

### Demo Credentials
```
Username: demo
Password: password123
```

Or use any username/password meeting the requirements.

## 🛡️ Security Features

### Guards
- **AuthGuard**: Protects authenticated routes
- **CanDeactivateGuard**: Warns before leaving components with unsaved changes

### Interceptors
1. **LoadingInterceptor**: Shows/hides loading spinner
2. **AuthInterceptor**: Adds Bearer token to requests
3. **HttpErrorInterceptor**: Handles errors globally

## 📊 Docker Compose Details

### Services Configuration

```yaml
services:
  naming-server:        # Eureka Registry
    - Port: 8761
    - Health check: enabled
    
  config-server:        # Spring Cloud Config
    - Port: 8888
    - Depends on: naming-server
    - Health check: enabled
    
  api-gateway:          # Gateway Router
    - Port: 8765
    - Depends on: all services
    - Health check: enabled
    
  currency-exchange-service-1/2/3:  # Load balanced
    - Ports: 8000, 8001, 8002
    - Health check: enabled
    - Depends on: config-server, naming-server
    
  currency-conversion-service-1/2/3:  # Load balanced
    - Ports: 8100, 8101, 8102
    - Health check: enabled
    - Depends on: currency-exchange services
    
  limits-service:       # Limits Configuration
    - Port: 8085
    - Depends on: config-server, naming-server
```

### Health Checks
All services include health checks:
```bash
# Check service health
curl http://localhost:8765/actuator/health

# View in Docker
docker-compose ps
```

## 📝 Configuration Files

### Docker Environment Variables
Edit `.env` file to customize:
```env
COMPOSE_PROJECT_NAME=microservices-project
NAMING_SERVER_PORT=8761
CONFIG_SERVER_PORT=8888
API_GATEWAY_PORT=8765
# ... etc
```

### Frontend API Configuration
Edit `frontend/src/app/core/services/*.service.ts`:
```typescript
const API_GATEWAY_URL = 'http://localhost:8765';
```

### Backend Configuration
Located in `git-localconfiguration-repository/`:
- `limits-service.properties` - Default limits config
- `limits-service-dev.properties` - Development config
- `limits-service-qa.properties` - QA config
- `limits-service-prod.properties` - Production config

## 🧪 Testing

### Backend Tests
```bash
# Run tests for specific service
cd currency-exchange-service
mvn test

# Run all tests
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
# Create fat JAR with all dependencies
mvn clean package -DskipTests

# Build Docker images
docker-compose build

# Push to registry (optional)
docker tag microserviceproject_api-gateway myregistry/api-gateway:1.0
docker push myregistry/api-gateway:1.0
```

### Frontend
```bash
cd frontend

# Build optimized production bundle
npm run build

# Output in: frontend/dist/microservice-frontend

# For Docker deployment
docker build -t microserviceproject-frontend:1.0 .
```

## 🔍 Troubleshooting

### Services Won't Start
```bash
# Check ports are available
netstat -an | grep LISTEN

# Clear containers and restart
docker-compose down -v
docker-compose up --build
```

### Can't Connect to Backend
```bash
# Verify services are running
docker-compose ps

# Check logs
docker-compose logs api-gateway

# Test connectivity
curl http://localhost:8765/actuator/health
```

### Frontend Can't Reach Backend
```bash
# Check API Gateway is running
curl http://localhost:8765/actuator/health

# Update API URL in services
# frontend/src/app/core/services/*.service.ts

# Clear browser cache and reload
# Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
```

### Authentication Issues
```bash
# Clear localStorage
# Open DevTools (F12) → Application → Storage → Clear All

# Verify token is being sent
# Network tab → Check Authorization header

# Re-login with valid credentials
# Min 3 chars username, min 6 chars password
```

## 📈 Performance Optimization

### Backend
- Load balancing across service instances
- Service caching with Spring Cache
- Connection pooling
- Async processing where applicable

### Frontend
- Lazy loading of feature modules
- OnPush change detection strategy
- Tree shaking in production build
- Minification and compression

### Docker
- Multi-stage builds for smaller images
- Alpine Linux for minimal size
- Health checks for availability
- Resource limits (configurable)

## 🚀 Scaling

### Horizontal Scaling (Add More Instances)

#### Docker Compose
```bash
# Scale currency-conversion to 5 instances
docker-compose up -d --scale currency-conversion-service=5

# Note: Requires load balancer configuration
```

#### Kubernetes (Future)
Deploy with Kubernetes for production-grade scaling:
```bash
kubectl apply -f k8s/
```

### Vertical Scaling (Increase Resources)

Edit `docker-compose.yml`:
```yaml
services:
  currency-exchange-service-1:
    # ... existing config ...
    environment:
      - JAVA_OPTS=-Xms512m -Xmx1024m
```

## 🐛 Debugging

### Backend Debugging
```bash
# Enable debug mode
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 \
  -jar target/api-gateway-0.0.1-SNAPSHOT.jar

# Connect IDE debugger to localhost:5005
```

### Frontend Debugging
```bash
# Open browser DevTools
F12 or Cmd+Option+I

# Source tab for breakpoints
# Console tab for errors
# Network tab for HTTP requests
```

### Logs
```bash
# View all logs
docker-compose logs

# Real-time logs
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway

# Save logs to file
docker-compose logs > logs.txt
```

## 📚 Project Structure

```
MicroserviceProject/
├── api-gateway/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── currency-exchange-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── currency-conversion-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── limits-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── naming-server/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── spring-cloud-config-server/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── git-localconfiguration-repository/
│   ├── limits-service.properties
│   ├── limits-service-dev.properties
│   ├── limits-service-qa.properties
│   └── limits-service-prod.properties
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── modules/
│   │   │   └── app.module.ts
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── .env
├── DOCKER_SETUP.md
└── README.md (this file)
```

## 🔗 Quick Links

- [Docker Setup Guide](./DOCKER_SETUP.md)
- [Frontend README](./frontend/FRONTEND_README.md)
- [Backend Services Documentation](#)
- [API Documentation](#)

## 📞 Support & Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Angular Documentation](https://angular.io)
- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose)

### Tools
- [Postman](https://www.postman.com/) - API Testing
- [Docker Desktop](https://www.docker.com/products/docker-desktop) - Docker GUI
- [Visual Studio Code](https://code.visualstudio.com/) - IDE
- [Spring Boot Starter](https://start.spring.io/) - Project Generator

## 📝 Notes

### Default Credentials
- **Frontend Login**: Any username (min 3 chars) + password (min 6 chars)
- **Eureka**: No authentication (localhost:8761)
- **Config Server**: No authentication (localhost:8888)

### Important Files
- **Docker Compose**: `docker-compose.yml` - Service orchestration
- **Dockerfiles**: Each service directory - Image definitions
- **Environment**: `.env` - Configuration variables
- **Frontend**: `frontend/` - Angular application

### Common Issues & Solutions
1. **Ports already in use**: Change ports in `.env` or `docker-compose.yml`
2. **Out of memory**: Reduce JVM heap in Dockerfile or docker-compose.yml
3. **CORS errors**: Check API Gateway CORS configuration
4. **Token expires**: Re-login or clear localStorage

## 🎯 Next Steps

1. ✅ Start all services with Docker Compose
2. ✅ Access frontend at http://localhost:4200
3. ✅ Login with demo credentials
4. ✅ Explore all modules and features
5. ✅ Check API Gateway at http://localhost:8765
6. ✅ Monitor services at http://localhost:8761 (Eureka)

## 📄 License

MIT License - Feel free to use this project for learning and reference.

## 👨‍💻 Author

Created as a complete microservices demo application with Docker and Angular.

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
=======
# Microservice-Full-stack-code
