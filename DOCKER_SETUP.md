# Docker Setup for Microservices Project

This Docker Compose setup runs all microservices with multiple instances for horizontal scaling.

## Architecture

```
├── Naming Server (Eureka) - Port 8761
├── Config Server - Port 8888
├── API Gateway - Port 8765
├── Limits Service - Port 8085
├── Currency Exchange Service (3 instances)
│   ├── Instance 1 - Port 8000
│   ├── Instance 2 - Port 8001
│   └── Instance 3 - Port 8002
└── Currency Conversion Service (3 instances)
    ├── Instance 1 - Port 8100
    ├── Instance 2 - Port 8101
    └── Instance 3 - Port 8102
```

## Services Overview

### Naming Server (Eureka)
- **Port**: 8761
- **Role**: Service registry and discovery
- **URL**: http://localhost:8761

### Config Server
- **Port**: 8888
- **Role**: Centralized configuration management
- **URL**: http://localhost:8888

### API Gateway
- **Port**: 8765
- **Role**: Entry point for all API requests
- **URL**: http://localhost:8765

### Currency Exchange Service (Load Balanced)
- **Ports**: 8000, 8001, 8002
- **Role**: Exchange rate retrieval from database
- **Instances**: 3 (for load balancing and high availability)
- **Database**: H2 (in-memory)

### Currency Conversion Service (Load Balanced)
- **Ports**: 8100, 8101, 8102
- **Role**: Currency conversion calculations using exchange rates
- **Instances**: 3 (for load balancing and high availability)
- **Dependencies**: Calls Currency Exchange Service via Feign

### Limits Service
- **Port**: 8085
- **Role**: Configuration limits management
- **Config**: Loaded from Spring Cloud Config Server

## Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Maven installed (for building)
- Port 8000-8102, 8761, 8765, 8888, 8085 available

### Build and Start All Services

```bash
# Build images and start all containers
docker-compose up --build

# Start in background (detached mode)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View logs of specific service
docker-compose logs -f api-gateway

# View logs of specific instance
docker-compose logs -f currency-conversion-service-1
```

### Stop Services

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop specific service
docker-compose stop api-gateway
```

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Naming Server (Eureka) | http://localhost:8761 | Service Registry & Discovery |
| Config Server | http://localhost:8888 | Configuration Management |
| API Gateway | http://localhost:8765 | API Gateway |
| Limits Service | http://localhost:8085 | Limits Configuration |
| Currency Exchange (via Gateway) | http://localhost:8765/currency-exchange | Get Exchange Rates |
| Currency Conversion (via Gateway) | http://localhost:8765/currency-conversion | Convert Currency |

## API Endpoints

### Via API Gateway (Recommended)

#### Get Exchange Rate
```bash
GET http://localhost:8765/currency-exchange/from/USD/to/INR
```

#### Convert Currency
```bash
GET http://localhost:8765/currency-conversion/from/USD/to/INR/quantity/100
```

#### Get Limits
```bash
GET http://localhost:8765/limits-service/limits
```

### Direct Service Calls (for testing)

#### Currency Exchange Service Instance 1
```bash
GET http://localhost:8000/currency-exchange/from/USD/to/INR
```

#### Currency Conversion Service Instance 1
```bash
GET http://localhost:8100/currency-conversion/from/USD/to/INR/quantity/100
```

## Scaling Services

To scale currency conversion or exchange services:

```bash
# Scale currency-conversion-service to 5 instances (requires load balancer)
docker-compose up -d --scale currency-conversion-service=5
```

Note: For dynamic scaling in production, consider using Kubernetes or Docker Swarm.

## Health Checks

Each service includes health checks. Monitor container health:

```bash
docker-compose ps
```

Output shows health status (healthy/unhealthy/starting).

## Logs and Debugging

### View all logs
```bash
docker-compose logs
```

### Real-time logs
```bash
docker-compose logs -f
```

### Specific service logs
```bash
docker-compose logs -f currency-exchange-service-1
```

### Inspect running container
```bash
docker exec -it api-gateway /bin/sh
```

## Network

All services communicate through a custom bridge network: `microservices-network`

Service-to-service communication uses container names (DNS):
- Example: `http://naming-server:8761`

## Troubleshooting

### Services won't start
1. Check port availability: `netstat -an | grep LISTEN`
2. Clean up: `docker-compose down -v`
3. Rebuild: `docker-compose up --build`

### Services can't communicate
1. Verify they're on the same network: `docker network ls`
2. Check firewall settings
3. Restart the services

### Build errors
1. Clear Maven cache: `mvn clean`
2. Rebuild images: `docker-compose build --no-cache`

### High memory usage
1. Monitor: `docker stats`
2. Adjust JVM settings in Dockerfile if needed
3. Scale down services: `docker-compose down`

## Environment Variables

Edit `.env` file to customize:
- Service ports
- Java/Spring versions
- Project name

## Production Considerations

1. Use environment-specific docker-compose files
2. Add proper logging (ELK Stack, Splunk)
3. Add monitoring (Prometheus, Grafana)
4. Use proper secrets management
5. Add resource limits and reservations
6. Enable distributed tracing (Zipkin, Jaeger)

## References

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot Docker](https://spring.io/guides/topicals/spring-boot-docker/)
- [Spring Cloud](https://spring.io/projects/spring-cloud)
