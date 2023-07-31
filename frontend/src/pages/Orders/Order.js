import {useContext, useEffect, useState} from "react"
import styles from "./Order.module.css"
import axios from "axios"
import {UserContext} from "../../Context/user-context"
import {formatDate} from "../../utils/FormatDate"
import {Loading} from "../../components/Loading"
function Orders() {
	const [clicked, setClicked] = useState()
	const [orderList, setOrderList] = useState([])
	const user = useContext(UserContext)
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		const getOrders = async () => {
			try {
				setIsLoading(true)
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getOrders/${user.user}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
					withCredentials: true,
				})
				let temp = response.data.orderList
				temp.reverse()
				setOrderList(temp)
				setIsLoading(false)
			} catch (err) {
				setIsLoading(false)
				console.log(err)
			}
		}
		getOrders()
	}, [user.user])
	return (
		<>	
			{isLoading && <Loading/>}
			<div className={styles["order-container"]}>
				<div className={styles["background-container"]}></div>
				<div
					style={{
						backgroundColor: "black",
						zIndex: -1,
						opacity: 0.8,
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						right: 0,
					}}
				></div>
				<h1>My Orders</h1>
				{orderList.length === 0 ? 
					<div style={{
						textAlign:'center',
						lineHeight:'50vh',
						fontSize:'24px'
					}}>
						<p>No Order Placed Yet</p>
					</div>
				: 
					orderList.map((each, index) => {
						return (
							<div
								className={styles["order-card"]}
								onClick={() => {
									if (clicked === index) {
										setClicked(undefined)
									} else {
										setClicked(index)
									}
								}}
								key={index}
							>
								<div className={styles["visible-info"]}>
									<div className={styles["card-left"]}>
										<h2>{formatDate(each.ordered_On)}</h2>
										<div>
											<p style={{textTransform: "capitalize"}}>
												<span>Name:</span> {each.order_placed_for}
											</p>
											<p>
												<span>Address:</span> {each.address}
											</p>
											<br></br>
											<p>
												<span>State:</span> {each.state}, <span>City:</span> {each.city}, <span>Pin:</span> {each.postalCode}
											</p>
											<p>
												<span>Total Items:</span> {each.items_list.length}
											</p>
										</div>
									</div>
									<div className={styles["card-right"]}>
										<h2>${each.total_cost}</h2>
									</div>
								</div>
								<div className={[styles["items-list"], clicked === index ? styles["show"] : ""].join(" ")}>
									<div className={styles["items-container"]}>
										{each.items_list.map((item) => {
											return (
												<p
													key={index + item.item_id}
													className={styles["item-description"]}
												>
													{item.item_name} * {item.quantity}
												</p>
											)
										})}
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</>
	)
}
export default Orders
