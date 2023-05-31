import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import styles from './MainOutlet.module.css';
function MainOutlet() {
    return (
        <>
            <div className={styles['mainOutlet']}>
                <Outlet />
            </div>
            <Footer/>
        </>
    )
}
export default MainOutlet;