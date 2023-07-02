import styles from "./Cart.module.css"
import {useContext, useEffect, useState} from "react"
import {StoreContext} from "../../Context/store-context"
import CartItemCard from "./CartItemCard"
import axios from "axios"
import {UserContext} from "../../Context/user-context"
import {NavLink, useNavigate} from "react-router-dom"
function Cart() {
	const store = useContext(StoreContext)
	const user = useContext(UserContext)
	const navigate = useNavigate()
	const [gst, setGst] = useState(80)
	const [deliveryCost, setDeliveryCost] = useState(100)
	const [address, setAddress] = useState()
	const [userName, setUserName] = useState("")
	const [userAddress, setUserAddress] = useState("")
	const [userPin, setUserPin] = useState("")
	const [userPhNo, setUserPhNo] = useState("")
	const [userState,setUserState] = useState("")
	const [userCity,setUserCity] = useState("")
	const [errList,setErrList] = useState([])
	const removeItem = (removeId) => {
		window.scrollTo(0, 0)
		store.removeFromCart(removeId)
	}

	
	useEffect(() => {
		const getUserAddress = async () => {
			try {
				console.log(store.cartItems)
				console.log(user.user)
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserAddress/${user.user}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
					withCredentials: true,
				})
				console.log(response)
				setAddress(response.data?.address)
			} catch (e) {
				console.log(e)
			}
		}
		getUserAddress()
	}, [user?.user])

	useEffect(() => {
		setUserName(address && `${address?.firstName} ${address?.lastName}`)
		setUserAddress(address && address?.address)
		setUserPin(address && parseInt(address?.postalCode))
		setUserPhNo(address && parseInt(address?.phoneNumber))
		setUserState(address && address?.state)
		setUserCity(address && address?.city)
	}, [address])
	const placeOrder = async () => {
		if (!user?.user || user?.user.length === 0) {
			navigate("/login")
			alert("Login First")
			store.setSlider(undefined)
			return
		}
		const addressRegex = /^[A-Za-z0-9-,./ ]+$/
        const pinRegex = /^\d+$/
		const nameRegex = /^[A-Za-z ]+$/
		setErrList([])
		if(!userName || userName.trim().length == 0 || userName.trim().length > 60 || !nameRegex.test(userName)){
			setErrList((prev)=>[...prev,"Username cannot be empty and can contain upto 60 characters."])
		}
        if(!userAddress || userAddress.trim().length === 0 || userAddress.trim().length>200 || !addressRegex.test(userAddress)){
            setErrList((prev)=>[...prev,"Address cannot be empty and it cannot contain more than 200 characters.Alphabets ,numbers,',','.','/' and space allowed "])
        }
        if (!userCity || userCity.trim().length === 0 ||userCity.length > 20 || !nameRegex.test(userCity)) {
            setErrList((prev)=>[...prev,"City cannot be empty and cannot contain more than 20 characters.Only alphabets and space allowed"])
        }
    
        if (!userState || userState.trim().length === 0 || userState.trim().length > 20 || !nameRegex.test(userState)) {
			setErrList((prev)=>[...prev,"State cannot be empty and cannot contain more than 20 characters.Only alphabets and space allowed"])
		}
    
        if (!userPin || userPin.toString().length > 10 || !pinRegex.test(userPin)) {
			setErrList((prev)=>[...prev,"Pin cannot be empty and length<=10.Only numbers are allowed."])
        }
		
        if (!userPhNo || userPhNo.toString().length !== 10 || !pinRegex.test(userPhNo)) {
			console.log(userPin.length)
        	setErrList((prev)=>[...prev,"Phone number cannot be empty and length must be 10.Only numers are allowed."])
        }
		if(errList.length > 0){
			return
		}
		try{
			const itemList = store.cartItems.map((each)=>{
				const tempObj = {
					itemId:each.itemId,
					cakeMessage:each.cakeMessage,
					message:each.message,
					selectedWeight:each.selectedWeight,
					quantity:each.quantity,
					item_name:each.selectedItem.item_name,
					item_category:each.selectedItem.category,
					cost_of_each:each.selectedItem.price[each.selectedWeight],
					total_cost_of_current_item:each.selectedItem.price[each.selectedWeight] * each.quantity,
				}
				return tempObj;
			})
			console.log(itemList)
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/placeOrder/${user.user}`,
				JSON.stringify({
					order_placed_for:userName,
					state:userState,
					city:userCity,
					address:userAddress,
					postalCode:userPin,
					phoneNumber:userPhNo,
					gst:gst,
					deliveryCost:deliveryCost,
					totalCost:(parseFloat(store.totalCost.toFixed(2)) + parseFloat(gst.toFixed(2)) + parseFloat(deliveryCost.toFixed(2))).toFixed(2),
					items_list:itemList,
				}),
				{
					headers:{
						'Content-Type':'application/json',
						Authorization:`Bearer ${user.accessToken}`
					},
					withCredentials:true,
				}
			)
			console.log(response)
			alert("Order placed")
			store.setCartItems([]);
		}catch(e){
			console.log(e)
		}
	}

	return store.cartItems.length === 0 ? (
		<div className={styles["empty-cart"]}>
			<img
				src="https://res.cloudinary.com/dyiasu9hz/image/upload/v1688152449/bakery/empty-cart-transformed-removebg-preview_uzuxzy.png"
				alt="Empty Cart Illustration"
				className={styles["illustration"]}
			/>
			<h1>Nothing is added to the Cart</h1>
			<NavLink
				to="/items"
				onClick={()=>store.setSlider(140)}
				className={styles["cta-button"]}
			>
				Start Shopping
			</NavLink>
		</div>
	) : (
		<div className={styles["cart-container"]}>
			<div className={styles["cart-left"]}>
				{store.cartItems.map((each) => {
					return (
						<CartItemCard
							removeItem={removeItem.bind(this, each.itemId)}
							key={each.itemId}
							id={each.itemId}
							item={each}
						/>
					)
				})}
			</div>
			<div className={styles["cart-right"]}>
				<div className={styles["order-details"]}>
					<div className={styles["box"]}>
						<h1>Order Summary : </h1>
					</div>
					<div className={styles["box"]}>
						<h2 className={styles["content"]}>
							<span>Item Total : </span>
							<span>₹{store.totalCost.toFixed(2)}</span>
						</h2>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Delivery fee : </span>
							<span>₹{deliveryCost.toFixed(2)}</span>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>GST and Other Charges : </span>
							<span>₹{gst.toFixed(2)}</span>
						</p>
					</div>
					<hr></hr>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Grand Total : </span>
							<span>₹{(parseFloat(store.totalCost.toFixed(2)) + parseFloat(gst.toFixed(2)) + parseFloat(deliveryCost.toFixed(2))).toFixed(2)}</span>
						</p>
					</div>
				</div>
				<div className={styles["address"]}>
					<div className={styles["box"]}>
						<h1>Delivery Address : </h1>
					</div>
					{errList.map((each)=>{
						return <p style={{color:'orange'}}>{each}</p>
					})}
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Name : </span>
							<input
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							></input>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>State : </span>
							<input
								value={userState}
								onChange={(e) => setUserState(e.target.value)}
							></input>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>City : </span>
							<input
								value={userCity}
								onChange={(e) => setUserCity(e.target.value)}
							></input>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Address : </span>
							<textarea
								style={{resize: "none"}}
								value={userAddress}
								onChange={(e) => setUserAddress(e.target.value)}
							></textarea>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Postal Code : </span>
							<input
								value={userPin}
								onChange={(e) => {
									setUserPin(e.target.value)
								}}
							></input>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Phone Number : </span>
							<input
								value={userPhNo}
								onChange={(e) => {
									setUserPhNo(e.target.value)
								}}
							></input>
						</p>
					</div>
				</div>
				<button onClick={placeOrder}>Place Order</button>
			</div>
		</div>
	)
}

export default Cart
