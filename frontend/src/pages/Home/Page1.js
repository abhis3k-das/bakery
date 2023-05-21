import GotoProductsIcon from '../../components/GotoProductsIcon';
import styles from './Page1.module.css';

import React, { useEffect, useState } from 'react';

function Page1() {

    const [dis, setDis] = useState(0)
    useEffect(() => {
        const scroll = () => {
            let currPoint = window.scrollY;
            setDis(currPoint)
            previousPoint = currPoint
        }
        let previousPoint = window.scrollY
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        }
    }, [])
    return (
        <div className={styles.home}>
            <div className={styles.page1Container}>
                <div className={styles.info}>
                    <div className={styles.textArea}>
                        <h1>We Are BURN </h1>
                        <h1>Artisanal Bakehouse</h1>
                        <p>500 Terry Fancine Street</p>
                        <p>San Francisco , CA 94158</p>
                    </div>
                </div>
                <div className={styles.logoComponent}>
                    <GotoProductsIcon />
                </div>
                <div className={styles['page1-imageDiv']} style={{ marginTop: `${410 - dis}px` }}>
                    <img src={require('../../images/homePage.jpeg')} className={styles['page1-img']} style={{ marginTop: `${-dis}px` }}></img>
                </div>
            </div>
        </div>
    )
}

export default Page1;