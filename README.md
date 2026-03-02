# 🚀 IdeaSpark – Brainstorming Board
IdeaSpark is a web-based platform enabling users to visually brainstorm and organize ideas. Users create, categorize, and rearrange idea cards on a virtual board. The backend manages user data and board persistence. The project emphasizes web UI, backend data management, and basic collaboration.

This project was built as part of my internship program and focuses on real-world full-stack development, responsive design, and interactive UI behavior.

## 🌐 Live Demo
🔗 Production URL: https://ideaspark-brainstorming-board-1x89.vercel.app/

## ✨ Features

### 🧩 Board Management
- Create new boards
- Edit board title (Board Owner only)
- Delete board (Board Owner only)
- Persistent board storage
- Secure authenticated access

### 📂 Category Management
- Add categories
- Edit category names
- Delete categories
- Real-time UI updates

### 📝 Card Management
- Add idea cards inside categories
- Edit card content
- Delete cards
- Position tracking for each card

### 🔄 Drag & Drop (Desktop + Tablet Support)
- Move cards within same category
- Move cards across categories
- Dynamic position recalculation
- Database sync on drop
- Touch support for tablet devices

### 👥 Collaboration
- Invite members to board via email
- Multi-user board access

### 🔐 Authentication
- User Registration
- Login & Logout

### 📱 Fully Responsive
- Desktop
- Tablet
- Sidebar toggle for small screens
- Token-based authentication
- Protected routes

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API (Auth Management)

### Backend
- Node.js
- Express.js
- REST API Architecture

### Database
- PostgreSQL (via Supabase)

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: Supabase

## 🏗 Architecture Overview

- Boards contain multiple Categories
- Categories contain multiple Cards
- Cards maintain a `position` field for drag-and-drop ordering
- On drag:
  - UI updates instantly
  - Positions recalculated
  - Batch update sent to backend
  - Database stays consistent

## 🧠 Key Implementation Highlights

- Custom drag-and-drop logic without external DnD libraries
- Tablet touch event handling
- Deep state cloning for nested updates
- Optimistic UI updates before DB confirmation
- Centralized toast notification system
- RESTful API structure

## 📂 Project Structure

```
frontend/
  ├── components/
  ├── pages/
  ├── context/
  ├── App.jsx
  └── main.jsx

backend/
  ├── routes/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── config/
  ├── utils/
  └── app.js
```
