import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Board from './pages/Board.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {path:"/",element:<Home/>},
      {path:"/login",element:<Login/>},
      {path:"/register",element:<Signup />},
      {path:"/dashboard",
        element:(
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
      )},
      {path:"/boards",element:(
      <ProtectedRoute>
        <Board />
      </ProtectedRoute>
      )},
      {path:"/boards/:id",element:(
        <ProtectedRoute>
          <Board />
        </ProtectedRoute>
      )}
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
