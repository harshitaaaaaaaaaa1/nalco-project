import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

export default function Register() {

    const [contents, setContents] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        setContents({ ...contents, [e.target.name]: e.target.files[0] });
    }

    const handleChange = (e) => {
        setContents({ ...contents, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            setLoading(true);
            let user_captcha_value = document.getElementById("captcha").value;
            if (validateCaptcha(user_captcha_value, false) == true) {
                console.log('Captcha Matched');
                const res = await axios.post("/api/users/register", contents, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                const data = res.data;
                console.log(data);
                setLoading(false)
                setError(null);
                navigate("/login")

            }
            else {
                setError({ success: false, message: "Captcha Does Not Match" });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error.response?.data);
        }

    }


    return (
        <div className='form-main-body'>
            <div className="container" id="cont">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mt-5">
                            <div className="card-header bg-danger text-white">
                                <img className="img" src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/911_profilepicture.png" alt="" />
                                <h3 className="text-center">NALCO Register</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row' style={{ display: "flex", justifyContent: 'center' }}>
                                    <div className="col-md-7">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="fullName">Full Name</label>
                                                <input type="text" name='fullName' className='form-control' id='fullName' placeholder='Full Name' required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dob">Date of Birth (HSC Certificate)</label>
                                                <input type="date" name='dob' className="form-control" id="dob" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="userId">Username</label>
                                                <input type="text" name='username' className="form-control" id="userId"
                                                    placeholder="Username" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" name='password' className="form-control" id="password" placeholder="Password" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <input type="password" name='confirmPassword' className="form-control" id="confirmPassword"
                                                    placeholder="Confirm Password" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail</label>
                                                <input type="email" name='email' className="form-control" id="email" placeholder="Email Id"
                                                    required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="mobile">Mobile No(+91)</label>
                                                <input type="tel" name='mobileNumber' className="form-control" id="mobile" placeholder="Mobile No" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="profilePhoto">Profile Photo (Only Jpg/Jpeg less than 100kb, Height
                                                    and Width (100px))</label>
                                                <input type="file" name='avatar' className="form-control-file" id="profilePhoto" required onChange={handleFileChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="captcha">Captcha</label>
                                                <input type="text" className="form-control" id="captcha" required />
                                                {/* <img src="/captcha" alt="Captcha" id="captchaImage" class="mt-2" />
                                                <button type="button" class="btn btn-link">New
                                                    Captcha</button> */}
                                                <LoadCanvasTemplateNoReload />
                                            </div>
                                            <p className='text-danger'>{error && error?.message}</p>
                                            <button type="submit" className="btn btn-success" style={{ color: "white" }}>
                                                {loading ? <ColorRing
                                                    visible={true}
                                                    height="20"
                                                    width="20"
                                                    ariaLabel="color-ring-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="color-ring-wrapper"
                                                    colors={["#A9A9A9", "#A9A9A9", "#A9A9A9", "#A9A9A9", "#A9A9A9"]}
                                                /> : "Create new user"}
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer text-center'>
                                <Link to={"/"}>Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
