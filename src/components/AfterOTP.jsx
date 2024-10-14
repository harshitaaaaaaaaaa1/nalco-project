import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function AfterOTP() {
    const { canUpdatePass } = useSelector((state) => state.otp)
    return (
        canUpdatePass ? <Outlet /> : <Navigate to={"/"} />
    )
}
