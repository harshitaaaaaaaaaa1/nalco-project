import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import ForgotPassword from './pages/Forgot/ForgotPassword.jsx'
import UpdatePass from './pages/UpdatePass/UpdatePass.jsx'
import AfterOTP from './components/AfterOTP.jsx'
import Finance from './pages/Finance/Finance.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route element={<AfterOTP />}>
          <Route path='/updatePassword' element={<UpdatePass />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Finance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
