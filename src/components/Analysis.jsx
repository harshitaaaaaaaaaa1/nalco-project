import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Graph from './Graph';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CChart } from '@coreui/react-chartjs'
import { VscGraph } from "react-icons/vsc";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { FaUserClock } from "react-icons/fa6";
import { useSelector } from 'react-redux';


const payroll = Math.round(Math.random() * (70 - 20) + 20)
const training = Math.round(Math.random() * (70 - 20) + 20)
const bonus = Math.round(Math.random() * (75 - 15) + 15)
const overtimeExpenses = (Math.random() * (24 - 11) + 11).toFixed(1);
const totalSalaryExpenses = (Math.random() * (50 - 33) + 33).toFixed(1);
const monthlyHealth = (Math.random() * (309 - 200) + 200).toFixed(1);
const chartData = [payroll, 100 - payroll]
const trainingData = [training, 100 - training]

export default function Analysis() {

    const [fetchedData, setFetchedData] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser)


    // console.log(direct(0))

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        return `${h}h ${m}m ${s}s`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/visits/getData", { withCredentials: true })
                const data = res.data;
                // console.log(data)
                setFetchedData(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='content flex-fill p-2' style={{ overflow: "hidden" }}>
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ overflow: "hidden", marginBottom: "0" }}>
                <h1 style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>Financial Statistics</h1>
                <div className="btn" style={{ display: "flex", alignItems: "center" }}>
                    <button type="button" className="btn btn-outline-primary" style={{ backgroundColor: "rgb(242, 142, 142)", color: "black", fontWeight: "700", borderRadius: '20px', border: 'none', marginRight: "8px", height: "40px" }}>30 days</button>
                    <button type="button" className="btn btn-outline-primary" style={{ backgroundColor: "rgb(242, 142, 142)", color: "black", fontWeight: "700", borderRadius: '20px', border: 'none', marginRight: "8px", height: "40px" }}>90 days</button>
                    <button type="button" className="btn btn-outline-primary" style={{ backgroundColor: "rgb(242, 142, 142)", color: "black", fontWeight: "700", borderRadius: '20px', border: 'none', marginRight: "8px", height: "40px" }}>6 months</button>
                    <button type="button" className="btn btn-outline-primary" style={{ backgroundColor: "rgb(242, 142, 142)", color: "black", fontWeight: "700", borderRadius: '20px', border: 'none', marginRight: "30px", height: "40px" }}>12 months</button>
                    <div style={{ height: "fit-content" }}>
                        <img src={currentUser?.avatar} alt="avatar" style={{ width: "40px", borderRadius: "50%" }} />
                        <p style={{ margin: "0" }}>{currentUser?.username}</p>
                    </div>
                </div>
            </div>
            <div className='row' style={{ overflow: "hidden", marginTop: "0" }}>
                <div className='col-md-6'>
                    <div className='card mb-4'>
                        <div className="card-body cardbody" id="cb1">
                            <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "25px" }}>
                                Total Salary Expenses
                            </h5>
                            <p className='card-text'>{`${totalSalaryExpenses}M` || "Loading..."}</p>
                            <div>
                                <Graph />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3' style={{ overflow: "hidden" }}>
                    <div className='card mb-3'>
                        <div className='card-body cardbody text-center' id='cb2' style={{ height: "230px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
                                {/* <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                    Average Bonus
                                </h5> */}
                                <VscGraph size={30} />
                                <p style={{ fontWeight: "900", color: "red", margin: "0" }}>
                                    <IoMdArrowDropdown size={20} />2.6%
                                </p>
                            </div>
                            <div className='card-text' style={{ height: "70%", display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{ padding: "0", margin: "0" }}>{bonus}%</p>
                                    <p style={{ padding: "0", margin: "0", fontWeight: "700", fontSize: "15px", color: "red" }}>Average Bonus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        {/* <div className='card-body cardbody text-center' id='cb3' style={{ height: "230px" }}>
                            <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                Overtime Expenses
                            </h5>

                            <p className='card-text'>{`${fetchedData?.perPageVisits}M` || "Loading..."}</p>
                        </div> */}
                        <div className='card-body cardbody text-center' id='cb2' style={{ height: "230px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
                                {/* <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                    Average Bonus
                                </h5> */}
                                <PiMoneyWavy size={30} />
                                <p style={{ fontWeight: "900", color: "red", margin: "0" }}>
                                    <IoMdArrowDropup size={20} />4.1%
                                </p>
                            </div>
                            <div className='card-text' style={{ height: "70%", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "130px" }}>
                                    <p style={{ padding: "0", margin: "0" }}>{`${overtimeExpenses}M` || "Loading..."}</p>
                                    <p style={{ padding: "0", margin: "0", fontWeight: "700", fontSize: "16px", color: "red" }}>Overtime Expenses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card mb-3'>
                        {/* <div className='card-body cardbody text-center' id='cb4'>
                            <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                Monthly Health Insurance
                            </h5>
                            <p className='card-text'>{`${monthlyHealth}K` || "Loading..."}</p>
                        </div> */}
                        <div className='card-body cardbody text-center' id='cb2' style={{ height: "230px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
                                {/* <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                    Average Bonus
                                </h5> */}
                                <MdOutlineHealthAndSafety size={34} />
                                <p style={{ fontWeight: "900", color: "red", margin: "0" }}>
                                    <IoMdArrowDropup size={20} />1.1%
                                </p>
                            </div>
                            <div className='card-text' style={{ height: "70%", display: "flex", justifyContent: "center" }}>
                                <div style={{ width: "130px" }}>
                                    <p style={{ padding: "0", margin: "0" }}>{`${monthlyHealth}K` || "Loading..."}</p>
                                    <p style={{ padding: "0", margin: "0", fontWeight: "700", fontSize: "16px", color: "red" }}>Monthly Health Insurance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mb-3'>
                        {/* <div className='card-body cardbody text-center' id='cb5'>
                            <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                Avg. Retirement Contributions
                            </h5>
                            <p className='card-text'>{fetchedData ? formatDuration(fetchedData?.averageVisitDuration) : "Loading..."}</p>
                        </div> */}
                        <div className='card-body cardbody text-center' id='cb2' style={{ height: "230px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px" }}>
                                {/* <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                    Average Bonus
                                </h5> */}
                                <FaUserClock size={30} />
                                <p style={{ fontWeight: "900", color: "red", margin: "0" }}>
                                    <IoMdArrowDropup size={20} />3.7%
                                </p>
                            </div>
                            <div className='card-text' style={{ height: "70%", display: "flex", justifyContent: "center" }}>
                                <div style={{ width: "160px" }}>
                                    <p style={{ padding: "0", margin: "0" }}>{fetchedData ? formatDuration(fetchedData?.averageVisitDuration) : "Loading..."}</p>
                                    <p style={{ padding: "0", margin: "0", fontWeight: "700", fontSize: "16px", color: "red" }}>Avg. Retirement Contributions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row' style={{ overflow: "hidden" }}>
                <div className='col-md-6'>
                    <div className='card mb-4'>
                        <div className='card-body cardbody' id='cb6' style={{ height: "375px" }}>
                            {/* <h5 className='card-title' style={{ fontWeight: "900", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "30px" }}>
                                Payroll Taxes
                            </h5> */}
                            <h3 style={{ fontWeight: "900", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", padding: "10px", paddingBottom: "15px", borderBottom: "1px solid rgb(203,8,8)" }}>Payroll Taxes</h3>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px", height: "70%" }}>
                                <div>
                                    <p className='card-text' style={{ color: '#DD1B16' }}>Direct: {payroll}%</p>
                                    <p className='card-text' style={{ color: '#00D8FF' }}>Search: {100 - payroll}%</p>
                                </div>
                                <div>
                                    <CChart
                                        style={{ maxHeight: "200px" }}
                                        type="doughnut"
                                        data={{
                                            labels: ["Direct", "Search"],
                                            datasets: [
                                                {
                                                    backgroundColor: ['#DD1B16', '#00D8FF'],
                                                    data: chartData,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='col-md-6'>
                    <div className='card mb-4'>
                        <div className='card-body' id='leadsbody'>
                            <h5 className='card-title' style={{ fontWeight: "bolder", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", textAlign: "center" }}>
                                Training and Development Costs
                            </h5>
                            <p className='card-text' style={{ textAlign: "center" }}>Direct: {training}%, Search: {100 - training}%</p>
                        </div>
                    </div>
                </div> */}
                <div className='col-md-6'>
                    <div className='card mb-4'>
                        <div className='card-body cardbody' id='cb6' style={{ height: "375px" }}>
                            {/* <h5 className='card-title' style={{ fontWeight: "900", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "30px" }}>
                                Payroll Taxes
                            </h5> */}
                            <h3 style={{ fontWeight: "900", color: "rgb(203,8,8)", fontFamily: "Arial, Helvetica, sans-serif", padding: "10px", paddingBottom: "15px", borderBottom: "1px solid rgb(203,8,8)" }}>Training and Development Costs</h3>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px", height: "70%" }}>
                                <div>
                                    <p className='card-text' style={{ color: '#00D8FF' }}>Direct: {training}%</p>
                                    <p className='card-text' style={{ color: '#DD1B16' }}>Search: {100 - training}%</p>
                                </div>
                                <div>
                                    <CChart
                                        style={{ maxHeight: "250px" }}
                                        type="doughnut"
                                        data={{
                                            labels: ["Direct", "Search"],
                                            datasets: [
                                                {
                                                    backgroundColor: ['#00D8FF', '#DD1B16'],
                                                    data: trainingData,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
