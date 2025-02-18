import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  console.log("App component rendered")
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <ProtectedRoute>
    //         // this will check if we have access token or not.
    //         // if not, it will naviaget us to login automatically
    //           <Home />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/logout" element={<Logout />} />
    //     <Route path="/register" element={<RegisterAndLogout />} />
    //     <Route path="*" element={<NotFound />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <Header/>
  )
}

export default App