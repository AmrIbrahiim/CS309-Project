# UniTrade – Campus Marketplace (CS 309 – Project 10)

Week 1 Deliverable: Scalable React + Express + MongoDB architecture built for a 6-member team, adapted directly from the `CS309_Student_Registration_Lab` starter logic.

> **Week 1 Scope Notice:** Per the CS 309 schedule, Week 1 focuses on the **Project Presentation** and the three **React Account Screens** (`Register`, `Login`, and `Profile`) with client-side validation. **Full authentication integration (password hashing, tokens, and route protection) is intentionally deferred to Week 3.**

---

## Tech Stack
- **Frontend:** React.js (Create React App), HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js + Express.js (ES Modules)
- **Database:** MongoDB Atlas + Mongoose

---

## Project Structure & 6-Member Ownership

```text
UniTrade_Week1/
├── .gitignore
├── README.md
├── docs/
│   └── WEEK1_PRESENTATION_OUTLINE.md   # 5 required analysis topics (10 marks)
├── frontend/
│   ├── public/                         # Static HTML & icons
│   └── src/
│       ├── App.js / App.css            # Member 1 (Repo Lead & Navigation)
│       ├── context/UserContext.js      # Member 1 (Shared UI state)
│       ├── components/
│       │   ├── Navbar.js / .css        # Member 1
│       │   ├── FormInput.js / .css     # Member 5 (Shared UI controls)
│       │   └── AlertMessage.js / .css  # Member 5
│       ├── utils/validators.js         # Member 5 (Shared validation logic)
│       ├── data/mockUsers.js           # Member 5 (Demo data - no private records)
│       ├── services/userService.js     # Member 6 (fetch API + local demo fallback)
│       └── features/
│           ├── register/               # Member 2 (Register Component - 4 marks)
│           ├── login/                  # Member 3 (Login Component - 3 marks)
│           └── profile/                # Member 4 (Profile Component - 3 marks)
└── backend/                            # Member 6 (Adapted from Starter Lab)
    ├── .env.example                    # Safe template (never commit .env)
    ├── server.js                       # Express + CORS + MongoDB connection
    ├── dev-local.js                    # Starts API with a persistent local MongoDB
    ├── data/demoUsers.js               # Demo accounts seeded into the local DB
    ├── routes/userRoutes.js            # GET, POST, PUT /api/users
    └── models/
        ├── User.js                     # Active Week 1 schema (adapted from Student.js)
        └── Listing.js                  # Week 2/3 starter schema scaffold
```

---

## Quick Start

### Option A: Run Frontend Only (Fastest for Week 1 Demo)
`userService.js` automatically falls back to local demonstration data (`mockUsers.js` + `localStorage`) if the backend server is not running.

```bash
cd frontend
npm install
npm start
```
Open <http://localhost:3000>.

### Option B: Run Full-Stack (Frontend + Express + MongoDB)
1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   `npm run dev` starts a real local MongoDB (data persisted in `backend/.data/mongodb`) and seeds the three demo accounts on first run. Wait for `MongoDB Connected Successfully` and `Server running on http://localhost:5000`.

   To use MongoDB Atlas instead, create `backend/.env` with your `MONGODB_URI` and run:
   ```bash
   npm start
   ```

2. **Start Frontend** (in a second terminal):
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The navbar status badge will automatically switch from **Demo Mode (Local)** to **API Connected**.

---

## Demo Accounts (Preloaded for Week 1 Testing)
All accounts use fictional demonstration data (no private university records):
- **Buyer:** `nadia.tarek@campus.edu` (any 6+ char password in Week 1 validation)
- **Seller:** `omar.khaled@campus.edu` (any 6+ char password in Week 1 validation)
- **Moderator:** `salma.hassan@campus.edu` (any 6+ char password in Week 1 validation)
