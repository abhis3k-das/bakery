import {NavLink, useLocation, useNavigate} from "react-router-dom"
import styles from "./Header.module.css"
import logo from "../images/bakerylogo2.svg"
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"
import {useContext, useEffect, useState} from "react"
import {TiShoppingCart} from "react-icons/ti"

import {UserContext} from "../Context/user-context"
import {StoreContext} from "../Context/store-context"
import axios from "axios"
function Header() {
	const [menu, setMenu] = useState(true)


	const store = useContext(UserContext)
	const cart = useContext(StoreContext)
	const {slider,setSlider} = cart
	const location = useLocation()
	const navigate = useNavigate();
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
		const routeSperator = location.pathname.split("/")
		const route = routeSperator[routeSperator.length - 1]
		console.log(route)
		if (route === "home") {
			setSlider(0)
		} else if (route === "items") {
			setSlider(140)
		} else if (route === "blog") {
			setSlider(280)
		} else if (route === "about") {
			setSlider(420)
		} else if (route === "orders") {
			setSlider(560)
		} else if(route === "cart"){
			setSlider(695)
		}else {
			setSlider(undefined)
		}
	}, [])

	const logOut = async () => {
		try {
			await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${store.accessToken}`,
				},
				withCredentials: true,
			})
			store.setUser("")
			store.setAccessToken("")
			navigate('/login')
			cart.setSlider(undefined)
		} catch (e) {
			console.log(e.response)
		}
	}
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
					{store.user && <div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 4)}
								to="orders"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
							>
								Orders
							</NavLink>
						</div>}
						<div className={styles["links"]}>
							<NavLink
								onClick={() => setSlider(140 * 5)}
								to="cart"
								className={({isActive}) => {
									return isActive ? styles["activeLink"] : ""
								}}
								style={{
									height:'100%',
									display:'flex',
									justifyContent:'center',
									alignItems:'center'
								}}	
							>
								Cart
								<TiShoppingCart />
								<span
									style={{
										transform: "translateY(-5px)",
										fontSize: "0.8rem",
										color: "white",
										fontWeight: "bold",
										height: "20px",
										width: "18px",
										borderRadius: "50%",
										textAlign: "center",
										lineHeight: "20px",
									}}
								>
									{cart.cartItems.length}
								</span>
							</NavLink>
						</div>
						
						<div className={[styles["slider"], styles["start-home"]].join(" ")}></div>
						{slider >= 0 && (
							<div
								className={[styles["slider"]].join(" ")}
								style={{left: `${slider}px`, width: "140px", backgroundColor: "#DCDCDC"}}
							></div>
						)}
					</div>
				</div>
				{store.user?.length === 0 ? (
					<div className={styles["navbar-right-links"]}>
						<div className={styles["links"]}>
							<NavLink
								to="signUp"
								onClick={() => setSlider(undefined)}
								className={({isActive}) => (isActive ? styles["activeSL"] : "")}
							>
								SignUp
							</NavLink>
						</div>
						<div className={styles["links"]}>
							<NavLink
								to="login"
								onClick={() => setSlider(undefined)}
								className={({isActive}) => (isActive ? styles["activeSL"] : "")}
							>
								Login
							</NavLink>
						</div>
					</div>
				) : (
					<div className={styles["navbar-right-links"]}>
						<div className={styles["links"]}>
							<NavLink
								to="#"
								onClick={() => logOut()
								}
								className={({isActive}) => (isActive ? styles["activeSL"] : "")}
							>
								Logout
							</NavLink>
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
export default Header
