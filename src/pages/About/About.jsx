import React from 'react'
import styles from "./About.module.css"

export default function About() {
    return (
        <div className={styles.aboutMainDiv}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src="https://d2ah634u9nypif.cloudfront.net/wp-content/uploads/2019/01/nalco-banner.jpg" alt="nalcoImages" />
            </div>
            <div className={styles.aboutHeadingDiv}>
                <h1 className={styles.aboutHeading}>About Us</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.aboutParaDiv}>
                    <p className={styles.aboutPara}>National Aluminium Company Limited (NALCO) is a Schedule ‘A’ Navratna CPSE established on 7th January, 1981 having its registered office at Bhubaneswar.  It is one of the largest integrated Bauxite-Alumina-Aluminium- Power Complex in the Country. At present, Government of India holds 51.28% of paid up equity capital. The Company has been operating its captive Panchpatmali Bauxite Mines for the pit head Alumina refinery at Damanjodi, in the District of Koraput in Odisha and Aluminium Smelter & Captive Power Plant at Angul.  As a part of green initiative, NALCO has installed 198 MW Wind Power Plants at various locations in India and 850 kWp roof top Solar Power Plants at its premises to join hands for carbon neutrality. From the days of first commercial operation since 1987 the Company has continuously earned profits for last 36 years. NALCO is one of the leading foreign exchange earning CPSEs of the Country. The Company continues to retain its position of lowest cost producer in Bauxite and Alumina production in the World in 2022.</p>
                    <p>
                        Capitalising the market opportunity the Company could achieve high sales realisation, positively impacting the top line and bottom line in FY 2021-22. Revenue achieved Rs. 14,181 crore and Highest ever PAT of Rs. 2,952 crore achieved in FY 2021-22.
                    </p>
                    <p>Even with subdued pricing situation in FY 2022-23, with focus on domestic market the Company achieved highest ever revenue from operation of Rs.14,255 Crore. However, with increase in input cost, the PAT achieved was Rs. 1,544 crore in FY 2022-23. NALCO achieved Full capacity Aluminium production of 4.6 lakh tonne, with all 960 POTs in operation in its Aluminium Smelter for the 2nd consecutive year in FY 2022-23.

                    </p>
                </div>
            </div>
        </div>
    )
}
