import React from "react"
import { Routes, Route } from "react-router-dom"
import AuthProvider from "./components/auth"
import RequireAuth from "./components/RequireAuth"
import Navbar from "./components/Navbar/NavBar"
import Home from "./components/Home"
import Notes from "./components/Notes/Notes"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"


export default function App() {

    return (
        <div className="app-container">
            <AuthProvider>
                <Routes>
                        <Route path='/' element={<RequireAuth><Navbar/><Home/></RequireAuth>}/>
                        <Route path='notes' element={<RequireAuth><Navbar/><Notes/></RequireAuth>}/>
                            <Route path=":note" element={<Notes />} />
                        <Route path='contact' element={<RequireAuth><Navbar/><Contact/></RequireAuth>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='*' element={<div>Page not found</div>}/>
                </Routes>
            </AuthProvider>
        </div>
    )
}
