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

## Screenshots

<img width="1920" height="969" alt="Screenshot (164)" src="https://github.com/user-attachments/assets/e82e0fca-b870-48c0-9ec2-67f5ba5a2695" />
<img width="1920" height="969" alt="Screenshot (165)" src="https://github.com/user-attachments/assets/44e40aab-88cc-45c9-bc48-cbbf59e30fc6" />
<img width="1920" height="949" alt="Screenshot (166)" src="https://github.com/user-attachments/assets/ef508f3b-9690-40ce-a5be-6848914577ca" />
<img width="1920" height="978" alt="Screenshot (167)" src="https://github.com/user-attachments/assets/33a36daa-1ea7-4b51-8ad7-8102158a9b35" />

### Tablet View
<img width="993" height="975" alt="Screenshot (168)" src="https://github.com/user-attachments/assets/82fede81-5128-470d-9ac0-7c33039ac0ca" />

## 📌 Future Improvements

- Real-time updates with WebSockets
- Role-based access control
- Drag preview animation
- Activity logs
- Dark mode





