import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    canEnterOtp: false,
    loading: false,
    error: null,
    canUpdatePass: false,
};

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        otpSendStart: (state) => {
            state.canEnterOtp = false;
            state.loading = true;
            state.error = null;
        },
        otpSendSuccess: (state, action) => {
            state.email = action.payload;
            state.loading = false;
            state.error = null;
            state.canEnterOtp = true;
        },
        otpSendFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.canEnterOtp = false;
        },
        otpVerifyStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        otpVerifySuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.canUpdatePass = true;
        },
        otpVerifyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.canUpdatePass = false;
        }
    }
});

export const { otpSendStart, otpSendSuccess, otpSendFailure, otpVerifyStart, otpVerifySuccess, otpVerifyFailure } = otpSlice.actions;
export default otpSlice.reducer;