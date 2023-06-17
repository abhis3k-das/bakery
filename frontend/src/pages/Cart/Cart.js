import styles from "./Cart.module.css"
import {useContext, useState} from "react"
import {StoreContext} from "../../Context/store-context"
import CartItemCard from "./CartItemCard"
const temp = [
	{
		id: "1",
		quantity: "5",
		weightId: "2",
		title: "a",
	},
	{
		id: "2",
		quantity: "5",
		weightId: "2",
		title: "b",
	},
	{
		id: "3",
		quantity: "5",
		weightId: "2",
		title: "c",
	},
	{
		id: "4",
		quantity: "5",
		weightId: "2",
		title: "d",
	},
	{
		id: "5",
		quantity: "5",
		weightId: "2",
		title: "e",
	},
	{
		id: "6",
		quantity: "5",
		weightId: "2",
		title: "f",
	},
]
function Cart() {
	const store = useContext(StoreContext)
	const [itemList, setItemList] = useState(temp)
	const removeItem = (removeId) => {
		window.scrollTo(0, 0)
		setItemList((prev) => {
			return prev.filter((each) => each.id !== removeId)
		})
	}

	return (
		<div className={styles["cart-container"]}>
			<div className={styles["cart-left"]}>
				{itemList.map((each) => {
					return (
						<CartItemCard
							removeItem={removeItem.bind(this, each.id)}
							key={each.id}
							id={each.id}
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
							<span>₹800.00</span>
						</h2>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Delivery fee : </span>
							<span>₹80.00</span>
						</p>
					</div>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>GST and Other Charges : </span>
							<span>₹20.00</span>
						</p>
					</div>
					<hr></hr>
					<div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Grand Total : </span>
							<span>₹900.00</span>
						</p>
					</div>
				</div>
				<div className={styles["address"]}>
					<div className={styles["box"]}>
						<h1>Delivery Address :  </h1>
					</div>
                    <div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Name : </span>
							<span>Mrs. Shyanne Crona</span>
						</p>
					</div>
                    <div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Address : </span>
							<span>2855 Lagoon Park Dr , Montegomery , Alaska ,Near Juke Park</span>
						</p>
					</div>
                    <div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Postal Code : </span>
							<span>36109</span>
						</p>
					</div>
                    <div className={styles["box"]}>
						<p className={styles["content"]}>
							<span>Phone Number : </span>
							<span>(334) 395-6699</span>
						</p>
					</div>
				</div>
                <button>Place Order</button>
			</div>
		</div>
	)
}

export default Cart
