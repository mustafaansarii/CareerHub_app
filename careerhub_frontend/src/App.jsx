import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './component/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import GoogleCallback from './pages/GoogleCallback'
import Hero from './component/Hero'
import FeaturesGrid from './components/FeaturesGrid'
import ProcessSteps from './components/ProcessSteps'
import Testimonials from './components/Testimonials'
import ResourceShowcase from './components/ResourceShowcase'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import ResumeTemplates from './pages/resume'
function App() {
  return (
    <Router>
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
              <NavBar />
                <Hero />
                <FeaturesGrid />
                <ProcessSteps />
                <ResourceShowcase />
                <Testimonials />
                <FAQSection />
              </main>
              <Footer />
            </div>
          }
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Register Route */}
        <Route
          path="/register"
          element={<Register />}
        />
        {/* Forgot Password Route */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route 
          path="/api/auth/google/callback" 
          element={<GoogleCallback />} 
        />
        <Route
        path='/resume-templates'
        element={<ResumeTemplates/>}
        />
      </Routes>
    </Router>
  )
}

export default App
