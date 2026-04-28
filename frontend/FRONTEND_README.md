# Angular Frontend for Microservices

Complete Angular frontend application for managing microservices currency exchange and conversion operations.

## Features

### ✅ Core Features
- **Authentication & Login** - Simple demo login system
- **Route Guards** - Auth guard for protected routes
- **HTTP Interceptors** - Loading, Auth, and Error interceptors
- **Lazy Loading** - Feature modules load on demand
- **Responsive Design** - Bootstrap-based responsive UI

### 🎯 Modules

#### 1. **Home Module**
- Login page with form validation
- Demo credentials system
- Hero section for unauthenticated users

#### 2. **Dashboard Module**
- System overview and status
- Quick access to all features
- Microservices status display
- Architecture visualization

#### 3. **Currency Exchange Module**
- Get real-time exchange rates
- Select from/to currencies
- View exchange rate details
- Load balancing across service instances

#### 4. **Currency Conversion Module**
- Convert currencies with real-time rates
- Validation for conversion amounts
- Unsaved changes warning (CanDeactivate Guard)
- Display conversion history

#### 5. **Limits Module**
- View current transaction limits
- Update minimum/maximum limits
- Form validation
- Success/error feedback

### 🔐 Security & Guards

#### Auth Guard
- Protects authenticated routes
- Redirects unauthenticated users to home

#### CanDeactivate Guard
- Warns before leaving components with unsaved changes
- Implemented on Currency Conversion page

### 🌐 HTTP Interceptors

#### 1. **Auth Interceptor**
- Adds Bearer token to all requests
- Retrieves token from AuthService

#### 2. **Loading Interceptor**
- Shows/hides loading spinner
- Tracks active HTTP requests

#### 3. **Error Interceptor**
- Handles HTTP errors globally
- Routes redirects on 401 (Unauthorized)
- Logs errors to console

### 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── can-deactivate.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── currency-exchange.service.ts
│   │   │   │   ├── currency-conversion.service.ts
│   │   │   │   ├── limits.service.ts
│   │   │   │   └── loading.service.ts
│   │   ├── modules/
│   │   │   ├── home/
│   │   │   │   ├── components/
│   │   │   │   │   └── home.component.*
│   │   │   │   └── home.module.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   └── dashboard.component.*
│   │   │   │   └── dashboard.module.ts
│   │   │   ├── currency-exchange/
│   │   │   │   ├── components/
│   │   │   │   │   └── currency-exchange.component.*
│   │   │   │   └── currency-exchange.module.ts
│   │   │   ├── currency-conversion/
│   │   │   │   ├── components/
│   │   │   │   │   └── currency-conversion.component.*
│   │   │   │   └── currency-conversion.module.ts
│   │   │   └── limits/
│   │   │       ├── components/
│   │   │       │   └── limits.component.*
│   │   │       └── limits.module.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.*
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── bootstrap.ts
├── package.json
├── tsconfig.json
├── angular.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Angular CLI 17+

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Application opens at http://localhost:4200
```

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Output in frontend/dist/microservice-frontend
```

### Running Tests

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e
```

## API Configuration

Edit the API gateway URL in services:

**File**: `src/app/core/services/*.service.ts`

```typescript
const API_GATEWAY_URL = 'http://localhost:8765';
```

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/currency-exchange/from/:from/to/:to` | GET | Get exchange rate |
| `/currency-exchange/rates` | GET | Get all rates |
| `/currency-conversion/from/:from/to/:to/quantity/:qty` | GET | Convert currency |
| `/currency-conversion/history` | GET | Get conversion history |
| `/limits-service/limits` | GET | Get limits |
| `/limits-service/limits` | POST | Update limits |

## Demo Credentials

For demo purposes, any valid credentials work:
- **Username**: Min 3 characters
- **Password**: Min 6 characters

Example:
```
Username: demo
Password: password123
```

## Features in Detail

### 1. Authentication Flow
```
1. User enters credentials on Home page
2. AuthService validates and stores token
3. Token added to all subsequent requests via AuthInterceptor
4. Protected routes checked by AuthGuard
5. Token displayed in navbar (logged-in state)
```

### 2. HTTP Request Flow
```
Request → LoadingInterceptor (show spinner)
       → AuthInterceptor (add token)
       → Service call
       → Response
       → LoadingInterceptor (hide spinner)
       → ErrorInterceptor (handle errors)
       → Component displays result
```

### 3. Component Communication
```
Component → Service (HTTP call)
        → Observable with RxJS
        → Response handling
        → UI update with AsyncPipe
```

## Styling

### Bootstrap 5
- CDN-loaded from jsDelivr
- Responsive grid system
- Pre-built components

### Custom Styles
- Component-scoped CSS files
- Global styles in `styles.css`
- CSS variables for theming

## Best Practices Implemented

✅ **Lazy Loading** - Modules loaded on-demand  
✅ **Smart Routing** - Auth guards protect routes  
✅ **Interceptors** - Centralized HTTP handling  
✅ **Services** - Single responsibility principle  
✅ **Type Safety** - TypeScript interfaces  
✅ **Reactive Forms** - Validation & state management  
✅ **Error Handling** - Global error interceptor  
✅ **Responsive Design** - Mobile-friendly  
✅ **Observable Pattern** - RxJS for async operations  
✅ **Component Structure** - Organized folder structure  

## Troubleshooting

### CORS Errors
If getting CORS errors from API:
1. Ensure API Gateway is running on port 8765
2. Check API Gateway CORS configuration
3. Verify backend services are accessible

### Loading Spinner Won't Hide
- Check if HTTP requests complete
- Verify error interceptor isn't preventing completion
- Check browser console for errors

### Route Guard Not Working
- Verify AuthGuard is applied to route
- Check AuthService state
- Verify token in localStorage

### Services Not Found
- Check API_GATEWAY_URL is correct
- Verify backend services are running
- Check browser network tab for 404 errors

## Performance Optimization

1. **Lazy Loading** - Feature modules load on route navigation
2. **Change Detection** - OnPush strategy on components
3. **Tree Shaking** - Unused code removed in production
4. **Code Splitting** - Separate bundles per feature
5. **Minification** - Production build optimized

## Deployment

### Docker Deployment

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/microservice-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Builds

```bash
# Development
ng build --configuration development

# Production
ng build --configuration production

# Staging
ng build --configuration staging
```

## Support & Documentation

- [Angular Documentation](https://angular.io)
- [Bootstrap Documentation](https://getbootstrap.com)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)

## Version History

- **v1.0.0** (Current)
  - Initial release
  - All modules and features implemented
  - Responsive design
  - Complete guards and interceptors
