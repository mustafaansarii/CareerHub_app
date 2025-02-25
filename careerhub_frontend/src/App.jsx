import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import GoogleCallback from './pages/GoogleCallback'
import Hero from './components/Hero'
import FeaturesGrid from './components/FeaturesGrid'
import ProcessSteps from './components/ProcessSteps'
import Testimonials from './components/Testimonials'
import ResourceShowcase from './components/ResourceShowcase'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import ResumeTemplates from './pages/resume'
import Profile from './pages/profile'
import DSAPage from './pages/dsa'
import Roadmap from './pages/roadmap'
import Resources from './pages/Resources'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import Tutorials from './pages/Tutorials'
import DjangoTutorials from './tutorial_pages/Frameworks/backend/djangoTutorials'
import ExpressTutorials from './tutorial_pages/Frameworks/backend/expressTutorials'
import SpringBootTutorials from './tutorial_pages/Frameworks/backend/springbootTutorials'
import FlaskTutorials from './tutorial_pages/Frameworks/backend/flaskTutorials'
import NodeTutorials from './tutorial_pages/Frameworks/backend/NodeTutorials'
import NextJSTutorials from './tutorial_pages/Frameworks/frontend/nextjsTutorials'
import ReactTutorials from './tutorial_pages/Frameworks/frontend/reactTutorials'
import SvelteTutorials from './tutorial_pages/Frameworks/frontend/svelteTutorials'
import VueTutorials from './tutorial_pages/Frameworks/frontend/vueTutorials'
import AngularTutorials from './tutorial_pages/Frameworks/frontend/angularTutorials'
import TypescriptTutorials from './tutorial_pages/language/typescript'
import SwiftTutorials from './tutorial_pages/language/swift'
import RubyTutorials from './tutorial_pages/language/ruby'
import PhpTutorials from './tutorial_pages/language/php'
import PythonTutorials from './tutorial_pages/language/python'
import CppTutorials from './tutorial_pages/language/cpp'
import CsharpTutorials from './tutorial_pages/language/csharp'
import JavaTutorials from './tutorial_pages/language/java'

import GoTutorials from './tutorial_pages/language/go'
// import AlgorithmsTutorials from './tutorial_pages/core-cs/algorithms'
// import CompilerDesignTutorials from './tutorial_pages/core-cs/compilerDesign'
// import ComputerNetworksTutorials from './tutorial_pages/core-cs/computerNetworks'
// import CybersecurityTutorials from './tutorial_pages/core-cs/cybersecurity'
// import DatabasesTutorials from './tutorial_pages/core-cs/databases'
// import DataStructuresTutorials from './tutorial_pages/core-cs/dataStructures'
// import DistributedComputingTutorials from './tutorial_pages/core-cs/distributedComputing'
// import OperatingSystemsTutorials from './tutorial_pages/core-cs/operatingSystems'
// import SoftwareEngineeringTutorials from './tutorial_pages/core-cs/softwareEngineering'
// import TheoryOfComputationTutorials from './tutorial_pages/core-cs/theoryOfComputation'

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/resume-templates" element={<ProtectedRoute><ResumeTemplates/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/dsa-sheet" element={<ProtectedRoute><DSAPage/></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap/></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>} />
        <Route path="/tutorials" element={<Tutorials/>} />
        <Route path="/tutorials/django" element={<DjangoTutorials/>} />
        <Route path="/tutorials/express" element={<ExpressTutorials/>} />
        <Route path="/tutorials/spring-boot" element={<SpringBootTutorials/>} />
        <Route path="/tutorials/flask" element={<FlaskTutorials/>} />
        <Route path="/tutorials/nodejs" element={<NodeTutorials/>} />
        <Route path="/tutorials/nextjs" element={<NextJSTutorials/>} />
        <Route path="/tutorials/react" element={<ReactTutorials/>} />
        <Route path="/tutorials/svelte" element={<SvelteTutorials/>} />
        <Route path="/tutorials/vue" element={<VueTutorials/>} />
        <Route path="/tutorials/angular" element={<AngularTutorials/>} />
        <Route path="/tutorials/typescript" element={<TypescriptTutorials/>} />
        <Route path="/tutorials/swift" element={<SwiftTutorials/>} />
        <Route path="/tutorials/ruby" element={<RubyTutorials/>} />
         <Route path="/tutorials/php" element={<PhpTutorials/>} />
        <Route path="/tutorials/c++" element={<CppTutorials />} />
        <Route path="/tutorials/javascript" element={<NodeTutorials />} />
        <Route path="/tutorials/python" element={<PythonTutorials />} />
        <Route path="/tutorials/java" element={<JavaTutorials />} />
        <Route path="/tutorials/csharp" element={<CsharpTutorials />} />
        <Route path="/tutorials/go" element={<GoTutorials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App