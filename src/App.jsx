import { Route, Routes } from "react-router-dom"

import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import AuthProvider from "./context/authContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {


  return (
   <div className="bg-slate-200 text-black flex h-screen">
    <AuthProvider>
    <Routes>
      <Route path="/" element={
      <ProtectedRoute>
        <Home/>

      </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </AuthProvider>
   </div>
  )
}

export default App
