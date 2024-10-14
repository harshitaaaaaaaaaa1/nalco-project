import React, { useState } from 'react'
import styles from "./UpdatePass.module.css"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UpdatePass() {

    const [contents, setContents] = useState({});
    const { email } = useSelector((state) => state.otp);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleInputs = (e) => {
        setContents({ ...contents, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            const res = await axios.post("/api/users/resetOtpPassword", {
                email: email.email,
                newPassword: contents?.newPassword,
                confirmPassword: contents?.confirmPassword
            }, { withCredentials: true });
            const data = res.data;
            setLoading(false)
            navigate("/login")
        } catch (error) {
            console.log(error);
            setError(true)
            setLoading(false)
        }
    }
    return (
        <div className={styles.mainFormDiv}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <img src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/911_profilepicture.png" className={styles.img} />
                    <label htmlFor="newPassword">Enter New Password:</label>
                    <input type="text" name='newPassword' placeholder='Enter new password' onChange={handleInputs} />

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="text" name="confirmPassword" placeholder='Confirm password' onChange={handleInputs} />
                    <p style={{ color: "red", textAlign: "center" }}>{error && "Cannot update password, try again later"}</p>
                    <div>
                        <button type='submit'>
                            Reset
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}
