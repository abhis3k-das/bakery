import styles from "./Home.module.css"
import GotoProductsIcon from "../../components/GotoProductsIcon"
import logo from "../../images/bakerylogo2.svg"
import {TiShoppingCart} from "react-icons/ti"
import {TfiMenuAlt, TfiClose} from "react-icons/tfi"
import {NavLink} from "react-router-dom"
import {useRef, useEffect, useState} from "react"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
function Home2() {
	const [menuClicked, setMenuClicked] = useState(false)
	return (
		<>
			<div className={styles["homePage-container"]}>
				<div className={styles["homePage-section1-container"]}>
					<div className={styles["homePage-section1"]}>
						<div className={styles["homePage-section1-overlay"]}>
							{/* ------------------NAVBAR SECTION------------------- */}
							<div className={styles["homePage-section1-header"]}>
								<div className={styles["homePage-section1-header-left"]}>
									<img
										src={logo}
										alt="..."
										style={{
											height: "160%",
											width: "160%",
										}}
									></img>
								</div>
								<div className={[styles["navbar"], menuClicked ? styles["showMenu"] : ""].join(" ")}>
									<TfiClose className={[styles["close"], styles["icon"]].join(" ")} onClick={() => setMenuClicked(false)} />
									<ul className={styles["homePage-section1-header-middle"]}>
										<li>
											<NavLink to="#">Home</NavLink>
										</li>
										<li>
											<NavLink to="#">About</NavLink>
										</li>
										<li>
											<NavLink to="#">Products</NavLink>
										</li>
										<li>
											<NavLink to="#">Blog</NavLink>
										</li>
										<li>
											<NavLink to="#">Contact</NavLink>
										</li>
										<li>
											<NavLink to="#">Cart</NavLink>
										</li>
									</ul>
								</div>
								<div className={styles["homePage-section1-header-right"]}>
									<TiShoppingCart className={[styles["cart"], styles["icon"]].join(" ")} />
									<TfiMenuAlt className={[styles["menu"], styles["icon"]].join(" ")} onClick={() => setMenuClicked(true)} />
								</div>
							</div>
							{/*------------------------------------------------------  */}

							<div className={styles["homePage-section1-info-container"]}>
								<div className={styles["homePage-section1-info"]}>
									<div className={styles["homePage-section1-textArea"]}>
										<h1>We Are BURN </h1>
										<h1>Artisanal Bakehouse</h1>
										<p>500 Terry Fancine Street</p>
										<p>San Francisco , CA 94158</p>
									</div>
								</div>
								{/* <div className={styles["homePage-section1-logo-container"]}>
									<GotoProductsIcon />
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Section2 />
			<Section3 />
			<Section4 />
		</>
	)
}
export default Home2
