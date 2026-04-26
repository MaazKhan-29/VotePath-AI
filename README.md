<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge&labelColor=138808" alt="Made in India" />
</p>

<h1 align="center">🗳️ VotePath AI</h1>
<h3 align="center">Personalized Election Journey Assistant</h3>

<p align="center">
  <em>An AI-powered web application that guides every Indian citizen through their complete voting journey — from voter registration to election day — with personalized, step-by-step guidance powered by Google Gemini.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Design Philosophy](#-design-philosophy)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Pages & Modules](#-pages--modules)
- [AI Integration](#-ai-integration)
- [Authentication Flow](#-authentication-flow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**VotePath AI** is a full-stack web application designed to simplify and personalize the Indian election process for every citizen. Unlike generic election information portals, VotePath AI creates a **unique, personalized voting roadmap** based on the user's profile — including their age, state, constituency, voter registration status, and whether they are a first-time voter.

### The Problem

> India has **950M+ registered voters** across **10.5 lakh+ polling stations** in **543 constituencies**, yet millions miss their vote due to confusion about registration, documentation, booth locations, and election timelines. First-time voters, especially, lack a clear step-by-step path.

### The Solution

VotePath AI acts as a **personal election assistant** that:

1. **Profiles** the user's voter situation (age, state, registration status)
2. **Generates** a personalized voting journey with AI-powered steps
3. **Tracks** readiness with smart checklists and progress scoring
4. **Educates** through interactive quizzes, scenario simulations, and parliament info
5. **Guides** to the nearest polling booth with ECI-verified data
6. **Answers** any election question in real-time via a bilingual AI chatbot (English + Hindi)

---

## ✨ Key Features

### 🤖 AI-Powered Chat Assistant
- Real-time election Q&A powered by **Google Gemini 2.0 Flash**
- Bilingual support — **English** and **Hindi**
- Context-aware responses based on user profile
- Conversation history with persistent storage
- Quick-prompt suggestions for common queries

### 📅 Election Timeline Engine
- Personalized election milestones based on ECI schedules
- Dynamic timeline with progress tracking
- Date-aware alerts for registration deadlines
- Visual timeline with animated step indicators

### ✅ Smart Checklist
- AI-generated voter preparation checklist
- Real-time progress tracking with readiness percentage
- Task completion synced across sessions
- Gamified readiness scoring system

### 🗺️ Personalized Voting Journey
- Custom step-by-step voting roadmap
- Adapts based on voter status (registered/unregistered/first-time)
- Links to official ECI portals for each step
- Visual journey map with completion tracking

### 🎭 Scenario Simulator
- Interactive "what-if" scenarios for real-world voting situations
- AI generates step-by-step solutions based on ECI guidelines
- Categories: Registration issues, booth-day problems, ID verification, etc.
- Each solution links to official resources

### 🧠 Interactive Quiz System
- Test election knowledge with AI-generated questions
- Score tracking with readiness bonus integration
- Covers: Constitution, ECI procedures, voter rights, and more
- Difficulty-adaptive question generation

### 📍 Polling Booth Finder
- Locate the nearest polling station
- Information about what to carry on election day
- Booth timings, accessibility info, and directions
- State-wise booth data

### 🌐 India ECI Map
- Interactive map powered by **Leaflet.js**
- State-wise election data and voter statistics
- Zone-based color coding (North, South, East, West, Central, NE)
- Clickable states with constituency and demographic details
- Direct links to state election commission portals

### 🏛️ Parliament Explorer
- Detailed information on **Lok Sabha** and **Rajya Sabha**
- Visual hemicycle chamber representations
- State-wise seat distribution charts
- Parliamentary session information
- Key constitutional facts and powers

### 👤 User Profile & Settings
- Comprehensive profile management
- Voter status tracking
- Dark/Light theme toggle
- Session management with secure JWT

---

## 🎨 Design Philosophy

### Indian National Theme 🇮🇳

The entire UI is designed around the **Indian National Flag** color palette to evoke a sense of patriotism and civic duty:

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| **Primary (Saffron)** | `#E65100` | `#FF9933` | Buttons, CTAs, primary accents |
| **Secondary (India Green)** | `#1B5E20` | `#4CAF50` | Success states, secondary accents |
| **Accent (Ashoka Blue)** | `#000080` | `#5C6BC0` | Links, informational elements |
| **Background** | `#FFFAF5` (warm white) | `#0A0A0A` (deep black) | Page backgrounds |

### Visual Elements
- **Tricolor Gradient Strip** — Animated saffron-white-green shimmer between sections
- **Tricolor Progress Ring** — SVG gradient ring for readiness scoring
- **Glassmorphism Cards** — Frosted glass effect with backdrop blur
- **Micro-animations** — Framer Motion for all transitions and interactions
- **3D Background** — Three.js particle field with saffron-tinted particles
- **Dark Mode** — Full dark theme support with theme-aware CSS variables

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 8.x | Build Tool & Dev Server |
| TailwindCSS | 4.x | Utility-first CSS |
| Framer Motion | 12.x | Animations & Transitions |
| React Router | 7.x | Client-side Routing |
| Three.js | 0.184 | 3D Background Effects |
| @react-three/fiber | 9.x | React Three.js Renderer |
| Leaflet | 1.9 | Interactive Maps |
| React Leaflet | 5.x | React Leaflet Bindings |
| Axios | 1.x | HTTP Client |
| React Hot Toast | 2.x | Toast Notifications |
| React Icons | 5.x | Icon Library (Feather Icons) |
| Firebase | 12.x | Google OAuth (Client SDK) |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.x | REST API Framework |
| MongoDB | 7+ | Database |
| Mongoose | 8.x | MongoDB ODM |
| @google/genai | 1.x | Gemini AI SDK |
| Firebase Admin | 13.x | Server-side Auth Verification |
| JSON Web Token | 9.x | Authentication Tokens |
| bcryptjs | 3.x | Password Hashing |
| Morgan | 1.x | HTTP Logger |
| CORS | 2.x | Cross-Origin Requests |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT (React)                     │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  Pages   │  │Components │  │   Context/State   │  │
│  │ (14 JSX) │  │ (9 JSX)   │  │  (UserContext)    │  │
│  └────┬─────┘  └─────┬─────┘  └────────┬─────────┘  │
│       └──────────────┼─────────────────┘             │
│                      ▼                                │
│              ┌──────────────┐                        │
│              │  API Service │ (Axios)                │
│              └──────┬───────┘                        │
└─────────────────────┼────────────────────────────────┘
                      │  HTTP (REST)
                      ▼
┌──────────────────────────────────────────────────────┐
│                   SERVER (Express)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Routes  │  │Controllers│  │   Middleware      │   │
│  │ (9 files)│──│ (handlers)│  │ (auth, errors)   │   │
│  └──────────┘  └────┬─────┘  └──────────────────┘   │
│                     │                                 │
│        ┌────────────┼────────────┐                   │
│        ▼            ▼            ▼                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐        │
│  │  Models  │ │AI Service│ │Prompt Service│        │
│  │(Mongoose)│ │ (Gemini) │ │  (Templates) │        │
│  └────┬─────┘ └──────────┘ └──────────────┘        │
│       ▼                                              │
│  ┌──────────┐                                       │
│  │ MongoDB  │                                       │
│  └──────────┘                                       │
└──────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
VotePath AI/
├── .env                          # Environment variables (root level)
├── .gitignore                    # Git ignore rules
├── package.json                  # Root package (concurrently)
│
├── client/                       # ── FRONTEND ──
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   └── assets/               # Static images (hemicycle, icons)
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Router + Auth guards
│       ├── index.css             # Global styles + CSS variables + animations
│       │
│       ├── config/
│       │   └── firebase.js       # Firebase client configuration
│       │
│       ├── context/
│       │   └── UserContext.jsx    # Global auth + user state management
│       │
│       ├── layouts/
│       │   └── DashboardLayout.jsx  # Navbar + sidebar + responsive shell
│       │
│       ├── pages/
│       │   ├── LandingPage.jsx      # Public home page
│       │   ├── AuthPage.jsx         # Login / Register
│       │   ├── SetupPage.jsx        # Profile completion
│       │   ├── OverviewPage.jsx     # Dashboard home
│       │   ├── TimelinePage.jsx     # Election timeline
│       │   ├── ChatPage.jsx         # AI chatbot
│       │   ├── BoothPage.jsx        # Polling booth finder
│       │   ├── ECIMapPage.jsx       # Interactive India map
│       │   ├── ParliamentPage.jsx   # Lok Sabha & Rajya Sabha
│       │   ├── ScenarioPage.jsx     # Scenario simulator
│       │   ├── QuizPage.jsx         # Election quiz
│       │   ├── JourneyPage.jsx      # Voting journey map
│       │   ├── ChecklistPage.jsx    # Smart checklist
│       │   └── ProfilePage.jsx      # User profile & settings
│       │
│       ├── components/
│       │   ├── Background3D.jsx     # Three.js particle background
│       │   ├── ChatAssistant.jsx    # Chat message handler
│       │   ├── BoothAssistant.jsx   # Booth finder logic
│       │   ├── ScenarioSimulator.jsx # Scenario engine
│       │   ├── QuizSection.jsx      # Quiz game engine
│       │   ├── SmartChecklist.jsx   # Checklist with progress
│       │   ├── VotingJourney.jsx    # Journey step renderer
│       │   ├── TimelineEngine.jsx   # Timeline renderer
│       │   └── ReadinessScore.jsx   # Score display component
│       │
│       └── services/
│           └── api.js              # Axios API client
│
└── server/                       # ── BACKEND ──
    ├── package.json
    ├── server.js                 # Express app entry point
    │
    ├── config/
    │   ├── db.js                 # MongoDB connection
    │   └── firebase.js           # Firebase Admin SDK setup
    │
    ├── middleware/
    │   ├── authMiddleware.js     # JWT verification + protect routes
    │   └── errorHandler.js       # Global error handler
    │
    ├── models/
    │   ├── User.js               # User schema (profile, voter info)
    │   ├── Checklist.js          # Checklist items + progress
    │   ├── ChatHistory.js        # Chat conversation storage
    │   ├── QuizResult.js         # Quiz scores + history
    │   └── ResponseCache.js      # AI response caching
    │
    ├── routes/
    │   ├── authRoutes.js         # POST /register, /login, /google
    │   ├── userRoutes.js         # GET/PUT /profile
    │   ├── journeyRoutes.js      # GET /journey
    │   ├── chatRoutes.js         # POST /send, GET /history
    │   ├── checklistRoutes.js    # GET/PUT /checklist
    │   ├── timelineRoutes.js     # GET /timeline
    │   ├── scenarioRoutes.js     # POST /simulate
    │   ├── quizRoutes.js         # POST /generate, /submit
    │   └── boothRoutes.js        # POST /find
    │
    └── services/
        ├── aiService.js          # Gemini AI client (multi-key rotation)
        └── promptService.js      # Structured prompt templates
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Node.js** | ≥ 18.x | `node --version` |
| **npm** | ≥ 9.x | `npm --version` |
| **MongoDB** | ≥ 7.x | `mongod --version` |
| **Git** | Any | `git --version` |

You will also need:
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)
- A **Firebase Project** — [Create one here](https://console.firebase.google.com/)
- A **MongoDB instance** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/votepath-ai.git
cd votepath-ai
```

### 2. Install All Dependencies

This single command installs root, server, and client dependencies:

```bash
npm run install-all
```

Or install them individually:

```bash
# Root (concurrently)
npm install

# Server
cd server && npm install && cd ..

# Client
cd client && npm install && cd ..
```

### 3. Configure Firebase

#### Client-side (Firebase SDK)

1. Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → Project Settings
2. Under **General** → **Your apps** → Add a **Web App**
3. Copy the Firebase config object
4. Update `client/src/config/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. Enable **Google Sign-In** in Firebase Console → Authentication → Sign-in method

#### Server-side (Firebase Admin SDK)

1. Go to Firebase Console → Project Settings → **Service Accounts**
2. Click **Generate New Private Key**
3. Save the JSON file as `server/config/serviceAccountKey.json`
4. Add `FIREBASE_PROJECT_ID` to your `.env` file

### 4. Set Up Environment Variables

Create a `.env` file in the **root directory**:

```env
# Server
PORT=5002
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FIREBASE_PROJECT_ID=your-firebase-project-id

# MongoDB
MONGODB_URI=mongodb://localhost:27017/votepath-ai

# Gemini AI (comma-separated for key rotation)
GEMINI_API_KEY=your_gemini_api_key_1,your_gemini_api_key_2
GEMINI_MODEL=gemini-2.0-flash
GEMINI_TIMEOUT=15000
```

### 5. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or if using MongoDB Atlas, just ensure your MONGODB_URI is correct
```

---

## ▶️ Running the Application

### Development Mode (Recommended)

Start both frontend and backend simultaneously:

```bash
npm run dev
```

This runs:
- **Frontend** → `http://localhost:5173` (Vite dev server)
- **Backend** → `http://localhost:5002` (Express API server)

### Run Individually

```bash
# Start only the backend
npm run server

# Start only the frontend
npm run client
```

### Production Build

```bash
cd client
npm run build
```

The production build will be output to `client/dist/`.

---

## 🔌 API Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register with email & password |
| `POST` | `/api/auth/login` | Login with email & password |
| `POST` | `/api/auth/google` | Login/register with Google OAuth |

### User (Protected 🔒)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user/profile` | Get user profile |
| `PUT` | `/api/user/profile` | Update user profile |

### AI Features (Protected 🔒)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat/send` | Send message to AI chatbot |
| `GET` | `/api/chat/history` | Get chat conversation history |
| `GET` | `/api/journey` | Get personalized voting journey |
| `GET` | `/api/checklist` | Get smart checklist |
| `PUT` | `/api/checklist` | Update checklist item status |
| `GET` | `/api/timeline` | Get election timeline |
| `POST` | `/api/scenario/simulate` | Simulate a voter scenario |
| `POST` | `/api/quiz/generate` | Generate quiz questions |
| `POST` | `/api/quiz/submit` | Submit quiz answers |
| `POST` | `/api/booth/find` | Find nearest polling booth |

### Health Check (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server status + AI availability |

---

## 📱 Pages & Modules

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Public homepage with features, stats, testimonials, and CTA |
| **Auth** | `/auth` | Login/Register with email or Google OAuth |
| **Setup** | `/setup` | First-time profile completion (state, age, voter status) |
| **Overview** | `/dashboard` | Dashboard home with readiness ring, quick links, and status |
| **Timeline** | `/dashboard/timeline` | Election timeline with deadlines and milestones |
| **AI Chat** | `/dashboard/chat` | Bilingual AI chatbot with quick prompts |
| **Booth Guide** | `/dashboard/booth` | Polling station finder with election-day tips |
| **ECI Map** | `/dashboard/eci-map` | Interactive India map with state-wise election data |
| **Parliament** | `/dashboard/parliament` | Lok Sabha & Rajya Sabha explorer with seat data |
| **Scenarios** | `/dashboard/scenarios` | AI-powered voter scenario simulator |
| **Quiz** | `/dashboard/quiz` | Interactive election knowledge quiz |
| **Journey** | `/dashboard/journey` | Personalized voting journey roadmap |
| **Profile** | `/dashboard/profile` | User profile management and settings |

---

## 🤖 AI Integration

### Google Gemini 2.0 Flash

VotePath AI uses **Google Gemini** as its primary AI provider for:

- **Chat responses** — Election-related Q&A in English/Hindi
- **Journey generation** — Personalized step-by-step voting roadmaps
- **Scenario simulation** — Realistic voter situation solutions
- **Quiz generation** — Dynamic election knowledge questions
- **Checklist creation** — Voter preparation task lists
- **Booth information** — Polling station details and guidance

### Key AI Features

- **Multi-key rotation** — Supports multiple API keys with automatic failover
- **Response caching** — MongoDB-based cache to reduce API calls
- **Structured prompts** — Carefully engineered prompt templates in `promptService.js`
- **Context injection** — User profile data injected into prompts for personalization
- **Error resilience** — Graceful fallback when AI is unavailable

---

## 🔐 Authentication Flow

```
User clicks "Sign In with Google"
        │
        ▼
Firebase Client SDK → Google OAuth popup
        │
        ▼
Firebase returns ID Token
        │
        ▼
Client sends token to POST /api/auth/google
        │
        ▼
Server verifies token via Firebase Admin SDK
        │
        ▼
Server creates/finds user in MongoDB
        │
        ▼
Server returns JWT token
        │
        ▼
Client stores JWT → All future API calls include JWT
        │
        ▼
Middleware verifies JWT on every protected route
```

### Security Features
- **JWT-based authentication** with configurable expiration
- **Firebase Admin SDK** server-side token verification
- **bcryptjs** password hashing for email/password auth
- **Protected routes** middleware on all sensitive endpoints
- **CORS** configured for cross-origin security

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing **Indian Tricolor** color theme for any UI changes
- Use **CSS variables** from `index.css` instead of hardcoded colors
- All new API routes must be **JWT-protected** unless explicitly public
- AI prompts should be added to `promptService.js` with proper templates
- Components should use **Framer Motion** for animations

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>🇮🇳 Built with ❤️ for Indian Democracy</strong><br/>
  <em>Empowering every citizen to exercise their right to vote</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🟠_Saffron-Courage%20%26%20Sacrifice-FF9933?style=flat-square" />
  <img src="https://img.shields.io/badge/⬜_White-Peace%20%26%20Truth-FFFFFF?style=flat-square&labelColor=999" />
  <img src="https://img.shields.io/badge/🟢_Green-Faith%20%26%20Fertility-138808?style=flat-square" />
</p>
