import {NavLink, useNavigate} from "react-router-dom"
import styles from "./Login.module.css"
import {useEffect, useRef, useState} from "react"
import axios from "axios"
import {useContext} from "react"
import {UserContext} from "../../Context/user-context"
import {StoreContext} from "../../Context/store-context"
import {Loading} from '../../components/Loading'
function Login() {
	const emailRef = useRef()
	const errRef = useRef()

	const [email, setEmail] = useState("")
	const [pwd, setPwd] = useState("")
	const [errMsg, setErrMsg] = useState("")

	const user = useContext(UserContext)
	const store = useContext(StoreContext)

	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		emailRef.current.focus()
	}, [])
	useEffect(() => {
		setErrMsg("")
	}, [email, pwd])
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!email || email.length === 0 || !pwd || pwd.length === 0) {
			setErrMsg("Fields cannot be empty.")
			return
		}
		try {
			setIsLoading(true)
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/login`,
				JSON.stringify({
					email: email,
					password: pwd,
				}),
				{
					headers: {
						"Content-type": "application/json",
					},
					withCredentials: true,
				}
			)
			setIsLoading(false)
			user.setUser(response.data?.user)
			user.setAccessToken(response.data?.accessToken)
			navigate("/")
			store.setSlider(0)
			setEmail("")
			setPwd("")
		} catch (e) {
			setIsLoading(false)
			setErrMsg("Invalid email/password")
		}
	}
	return (
		<>
			{isLoading && <Loading/>}
			<div className={styles["login-container"]}>
				<img
					//    src="https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
					src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80"
				></img>
				<div></div>
				<div className={styles["login-card"]}>
					<div className={styles["top"]}>
						<h1>Login</h1>
						<section>
							<p
								ref={errRef}
								className={errMsg.length !== 0 ? styles["errMsg"] : styles["offscreen"]}
							>
								{errMsg}
							</p>
						</section>
						<form
							onSubmit={handleSubmit}
							className={styles["top"]}
						>
							<input
								type="text"
								id="email"
								ref={emailRef}
								autoComplete="off"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							></input>
							<input
								type="password"
								id="password"
								autoComplete="off"
								placeholder="Password"
								onChange={(e) => {
									setPwd(e.target.value)
								}}
								value={pwd}
							></input>
							<button>Login</button>
						</form>
					</div>
					<div className={styles["bottom"]}>
						<p>
							Not a member? <NavLink to="/bakery/signup">Create Account</NavLink>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
export default Login
