import {NavLink, useLocation, useMatch} from "react-router-dom"
import styles from "./Header.module.css"
import logo from "../images/bakerylogo2.svg"
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"
import {useEffect, useState} from "react"
import { TiShoppingCart } from "react-icons/ti"
function Header() {
	const [menu, setMenu] = useState(true)
	const [slider, setSlider] = useState()
	const location = useLocation()
	useEffect(() => {
		const handleSlidingMenuReset = () => {
			setMenu(true)
		}
		window.addEventListener("resize", handleSlidingMenuReset)
		return () => {
			window.removeEventListener("resize", handleSlidingMenuReset)
		}
	}, [])
	useEffect(() => {
		console.log(location)
		const routeSperator = location.pathname.split("/")
		const route = routeSperator[routeSperator.length - 1]
		if (route === "items") {
			setSlider(140)
		} else if (route === "blog") {
			setSlider(280)
		} else if (route === "about") {
			setSlider(420)
		} else if (route === "contactUs") {
			setSlider(560)
		} else {
			setSlider(undefined)
		}
	}, [])
	return (
		<nav className={styles["navbar-container"]}>
			<div className={styles["navbar-logo-container"]}>
				<img
					src={logo}
					alt="..."
					className={styles["navbar-logo"]}
				></img>
			</div>
			<div className={styles["navbar-links"]}>
				<div className={styles["navbar-left-links"]}>
					<AiOutlineMenu
						className={[styles["menu-icon"], menu === true ? styles["show"] : styles["close"]].join(" ")}
						onClick={() => setMenu(false)}
					/>
					<AiOutlineClose
						className={[styles["menu-close"], menu === false ? styles["show"] : styles["close"]].join(" ")}
						onClick={() => setMenu(true)}
					/>
					<div className={[styles["navbar-menu-links"], menu === false ? styles["show"] : styles["close"]].join(" ")}>
						{/* styles[close] does not exist for full scree i.e undefined */}
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(0)}
								to="/home"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
							>
								Home
							</NavLink>
						</div>
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 1)}
								to="items"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
							>
								Products
							</NavLink>
						</div>
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 2)}
								to="blog"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
							>
								Blog
							</NavLink>
						</div>
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 3)}
								to="about"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
							>
								About Us
							</NavLink>
						</div>
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 4)}
								to="cart"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
								style={{
									
								}}
							>
								Cart 
								<TiShoppingCart/>
							</NavLink>
						</div>
						<div className={[styles["slider"], styles["start-home"]].join(" ")}></div>
						{slider && (
							<div
								className={[styles["slider"]].join(" ")}
								style={{left: `${slider}px`, width: "140px", backgroundColor: "#DCDCDC"}}
							></div>
						)}
					</div>
				</div>
				<div className={styles["navbar-right-links"]}>
					<div className={styles["links"]}>
						<NavLink
							to="signUp"
							onClick={() => setSlider(undefined)}
						>
							SignUp
						</NavLink>
					</div>
					<div className={styles["links"]}>
						<NavLink
							to="/home"
							onClick={() => setSlider(undefined)}
						>
							Login
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}
export default Header
