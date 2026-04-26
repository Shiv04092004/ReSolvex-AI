# 🌟 ResolveX AI Enterprise Portal

ResolveX AI is a next-generation, AI-powered incident management and complaint resolution platform. Designed for enterprise environments, it automates the triage process by using AI to categorize issues, determine priority levels, and suggest immediate fixes for physical and technical hazards.

## ✨ Key Features

### 🛡️ Role-Based Access Control (RBAC) & Security
* **Standard Users**: Can seamlessly submit new incident reports with forensic image evidence. Users have a personalized dashboard restricted to viewing only their own submitted complaints.
* **Administrators**: Gain platform-wide visibility. Admins can view all complaints from all users across the organization, resolve active issues, and delete spam/duplicate reports.
* **Secure Admin Registration**: Admin registration is locked behind a strict **Admin Secret Code** (managed via `.env` variables). Standard users cannot elevate their privileges without this secure offline code.
* **JWT Authentication**: Full JSON Web Token (JWT) integration for secure, persistent user sessions.

### 🧠 AI-Powered Triage Engine
* **Automated Analysis**: Every submitted incident is parsed by the ResolveX Neural Engine.
* **Smart Categorization**: Automatically detects if an issue is a safety hazard, IT problem, or maintenance request.
* **Priority Routing**: Dynamically assigns severity levels (e.g., LOW, MEDIUM, CRITICAL) based on the context of the user's description.
* **Actionable Solutions**: The AI generates a "Suggested Fix" or immediate response protocol for administrators to follow.

### 📄 High-Fidelity PDF Dossier Generation
* Admins can generate and instantly download official **Incident Dossier Reports** as PDF files.
* Uses `html2pdf.js` for perfect 1:1 rendering of the UI, including embedded cross-origin forensic evidence images and AI analysis data.
* Smart CSS pagination logic prevents critical UI components from being awkwardly split across page breaks.

### 🎨 Next-Gen Gradient Mesh UI
* **Fluid Parallax Background**: Features a custom-built, mouse-reactive animated "Gradient Mesh" background that gently tracks the user's cursor.
* **Glassmorphism Aesthetic**: Beautiful frosted-glass cards, smooth cubic-bezier transitions, and dynamic hover states for a premium enterprise feel.
* **Zero Browser Clutter**: Custom CSS overrides to disable ugly browser autofill colors, ensuring the dark mode aesthetic is never broken.

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js installed (v16+)
* MongoDB installed (or a MongoDB Atlas Cloud URI)

### 2. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/resolvex_db
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_SECRET=RESOLVEX-ADMIN-2026
   ```
4. Run the backend development server:
   ```bash
   npm run dev
   ```
   *The API will start on http://localhost:5000*

### 3. Frontend Setup
1. Open a **new** terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will launch at http://localhost:5173*

## 🛠️ Tech Stack
* **Frontend**: React (Vite), React Router, Axios, Recharts, html2pdf.js
* **Backend**: Node.js, Express, MongoDB, Mongoose, JSON Web Tokens (JWT), Bcrypt.js
* **Styling**: Vanilla CSS with custom CSS variables, Glassmorphism, and Mobile-Responsive design.

---

## 🔒 Admin Access
To manage the platform and view all reports, you must register as an Administrator. This requires a secure **Admin Secret Key**.

> [!IMPORTANT]
> **Default Admin Secret Key:** `RESOLVEX-ADMIN-2026`
> 
> Use this key during registration to gain administrative privileges. This key is also configurable via the `ADMIN_SECRET` variable in the server's `.env` file.

---

## 📱 Mobile Responsiveness
ResolveX AI is fully optimized for mobile devices.
- **Responsive Grid System**: Layouts automatically transition from multi-column grids to stacked views on smaller screens.
- **Mobile Navigation**: Includes a touch-friendly hamburger menu for easy access to all dashboard features.
- **Optimized UI**: Charts, cards, and forms are scaled for maximum readability on mobile browsers.

---

## 📂 Project Architecture

### **Frontend (`/client`)**
- `src/components`: Reusable UI elements like Sidebar, Navbar, and Complaint Cards.
- `src/pages`: Main application views (Dashboard, Submit Report, My Reports, etc.).
- `src/services`: Logic for API communication.
- `src/index.css`: Centralized design system with custom variables and animations.

### **Backend (`/server`)**
- `models/`: Mongoose schemas for Users and Complaints.
- `controllers/`: Business logic for authentication and report management.
- `routes/`: Express API endpoints.
- `utils/`: AI Neural Engine and file upload utilities.

---

## 🌐 Deployment
The project is designed to be easily deployed on platforms like **Render**, **Vercel**, or **Heroku**.
1. **GitHub Integration**: Connect your repository to Render.
2. **Environment Variables**: Add your `MONGO_URI`, `JWT_SECRET`, and `ADMIN_SECRET` to the production environment settings.
3. **Auto-Deploy**: Changes pushed to the `main` branch will automatically trigger a redeploy.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
