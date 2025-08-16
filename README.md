# Pynea Web App

A React web application demonstrating Domain-Driven Design (DDD) and Object-Oriented principles with a clean separation of layers and event-driven architecture.

## 🏗️ Architecture Overview

The application follows a layered architecture with clear separation of concerns:

### Core Layers
- **Domain Layer**: Business logic, validation, and data processing
- **Network Layer**: HTTP requests via NetworkManager
- **Event Bus**: Typed event communication between features
- **Controllers**: State management and coordination
- **UI Layer**: React components

### Key Features
- **Welcome Feature**: Access code validation with predefined codes
- **Dashboard Feature**: Container with Feed and Analytics tabs
- **Feed Sub-Feature**: Data fetching and display from external API
- **Analytics Sub-Feature**: Data processing with caching rules and periodic updates

## 🚀 Features Implemented

### 1. Welcome Feature (`/`)
- ✅ Access code input with validation
- ✅ Predefined valid codes: `ALFA-1234`, `BETA-5678`, `GAMMA-9012` (case-insensitive)
- ✅ Error handling for invalid codes
- ✅ Navigation to dashboard on successful validation
- ✅ Authentication state management
- ✅ Protected routes - cannot bypass validation via URL

### 2. Dashboard Feature (`/dashboard`)
- ✅ Tab navigation between Feed and Analytics
- ✅ Default tab: Feed
- ✅ Analytics counter display from event bus
- ✅ Event subscription management
- ✅ Authentication required for all dashboard routes

### 3. Feed Sub-Feature
- ✅ Data fetching from JSONPlaceholder API
- ✅ Loading, error, and empty states
- ✅ Refresh functionality
- ✅ Clean list view with key fields

### 4. Analytics Sub-Feature
- ✅ Data fetching from JSONPlaceholder API
- ✅ Odd/Even caching rule implementation
- ✅ Periodic fetching every 5 seconds
- ✅ Event publishing on data processing
- ✅ Cached vs displayed state handling

### 5. Event-Driven Architecture
- ✅ Typed Event Bus implementation
- ✅ AnalyticsReportEvent publishing
- ✅ Dashboard subscription to events
- ✅ Real-time counter updates

### 6. Network Management
- ✅ Centralized NetworkManager
- ✅ Success/error callback handling
- ✅ Domain layer integration

## 🛠️ Technical Implementation

### Domain-Driven Design Principles
- **AccessCodeDomain**: Business logic for access code validation
- **FeedDomain**: Data fetching and transformation
- **AnalyticsDomain**: Complex business rules (odd/even caching)

### Object-Oriented Design
- **Singleton Pattern**: EventBus, NetworkManager, GlobalCache
- **Observer Pattern**: Event subscription system
- **Strategy Pattern**: Different data processing strategies
- **Factory Pattern**: Controller instantiation

### Clean Architecture
- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Single Responsibility**: Each class has one reason to change

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard route
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page with routing
├── components/            # React UI components
│   ├── WelcomePage.tsx    # Welcome feature UI
│   ├── FeedTab.tsx        # Feed sub-feature UI
│   └── AnalyticsTab.tsx   # Analytics sub-feature UI
├── controllers/           # Feature controllers
│   ├── WelcomeController.ts
│   ├── DashboardController.ts
│   ├── FeedController.ts
│   └── AnalyticsController.ts
├── core/                  # Core infrastructure
│   ├── EventBus.ts        # Event-driven communication
│   ├── NetworkManager.ts  # HTTP request handling
│   └── GlobalCache.ts     # Global cache service
├── domain/                # Domain layer
│   ├── AccessCodeDomain.ts
│   ├── FeedDomain.ts
│   └── AnalyticsDomain.ts
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application
1. Open [http://localhost:3000](http://localhost:3000)
2. Enter one of the valid access codes:
   - `ALFA-1234`
   - `BETA-5678`
   - `GAMMA-9012`
3. Navigate to the dashboard
4. Explore Feed and Analytics tabs

## 🧪 Testing the Features

### Welcome Feature
- Try valid codes: Should navigate to dashboard
- Try invalid codes: Should show error message
- Test case sensitivity: Codes are case-insensitive

### Feed Feature
- Data loads automatically
- Refresh button works
- Error handling for network issues
- Empty state handling

### Analytics Feature
- Automatic 5-second refresh
- Odd/Even caching rule demonstration
- Event counter updates in dashboard header
- Cached vs displayed states

### Event System
- Analytics events update dashboard counter
- Real-time event propagation
- Proper cleanup on component unmount

## 🎯 Key Design Patterns

1. **Domain-Driven Design**: Business logic isolated in domain layer
2. **Event-Driven Architecture**: Loose coupling via event bus
3. **MVC Pattern**: Controllers manage state and coordinate
4. **Repository Pattern**: NetworkManager abstracts data access
5. **Observer Pattern**: Event subscription system
6. **Singleton Pattern**: Core services (EventBus, NetworkManager, GlobalCache)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Notes

- The application uses JSONPlaceholder API for demo data
- All network calls go through the NetworkManager
- Event bus enables loose coupling between features
- Global cache demonstrates domain-enforced business rules
- Periodic fetching demonstrates real-time data updates

This implementation demonstrates modern React patterns with a focus on clean architecture, maintainability, and scalability.
