import { useEffect } from 'react';
import styles from './GotoProductsIcon.module.css';
function GotoProductsIcon() {
    useEffect(() => {
        const text = document.querySelector('#text');
        console.log(text.innerText.split(''))
        text.innerHTML = text.innerText.split("").map((each, i) => {
            return `<span style=transform:rotate(${i * 7}deg)>${each}</span>`
        }).join("")
    }, [])
    return (
        <>
            <div className={styles.circle}>
                <div className={styles.innerCircle}>

                    <div className={styles.text} id='text' style={{ fontSize: '10px' }}>
                        ORDER&middot;NOW&nbsp;&nbsp;&nbsp;&nbsp;ORDER&middot;NOW&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <div className={styles.logo}>
                    <span>&gt;</span>
                </div>
            </div>
        </>
    )

}
export default GotoProductsIcon;