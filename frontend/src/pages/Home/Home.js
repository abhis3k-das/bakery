import styles from "./Home.module.css"
import GotoProductsIcon from "../../components/GotoProductsIcon"
import logo from "../../images/bakerylogo2.svg"
import {TiShoppingCart} from "react-icons/ti"
import {TfiMenuAlt, TfiClose} from "react-icons/tfi"
import {NavLink} from "react-router-dom"
import {useEffect, useState} from "react"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
import HomePageLogin from "../../components/HomePageLogin"
function Home2() {
	const [menuClicked, setMenuClicked] = useState(false)
	useEffect(()=>{
		const tempFunction = ()=>{
			setMenuClicked(false);
		}
		window.addEventListener('resize',tempFunction);
		return ()=>{
			window.removeEventListener('resize',tempFunction)
		}
	},[])
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
								<div className={styles["navbar"]}>
									{menuClicked === false && (
										<TfiMenuAlt
											className={[styles["menu"], styles["icon"]].join(" ")}
											onClick={() => setMenuClicked(true)}
										/>
									)}
									{menuClicked === true && (
										<TfiClose
											className={[styles["close"], styles["icon"]].join(" ")}
											onClick={() => setMenuClicked(false)}
										/>
									)}
									<div className={[styles["navbar-link"], menuClicked ? styles["show"] : ""].join(" ")}>
										<NavLink to="#" className={styles['navbar-loginSignup']}>Login</NavLink>
										<NavLink to="#" className={styles['navbar-loginSignup']}>SignUp</NavLink>
										<NavLink
											to="/home"
											className={({isActive}) => (isActive ? styles["active"] : "")}
										>
											Home
										</NavLink>
										<NavLink to="/bakery/items">Products</NavLink>
										<NavLink to="/bakery/about">About</NavLink>
										<NavLink to="/bakery/blog">Blog</NavLink>
										<NavLink to="/bakery/contact">Contact</NavLink>
										<NavLink to="/bakery/cart">{menuClicked ? 'Cart'  : <TiShoppingCart className={[styles["cart"], styles["icon"]].join(" ")} />}</NavLink>
									</div>
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
								<div className={styles["homePage-section1-textArea"]}>
									<HomePageLogin />
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
