import styles from "./Footer.module.css"
import {ImFacebook, ImInstagram, ImPinterest, ImTwitter} from "react-icons/im"
import logo from "../images/bakerylogo2.svg"

function Footer() {
	const feedsUrl = ["https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg", "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg", "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg", "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg", "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg", "https://cdn2.lamag.com/wp-content/uploads/sites/6/2014/06/152-FoodEvent13-DrongoPhoto__1600W.jpeg"]
	return (
		<div className={styles["footer"]}>
			<div className={styles["footer-body"]}>
				<div className={styles["left"]}>
					<div className={styles["left-header"]}>
						<div className={styles["footer-logo-container"]}>
							<img src={logo} className={styles["footer-logo"]} alt="logo" />
						</div>
					</div>
					<div className={styles["left-body"]}>
						<p>Donec et nunc in eros rhoncus sodales. Quisque dui id porttitor iaculis, nisi tortor lobortis massa. Ut ut magna ante. Donec gravida enim eget finibus accumsan. Vivamus facilisis.</p>
						<p>
							Follow us : &nbsp;&nbsp;&nbsp;
							<a href="https://www.facebook.com/">
								<ImFacebook style={{color: "white", height: "1.5rem", width: "1.5rem"}} />
							</a>
							&nbsp;&nbsp;&nbsp;
							<a href="https://twitter.com/">
								<ImTwitter style={{color: "white", height: "1.5rem", width: "1.5rem"}} />
							</a>
							&nbsp;&nbsp;&nbsp;
							<a href="https://www.instagram.com/">
								<ImInstagram style={{color: "white", height: "1.5rem", width: "1.5rem"}} />
							</a>
							&nbsp;&nbsp;&nbsp;
							<a href="https://in.pinterest.com/">
								<ImPinterest style={{color: "white", height: "1.5rem", width: "1.5rem"}} />
							</a>
						</p>
					</div>
				</div>
				<div className={styles["middle"]}>
					<div className={styles["middle-header"]}>
						<h1>instagram feeds</h1>
					</div>
					<div className={styles["middle-body"]}>
						<div className={styles["feeds-container"]}>
							{feedsUrl.map((each, index) => {
								return (
									<div key={index} className={styles["feeds-img"]}>
										<img src={each} alt="404"></img>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className={styles["right"]}>
					<div className={styles["right-header"]}>
						<h1>join the club</h1>
					</div>
					<div className={styles["right-body"]}>
						<div>
							<form>
								<input placeholder="Email Address"></input>
								<button type="submit">join</button>
							</form>
						</div>
						<div>
							<p>Sign me up to receive emails on new product arrivals special offers.</p>
						</div>
						<div>
							<p>
								Contact us : <span>00 34 938 60 24 24</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles["footer-copyright"]}>
				<span>&copy; 2024 All Rights Reserved</span>
			</div>
		</div>
	)
}

export default Footer
