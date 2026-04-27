<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge&labelColor=138808" alt="Made in India" />
</p>

<h1 align="center">🗳️ VotePath AI</h1>
<h3 align="center">Personalized Election Journey Assistant</h3>

<p align="center">
  <em>An AI-powered civic technology platform that democratizes the Indian election process by providing personalized, step-by-step guidance powered by Google Gemini.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Google-Gemini%202.0%20Flash-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
</p>

---

## 🚨 The Problem

India is the world's largest democracy with over **950 million registered voters**, yet millions miss their opportunity to vote in every election. Why?

1. **Information Overload:** Voters are forced to navigate fragmented, dense, and confusing bureaucratic guidelines.
2. **Lack of Personalization:** A 19-year-old first-time voter in rural Maharashtra has fundamentally different needs and steps than a 45-year-old registered voter in urban Delhi. Current systems treat them identically.
3. **Language Barriers:** Critical voting procedures are often locked behind complex language and poor translation.

> [!WARNING]
> Without clear, personalized, and accessible guidance, the democratic process becomes intimidating, leading to lower voter turnout and disenfranchisement.

---

## 💡 Why This Solution Matters

**VotePath AI** transforms the voting experience from a confusing bureaucratic maze into a **clear, personalized journey**. 

By leveraging **Google Gemini 2.0 Flash**, we eliminate the noise. Instead of showing a voter a 50-page PDF on election rules, we profile the user and use AI to generate the exact 5 steps *they* need to take to cast their ballot successfully. 

### 🌍 Real-World Impact
- **Increased Turnout:** By removing friction, more citizens successfully navigate registration and voting.
- **Civic Education:** Interactive quizzes and AI-driven scenario simulations educate voters on their rights and the democratic process.
- **Accessibility:** Bilingual support (English/Hindi) ensures that critical information reaches a wider demographic.

---

## 🚀 Innovation Points

VotePath AI isn't just an FAQ wrapper; it's a dynamic, context-aware engine.

- **Dynamic Voter Profiling:** The system adapts its UI and AI prompts based on real-time user data (Age, State, Voter Status).
- **Generative "What-If" Scenarios:** Instead of static error pages, our AI simulates real-world problems (e.g., "I lost my Voter ID on election day") and generates step-by-step, ECI-compliant solutions on the fly.
- **Gamified Readiness:** A "Readiness Score" and "Smart Checklist" turn election preparation into an engaging, trackable experience.

---

## ✨ Core Features

| Feature | Description | Google Gemini Integration |
|---------|-------------|---------------------------|
| **🗺️ Personalized Journey** | A custom roadmap adapting to the user's specific registration status and state. | Gemini dynamically generates the steps, ensuring regional accuracy and filtering irrelevant ECI data. |
| **🤖 Bilingual Chatbot** | Real-time election Q&A available in English and Hindi. | Leverages Gemini's natural language understanding to provide instant, context-aware answers. |
| **✅ Smart Checklist** | A persistent, trackable checklist for election readiness. | AI generates specific tasks (e.g., "Bring Form 6") based on the user's current timeline. |
| **🎭 Scenario Simulator** | Interactive troubleshooting for common voting day issues. | Gemini powers the logic, offering actionable, officially-backed solutions for edge cases. |
| **📍 ECI Interactive Map** | A Leaflet.js powered map of India with constituency data. | Integrates with user profiles to pinpoint state-specific election guidelines. |

---

## 🏗️ Architecture

The platform follows a robust, decoupled MERN stack architecture designed for scale and fast AI inference.

![VotePath AI Architecture Diagram](Architecture.png)

### ⚡ Technical Highlights
- **AI Response Caching:** To minimize latency and API costs, frequent Gemini queries are cached in MongoDB.
- **Multi-Key Rotation:** The backend supports automatic Gemini API key rotation to handle rate limits during high-traffic election days.
- **Secure Auth:** JWT session management backed by Firebase Admin verification.

---

## 🌐 Deployment Explanation

VotePath AI is built for production readiness.
- **Frontend:** Deployed seamlessly on **Vercel**, leveraging global edge networks for lightning-fast UI delivery.
- **Backend:** Hosted on **Render**, providing a robust Node.js runtime for API handling and AI service orchestration.
- **Database:** **MongoDB Atlas** ensures scalable, secure cloud data storage for user profiles and chat histories.

---

## 🎬 Demo Readiness

The application is fully functional and ready for demonstration.

> [!TIP]
> **For Judges / Evaluators:** 
> 1. Sign up using **Google Sign-In** for instant access.
> 2. Complete the initial profiling (Set age to 18 and Status to "Unregistered" to see the First-Time Voter flow).
> 3. Interact with the **AI Chatbot** in Hindi or English.
> 4. Test the **Scenario Simulator** to see Gemini generate real-time solutions.

---

## 💻 Quick Start (Local Development)

### Prerequisites
- Node.js ≥ 18.x
- MongoDB (Local or Atlas)
- Google Gemini API Key
- Firebase Project setup

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/votepath-ai.git
cd votepath-ai

# 2. Install dependencies (installs root, client, and server)
npm run install-all

# 3. Configure Environment Variables
# Create a .env file in the root directory
PORT=5002
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
FIREBASE_PROJECT_ID=your_firebase_project_id

# 4. Start Development Servers (Frontend & Backend concurrently)
npm run dev
```

---

## 🧪 Testing

VotePath AI includes a comprehensive test suite built with **Jest** and **Supertest**, using **MongoDB Memory Server** for isolated, zero-config test execution.

```bash
# Run all tests
cd server && npm test

# Run with coverage report
npm run test:coverage

# Run verbose (detailed output)
npm run test:verbose
```

### Test Coverage

| Category | Tests | What's Covered |
|----------|-------|----------------|
| **Auth API** | 15 | Registration, login, Google auth, JWT validation, profile completion |
| **Chat API** | 8 | Message sending, history, AI response, error handling |
| **Quiz API** | 6 | Question fetch, scoring, validation |
| **Journey API** | 3 | Personalized generation, user validation |
| **Scenario API** | 5 | Scenario listing, execution, fallbacks |
| **Booth API** | 3 | Booth guidance, geolocation |
| **Edge Cases** | 12 | XSS, NoSQL injection, long inputs, concurrency |
| **AI Fallback** | 9 | Gemini unavailable, cache, key rotation |
| **Integration** | 4 | Full user journey, complete auth flow |
| **Total** | **65+** | |

---

## 🔒 Security

Production-grade security is implemented across the entire stack:

| Layer | Implementation |
|-------|---------------|
| **Authentication** | JWT tokens + Firebase Admin SDK verification |
| **Password Security** | bcryptjs hashing with salt rounds |
| **API Protection** | Tiered rate limiting (100/15min general, 20/15min auth, 30/15min AI) |
| **HTTP Headers** | Helmet.js (HSTS, XSS protection, content-type sniffing) |
| **NoSQL Injection** | express-mongo-sanitize on all inputs |
| **Payload Limits** | 1MB request body limit |
| **CORS** | Whitelist-only origin policy |
| **Error Sanitization** | No stack traces or internal details in production |

---

## ♿ Accessibility (WCAG 2.1 Compliance)

VotePath AI prioritizes inclusive design:

- ✅ **Skip-to-content link** for keyboard navigation
- ✅ **Semantic HTML** (`<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`)
- ✅ **ARIA attributes** on all interactive elements (`aria-label`, `aria-live`, `role`)
- ✅ **Focus-visible outlines** for keyboard users
- ✅ **Screen reader support** (`sr-only` class, `aria-live` regions)
- ✅ **Reduced motion** support (`prefers-reduced-motion` media query)
- ✅ **High contrast mode** support (`prefers-contrast` media query)
- ✅ **Form accessibility** — all inputs linked to labels via `htmlFor`/`id`
- ✅ **Color contrast** — WCAG AA compliant (4.5:1 minimum)

---

## 📊 Analytics & Intelligence

VotePath AI implements a data-driven analytics engine that logs every AI interaction:

- **Query Categorization:** Auto-categorizes queries into 12+ topic buckets (registration, voter ID, booth, EVM, NRI, etc.)
- **User Insights:** Personalized analytics showing query history, top topics, engagement level
- **Smart Recommendations:** AI-driven suggestions based on unexplored topics
- **Performance Metrics:** Response time tracking, cache hit rates, provider usage
- **Global Statistics:** Aggregated platform-wide query trends

### API Endpoints
```
GET /api/analytics/insights/:userId    — Personal insights
GET /api/analytics/recommendations/:userId — Smart recommendations  
GET /api/analytics/stats               — Global statistics
```

---

## 📁 Project Structure

```
votepath-ai/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages
│   │   ├── context/           # React Context providers
│   │   ├── services/          # API service layer
│   │   └── config/            # Firebase client config
│   └── index.html
├── server/                    # Express Backend
│   ├── __tests__/             # Jest test suite
│   │   ├── api/               # API endpoint tests
│   │   ├── edge-cases/        # Edge case & security tests
│   │   └── integration/       # End-to-end flow tests
│   ├── controllers/           # Route handlers
│   ├── middleware/             # Auth, rate limiting, errors
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express route definitions
│   ├── services/              # AI, cache, analytics services
│   └── config/                # DB & Firebase config
└── README.md
```

---

## 🛠️ API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register with email/password |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/auth/google` | ❌ | Google Sign-In via Firebase |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/complete-profile` | ✅ | Complete voter profile |
| POST | `/api/chat` | ✅ | Send chat message |
| GET | `/api/chat/:userId/history` | ✅ | Get chat history |
| GET | `/api/journey/:userId` | ✅ | Get personalized journey |
| GET | `/api/quiz` | ✅ | Get quiz questions |
| POST | `/api/quiz/submit` | ✅ | Submit quiz answers |
| GET | `/api/scenario/list` | ✅ | List available scenarios |
| POST | `/api/scenario` | ✅ | Run scenario simulation |
| POST | `/api/booth` | ✅ | Get booth guidance |
| GET | `/api/checklist/:userId` | ✅ | Get user checklist |
| PUT | `/api/checklist/:userId/toggle/:key` | ✅ | Toggle checklist item |
| GET | `/api/analytics/insights/:userId` | ✅ | User analytics |
| GET | `/api/health` | ❌ | System health check |

---

<p align="center">
  <strong>🇮🇳 Built with ❤️ for Indian Democracy</strong><br/>
  <em>Empowering every citizen to exercise their right to vote</em>
</p>
