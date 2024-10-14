import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice.js"
import otpReducer from "./otp/otpSlice.js"

const rootReducer = combineReducers({
    user: userReducer,
    otp: otpReducer
})

export const store = configureStore({
    reducer: rootReducer
})