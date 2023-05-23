import styles from './Page2.module.css';
import React, { useEffect, useRef, useState } from 'react';
function Page2() {
    const [dis, setDis] = useState(0)
    const page2Image = useRef();
    const page2Text = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle(styles['page2-show'], entry.isIntersecting)
            })

        }, { threshold: 0.4 })
        observer.observe(page2Image.current);
        observer.observe(page2Text.current);
    }, [])

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
        <div className={styles.page2Container}>
            <div ref={page2Image} className={styles['page2-imageDiv']}>
                <img src={require('../../images/baking-transformed2.jpeg')} className={styles['page2-img']} style={{ marginLeft: `${130 - (dis * 0.4)}px`, }}></img>
            </div>
            <div ref={page2Text} className={styles['page2-textBox']}>
                <div className={styles['page2-text']}>
                    <h1>Handcrafted <br />Pastries , Made Locally</h1>
                    <p>With traditinoal methods and the finest seasonal ingredients, we bake delicious , hand-crafted pastries</p>
                </div>
                <button className={styles['page2-btn']}>Check Our Latest</button>
            </div>
        </div>
    )
}
export default Page2;