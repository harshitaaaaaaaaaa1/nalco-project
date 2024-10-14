import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function Sidebar({ items, selectedItem, onSelectedItem }) {

    const navigate = useNavigate();
    const loginRef = useRef(null);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser !== null) {
            loginRef.current = new Date().getTime();
        }
    }, []);

    const logoutReq = async () => {
        const res = await axios.post("/api/users/logout", {}, { withCredentials: true });
        const data = res.data;
        navigate("/login")
        return data;
    }

    const updateDurationReq = async (visitDuration) => {
        const res = await axios.post("/api/users/updateDuration", { duration: visitDuration }, { withCredentials: true });
        const data = res.data;
        // console.log(data);
        return data;
    }

    const handleLogout = async () => {
        // onSelectedItem("Logout")
        if (confirm("Are you sure you want to logout?") === true) {
            try {
                const logoutTime = new Date().getTime();
                const visitDuration = Math.floor((logoutTime - loginRef.current) / 1000);
                // console.log(visitDuration);
                // const res = await axios.post("/api/users/logout", {}, { withCredentials: true });
                // const data = res.data;
                // console.log(data);
                // navigate("/login")

                const [logoutData, updateDurationData] = await Promise.all([
                    logoutReq(),
                    updateDurationReq(visitDuration)
                ])
                // console.log(logoutData)
            } catch (error) {
                console.log(error)
                alert("Something went wrong while logging you out, please try again later")
            }
        }
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleLogout)

        return () => {
            window.addEventListener("beforeunload", handleLogout)
        }
    })
    return (
        <nav className="sidebar bg-light vh-100 p-3">
            <div className="text-center mb-4">
                <img className="img"
                    src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/911_profilepicture.png" />
                <h5 style={{ color: "rgb(139,4,4)", fontFamily: "Arial, Helvetica, sans-serif", marginTop: "20px", fontWeight: "bolder" }}>
                    NALCO</h5>
            </div>
            <ul className="nav flex-column">
                {items?.map((item, index) => (
                    <li className="nav-item" key={index} onClick={() => onSelectedItem(item)}>
                        <Link className={`nav-link ${selectedItem === item ? "active" : ""}`} to={"#"}><i className="fas fa-chart-bar"></i>{item}</Link>
                    </li>
                ))}
                <li className="nav-item" onClick={handleLogout}>
                    <Link className={`nav-link`}><i className="fas fa-chart-bar"></i>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}
