import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
function Header() {
    return (
        <div className={["container", styles.headers].join(" ")}>
            <div className={styles.left}>
                <NavLink to="/home" className={styles.navLink}>Bakery</NavLink>
            </div>
            <div className={styles.center}>
                <NavLink to="/home" className={({ isActive }) => [styles.navLink, isActive ? styles.isActive : ""].join(" ")}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => [styles.navLink, isActive ? styles.isActive : ""].join(" ")}>About</NavLink>
                <NavLink to="/produts" className={({ isActive }) => [styles.navLink, isActive ? styles.isActive : ""].join(" ")}>Product</NavLink>
                <NavLink to="/blog" className={({ isActive }) => [styles.navLink, isActive ? styles.isActive : ""].join(" ")}>Blog</NavLink>
                <NavLink to="/contact" className={({ isActive }) => [styles.navLink, isActive ? styles.isActive : ""].join(" ")}>Contact</NavLink>
            </div>
            <div className={styles.right}>
                <NavLink to="/home" className={styles.navLink}>Cart</NavLink>
            </div>
        </div>
    )
}
export default Header;