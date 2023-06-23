import {useState, useRef, useEffect} from "react"
import styles from "./SignUp.module.css"
import axios from "axios";
function SignUp() {
	const [fname, setFname] = useState("")
	const [lname, setLname] = useState("")
	const [add_1, setAdd_1] = useState("")
	const [add_2, setAdd_2] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [pin, setPin] = useState("")
	const [phNo, setPhNo] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const [fnameErr, setFnameErr] = useState("")
	const [lnameErr, setLnameErr] = useState("")
	const [add_1Err, setAdd_1Err] = useState("")
	const [add_2Err, setAdd_2Err] = useState("")
	const [cityErr, setCityErr] = useState("")
	const [stateErr, setStateErr] = useState("")
	const [pinErr, setPinErr] = useState("")
	const [phNoErr, setPhNoErr] = useState("")
	const [emailErr, setEmailErr] = useState("")
	const [passwordErr, setPasswordErr] = useState("")
	const [confirmPasswordErr, setConfirmPasswordErr] = useState("")

	const fnameRef = useRef()
	const lnameRef = useRef()
	const add_1Ref = useRef()
	const add_2Ref = useRef()
	const cityRef = useRef()
	const stateRef = useRef()
	const pinRef = useRef()
	const phRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	useEffect(() => {
		fnameRef.current.focus()
	}, [])

	const formSubmitHandler = async(e) => {
		e.preventDefault()
		const nameRegex = /^[A-Za-z]+$/
		const addressRegex = /^[A-Za-z0-9-,./ ]+$/
		const pinRegex = /^\d+$/
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		const passwordRegex = /^[A-Za-z]\w{7,14}$/
		if (!fname || fname.length < 3 || fname.length > 30 || !nameRegex.test(fname)) {
			setFnameErr("First name must contain characters from A-Z and a-z and length must be >=3 and <= 30")
			fnameRef.current.focus()
			return
		}

		if (lname && (lname.length > 30 || !nameRegex.test(lname))) {
			setLnameErr("Last name must contain characters from A-Z and a-z and length must be <= 30")
			lnameRef.current.focus()
			return
		}

		if (!add_1 || add_1.length > 200 || !addressRegex.test(add_1)) {
			setAdd_1Err("Address cannot be empty and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space")
			add_1Ref.current.focus()
			return
		}

		if (add_2 && (add_2.length > 200 || !addressRegex.test(add_2) || add_1 === add_2)) {
			setAdd_2Err("Address cannot be empty or same as address 1 and length must be <= 200. Allowed char 0-9,A-Z,a-z,-,.,/ and space")
			add_2Ref.current.focus()
			return
		}

		if (!city || city.length > 20 || !nameRegex.test(city)) {
			setCityErr("City cannot be empty and length<=20.Only alphabets are allowed.")
			cityRef.current.focus()
			return
		}

		if (!state || state.length > 20 || !nameRegex.test(state)) {
			setStateErr("State cannot be empty and length<=20.Only alphabets are allowed.")
			stateRef.current.focus()
			return
		}

		if (!pin || pin.length > 10 || !pinRegex.test(pin)) {
			setPinErr("Pin cannot be empty and length<=10.Only numbers are allowed.")
			pinRef.current.focus()
			return
		}

		if (!phNo || phNo.length !== 10 || !pinRegex.test(phNo)) {
			setPhNoErr("Phone number cannot be empty and length must be 10.Only nummers are allowed.")
			phRef.current.focus()
			return
		}

		if (!email || email.length>80 || !emailRegex.test(email)) {
			setEmailErr("Invalid email.Allowed length is 20.")
			emailRef.current.focus()
			return
		}
		if (password.length < 7 || password.length > 14 || !passwordRegex.test(password)) {
			setPasswordErr("Password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter")
			passwordRef.current.focus()
			return
		}
		if (password !== confirmPassword) {
			setConfirmPasswordErr("Must match with password")
			confirmPasswordRef.current.focus()
			return
		}
		try{
			const response = await axios.post(
				"http://localhost:8000/register",
				JSON.stringify({
					fname,
					lname,
					add_1,
					add_2,
					state,
					city,
					pin,
					phNo,
					email,
					password,
				}),
				{
					headers:{
						'Content-Type':'application/json',
					},
					withCredentials:true,
				},
				
			)
			console.log(response.data)
		}
		catch(e){
			console.log(e);
		}
		setFname("")
		setLname("")
		setAdd_1("")
		setAdd_2("")
		setCity("")
		setState("")
		setPin("")
		setPhNo("")
		setEmail("")
		setPassword("")
		setConfirmPassword("")
	}
	return (
		<div className={styles["signup-container"]}>
			<img
				//    src="https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
				src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80"
			></img>
			<div></div>
			<div className={styles["signup-card"]}>
				<div className={styles["header"]}>
					<h1>Sign Up</h1>
				</div>
				<form
					className={styles["body"]}
					onSubmit={formSubmitHandler}
					noValidate
				>
					<div className={styles["username"]}>
						<h2 className={styles["label"]}>
							Full Name <span>*</span>
						</h2>
						<div>
							<div className={styles["input-box"]}>
								<input
									ref={fnameRef}
									type="text"
									maxLength={25}
									onChange={(e) => {
										setFname(e.target.value)
									}}
									onBlur={() => setFnameErr("")}
									value={fname}
									id="firstname"
								></input>
								<p>First Name</p>
								<p className={fnameErr && styles["error"]}>{fnameErr}</p>
							</div>
							<div className={styles["input-box"]}>
								<input
									ref={lnameRef}
									type="text"
									maxLength={25}
									onChange={(e) => {
										setLnameErr("")
										setLname(e.target.value)
									}}
									onBlur={() => setLnameErr("")}
									value={lname}
									id="lastname"
								></input>
								<p>Last Name</p>
								<p className={lnameErr !== "" ? styles["error"] : ""}>{lnameErr}</p>
							</div>
						</div>
					</div>
					<div className={styles["address"]}>
						<h2 className={styles["label"]}>
							Address <span>*</span>
						</h2>
						<div>
							<div className={styles["input-box"]}>
								<input
									ref={add_1Ref}
									type="text"
									maxLength={200}
									onChange={(e) => {
										setAdd_1Err("")
										setAdd_1(e.target.value)
									}}
									onBlur={() => setAdd_1Err("")}
									value={add_1}
									id="add1"
								></input>
								<p>Street Address</p>
								<p className={add_1Err !== "" ? styles["error"] : ""}>{add_1Err}</p>
							</div>
							<div className={styles["input-box"]}>
								<input
									ref={add_2Ref}
									type="text"
									maxLength={200}
									placeholder="optional"
									onChange={(e) => {
										setAdd_2Err("")
										setAdd_2(e.target.value)
									}}
									onBlur={() => setAdd_2Err("")}
									value={add_2}
									id="add2"
								></input>
								<p>Street Address 2</p>
								<p className={add_2Err !== "" ? styles["error"] : ""}>{add_2Err}</p>
							</div>
							<div>
								<div className={styles["input-box"]}>
									<input
										ref={cityRef}
										type="text"
										maxLength={20}
										onChange={(e) => {
											setCityErr("")
											setCity(e.target.value)
										}}
										onBlur={() => setCityErr("")}
										value={city}
										id="city"
									></input>
									<p>City</p>
									<p className={cityErr !== "" ? styles["error"] : ""}>{cityErr}</p>
								</div>
								<div className={styles["input-box"]}>
									<input
										ref={stateRef}
										type="text"
										maxLength={20}
										onChange={(e) => {
											setStateErr("")
											setState(e.target.value)
										}}
										onBlur={() => setStateErr("")}
										value={state}
										id="state"
									></input>
									<p>State</p>
									<p className={stateErr !== "" ? styles["error"] : ""}>{stateErr}</p>
								</div>
							</div>
							<div>
								<div className={styles["input-box"]}>
									<input
										ref={pinRef}
										type="text"
										maxLength={10}
										onChange={(e) => {
											setPinErr("")
											setPin(e.target.value)
										}}
										onBlur={() => {
											setPinErr("")
										}}
										value={pin}
										id="pin"
									></input>
									<p>Postal Code</p>
									<p className={pinErr !== "" ? styles["error"] : ""}>{pinErr}</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles["phone"]}>
						<h2 className={styles["label"]}>
							Phone Number <span>*</span>
						</h2>
						<div className={styles["input-box"]}>
							<input
								ref={phRef}
								type="text"
								maxLength={10}
								onChange={(e) => {
									setPhNoErr("")
									setPhNo(e.target.value)
								}}
								onBlur={() => {
									setPhNoErr("")
								}}
								value={phNo}
								id="phNo"
							></input>
							<p>Phone number</p>
							<p className={phNoErr !== "" ? styles["error"] : ""}>{phNoErr}</p>
						</div>
					</div>
					<div className={styles["email"]}>
						<h2 className={styles["label"]}>
							Email Address <span>*</span>
						</h2>
						<div className={styles["input-box"]}>
							<input
								ref={emailRef}
								type="email"
								maxLength={80}
								onChange={(e) => {
									setEmailErr("")
									setEmail(e.target.value)
								}}
								onBlur={() => setEmailErr("")}
								value={email}
								id="emailAddress"
							></input>
							<p>Email</p>
							<p className={emailErr !== "" ? styles["error"] : ""}>{emailErr}</p>
						</div>
					</div>
					<div className={styles["phone"]}>
						<h2 className={styles["label"]}>
							Password <span>*</span>
						</h2>
						<div className={styles["input-box"]}>
							<input
								ref={passwordRef}
								type="password"
								maxLength={20}
								onChange={(e) => {
									setPasswordErr("")
									setPassword(e.target.value)
								}}
								onBlur={() => setPasswordErr("")}
								value={password}
								id="password"
							></input>
							<p>Password</p>
							<p className={passwordErr !== "" ? styles["error"] : ""}>{passwordErr}</p>
						</div>
					</div>
					<div className={styles["phone"]}>
						<h2 className={styles["label"]}>
							Confirm Password <span>*</span>
						</h2>
						<div className={styles["input-box"]}>
							<input
								ref={confirmPasswordRef}
								type="password"
								maxLength={20}
								onChange={(e) => {
									setConfirmPasswordErr("")
									setConfirmPassword(e.target.value)
								}}
								onBlur={() => setConfirmPasswordErr("")}
								value={confirmPassword}
								id="confirmPassword"
							></input>
							<p>Confirm Password</p>
							<p className={confirmPasswordErr !== "" ? styles["error"] : ""}>{confirmPasswordErr}</p>
						</div>
					</div>
					<button>Submit</button>
				</form>
			</div>
		</div>
	)
}
export default SignUp
