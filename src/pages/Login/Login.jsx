import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Login.module.css"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js';
import { ColorRing } from 'react-loader-spinner'

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [contents, setContents] = useState({});
    const [usernameError, setUsernameError] = useState(false);

    const { loading, error } = useSelector((state) => state.user);

    const handleInputs = (e) => {
        const { name, value } = e.target
        setContents({ ...contents, [name]: value });

        if (name === 'username') {
            if (/^\d/.test(value)) {
                setUsernameError(true);
            } else {
                setUsernameError(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await axios.post(`api/users/login`, contents, { withCredentials: true });
            const data = res.data;
            // console.log(data);
            dispatch(signInSuccess(data?.data))
            navigate("/");

        } catch (error) {
            console.log(error)
            dispatch(signInFailure(error.response?.data));
        }
    }

    return (
        <div>
            <div className={styles.loginMainDiv}>
                <h1 className={styles.nalcoHeading}>NALCO PERSONAL FINANCE </h1>
                <div className={styles.formDiv}>
                    <form onSubmit={handleSubmit}>
                        <img className={styles.img} src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/911_profilepicture.png" alt="" />
                        <label htmlFor="username">User:</label>
                        <input type="text" placeholder='Enter Username' name='username' onChange={handleInputs} />
                        {usernameError && (
                            <p>Username cannot start with a number</p>
                        )}
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInputs} />

                        <div style={{ marginBottom: 0 }}>
                            {error && <p>{error.message}</p>}
                        </div>

                        <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}>
                            <button type='submit' disabled={loading}>
                                {loading ?
                                    <ColorRing
                                        visible={true}
                                        height="20"
                                        width="45"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={["#A9A9A9", "#A9A9A9", "#A9A9A9", "#A9A9A9", "#A9A9A9"]}
                                    /> : "Login"
                                }
                            </button>
                        </div>
                        <div className={styles.register}>
                            <Link to={"/register"}>
                                Register? Sign Up!
                            </Link>
                        </div>

                        <div className={styles.forgot}>
                            <Link to={"/forgotPassword"}>
                                Forgotten Password
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
