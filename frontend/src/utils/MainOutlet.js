import {Outlet} from "react-router-dom"
import Footer from "../layouts/Footer"
import styles from "./MainOutlet.module.css"
import {useEffect, useContext} from "react"
import axios from "axios"
import {UserContext} from "../Context/user-context"
import {StoreContext} from "../Context/store-context"
import Header from "../layouts/Header"
function MainOutlet() {
	const user = useContext(UserContext)
	const store = useContext(StoreContext)
	useEffect(() => {
		const checkForLoggedInUser = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refresh`, {
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				})
				user.setUser(response.data.user)
				user.setAccessToken(response.data.accessToken)
			} catch (e) {
				console.log("This error is thrown at MainOutlet/UseEffect", e)
				user.setUser("")
				user.setAccessToken("")
			}
		}
		checkForLoggedInUser()
		setInterval(checkForLoggedInUser,29*60*1000) // the time should be same or just less than the expiry time of accestoken
	},[user])
	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getProducts`, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				function shuffleList(list) {
					for (let i = list.length - 1; i > 0; i--) {
					  const j = Math.floor(Math.random() * (i + 1));
					  [list[i], list[j]] = [list[j], list[i]];
					}
					return list;
				}
                store.setProducts(shuffleList(response.data.products))
			} catch (e) {
				console.log(e)
			}
		}
		getProducts()
	}, [])
	return (
		<>
			<Header />
			<div className={styles["mainOutlet"]}>
				<Outlet />
			</div>
			<Footer />
		</>
	)
}
export default MainOutlet
