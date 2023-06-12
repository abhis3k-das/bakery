import {FaUserCircle, FaLock} from "react-icons/fa"
import styles from "./HomePageLogin.module.css"
import { NavLink } from "react-router-dom"
function HomePageLogin() {
	return (
		<div className={styles["login-container"]}>
			<div className={styles["input"]}>
				<FaUserCircle className={styles['icon']}/>
				<input type="email" placeholder="username"></input>
				<div className={styles["input-overlay"]}></div>
			</div>
			<div className={styles["input"]}>
				<FaLock className={styles['icon']}/>
				<input type="password" placeholder="password"></input>
				<div className={styles["input-overlay"]}></div>
			</div>
            <button>Login</button>
            <div>
                <p>Not a member?</p>
                <NavLink to="/bakery/signUp">SignUp</NavLink>
            </div>
		</div>
	)
}
export default HomePageLogin
