import styles from "./Cart.module.css"
import {useContext, useEffect, useState} from "react"
import {StoreContext} from "../../Context/store-context"
import CartItemCard from "./CartItemCard"
function Cart() {
	const store = useContext(StoreContext)
	const [gst,setGst] = useState(80);
	const [deliveryCost,setDeliveryCost] = useState(100);
	const removeItem = (removeId) => {
		window.scrollTo(0, 0)
		store.removeFromCart(removeId);
	}

	

	return (
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
