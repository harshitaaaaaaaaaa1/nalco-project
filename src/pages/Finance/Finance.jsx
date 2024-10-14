import React, { useEffect, useState } from 'react'
import "./Finance.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar';
import Analysis from '../../components/Analysis';
import axios from 'axios'
import Chatbot from '../../components/Chatbot';
import ContactUs from '../Contact/ContactUs';
import About from '../About/About';

export default function Finance() {

    const [selectedItem, setSelectedItem] = useState("Analysis")
    const items = ["Analysis", "About", "Contact", "Help"]

    const toggleBounceRate = async () => {
        try {
            const res = await axios.post("/api/visits/toggleBounce", {}, { withCredentials: true });
            // console.log(res)
            // const data = res.data;
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (selectedItem !== "Analysis" && selectedItem !== "Logout") {
            toggleBounceRate();
        }
    }, [selectedItem])

    const renderContent = () => {
        switch (selectedItem) {
            case "Analysis":
                return <Analysis />
            case "About":
                return <About />
            case "Contact":
                return <ContactUs />
            case "Help":
                return <Chatbot />
            case "Logout":
                return <div>Logout</div>
        }
    }
    return (
        <div className='finance-body'>
            <div className="d-flex">
                {/* Sidebar */}
                <Sidebar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />

                {/* Main content */}
                {renderContent()}
            </div>
        </div>
    )
}
