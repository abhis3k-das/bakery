import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import styles from './MainOutlet.module.css';
function MainOutlet() {
    return (
        <>
            <div className={styles['mainOutlet']}>
            <Header />
                <Outlet />
            </div>
            <Footer/>
        </>
    )
}
export default MainOutlet;