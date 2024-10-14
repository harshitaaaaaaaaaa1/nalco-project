import React from 'react'
import styles from "./ContactUs.module.css"
import { IoLocationOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiGlobe, CiMail } from "react-icons/ci";


export default function ContactUs() {
    return (
        <div className={styles.contactMainDiv}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src="https://d2ah634u9nypif.cloudfront.net/wp-content/uploads/2019/01/nalco-banner.jpg" alt="nalcoImages" />
            </div>
            <div className={styles.contactHeadingDiv}>
                <h1 className={styles.contactHeading}>Contact Us</h1>
            </div>
            <div className={styles.cardMainDiv}>
                <div className={styles.cardSection}>
                    <div className={styles.registeredCard}>
                        <h1 className={styles.registeredHeading}>Registered Office</h1>
                        <div style={{ marginBottom: "10px", display: "flex", gap: "0.4rem" }}>
                            <IoLocationOutline style={{ marginTop: "5px" }} size={23} />
                            <div>
                                <p className={styles.cardPara}>National Aluminium Company Limited</p>
                                <p className={styles.cardPara}>NALCO Bhawan, P/1, Nayapalli,</p>
                                <p className={styles.cardPara}>Bhubaneswar – 751 013, Odisha</p>
                            </div>

                        </div>
                        <p><IoDocumentTextOutline size={23} style={{ marginLeft: "0.2rem" }} /> CIN: L27203OR1981GOI000920</p>
                        <p><IoCallOutline size={23} style={{ marginLeft: "0.3rem" }} /> (0674) 2301988-99</p>
                        <p><CiMail size={23} style={{ marginLeft: "0.3rem" }} /> company_secretary@nalcoindia.co.in</p>
                        <p><CiGlobe size={23} style={{ marginLeft: "0.3rem" }} /> www.nalcoindia.com</p>
                    </div>
                    <div className={styles.registeredCard}>
                        <h1 className={styles.registeredHeading}>Compliance Officer</h1>
                        <div style={{ marginBottom: "20px", display: "flex", gap: "0.4rem" }}>
                            <h4>Shri N. K. Mohanty, Executive Director & Company Secretary</h4>
                        </div>
                        <p><CiMail size={23} style={{ marginLeft: "0.3rem" }} /> company_secretary@nalcoindia.co.in</p>
                        <p><IoCallOutline size={23} style={{ marginLeft: "0.3rem" }} /> (0674) 2301988-99, Ext.:2265, 2266, 2267</p>

                    </div>
                </div>
            </div>
        </div>
    )
}
