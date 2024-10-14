import React, { useState } from 'react';
import styles from "./ForgotPassword.module.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { otpSendFailure, otpSendStart, otpSendSuccess, otpVerifyFailure, otpVerifyStart, otpVerifySuccess } from '../../redux/otp/otpSlice.js';

export default function ForgotPassword() {
    const [contents, setContents] = useState({});

    const { loading, canEnterOtp, error } = useSelector((state) => state.otp);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputs = (e) => {
        setContents({ ...contents, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canEnterOtp) {
            try {
                dispatch(otpSendStart())
                const res = await axios.post("/api/otp/", { email: contents.email }, { withCredentials: true });
                const data = res.data;
                console.log(data)
                dispatch(otpSendSuccess(data?.data));
            } catch (error) {
                console.log(error)
                dispatch(otpSendFailure(error.response?.data));
            }
        }
        else {
            // console.log("Enter OTP first")
            try {
                dispatch(otpVerifyStart())
                const res = await axios.post("/api/otp/verify", {
                    email: contents?.email,
                    otp: contents?.otp
                });
                const data = res.data;
                console.log(data)
                dispatch(otpVerifySuccess());
                navigate("/updatePassword")
            } catch (error) {
                console.log(error);
                dispatch(otpVerifyFailure(error.response?.data));
            }
        }
    }
    return (
        <div className={styles.mainFormDiv}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <img src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/911_profilepicture.png" className={styles.img} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' placeholder='Enter your email' onChange={handleInputs} />

                    <label htmlFor="otp">OTP:</label>
                    <input type="number" name="otp" placeholder='Enter OTP' onChange={handleInputs} disabled={!canEnterOtp} />
                    {error && <p>Invalid OTP</p>}

                    <button type='submit' disabled={loading}>
                        {
                            loading ? (
                                "Loading..."
                            ) : (
                                canEnterOtp ? "Verify OTP" : "Send OTP"
                            )
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
