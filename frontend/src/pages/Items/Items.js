import styles from "./Items.module.css"
import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {FaShoppingCart} from "react-icons/fa"

import Rating from "../../components/Rating"
import Review from "../../components/Review"
import FilterButtons from "./FilterButtons"
import ItemContainer from "./ItemsContainer"
import CakeForm from "./CakeForm"
import QuantityInput from "./QuantityInput"

import {StoreContext} from "../../Context/store-context"
import {useContext} from "react"
import AddReview from "./AddReview"

function Items() {
	const store = useContext(StoreContext)
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [filteredData, setFilteredData] = useState(store.products || [])
	const [selectedItem, setSelectedItem] = useState()
	const [isAvailable, setIsAvailable] = useState(false)
	const [selectedWeight, setSelectedWeight] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [message, setMessage] = useState("")
	const [cakeMessage, setCakeMessage] = useState("")

	const [edit,setEdit] = useState(false)
	const [editReviewData,setEditReviewData] = useState();

	useEffect(()=>{
		const data = localStorage.getItem('selectedItemFromHomePage');
		if (data) {
			setSelectedItem(JSON.parse(data));
			localStorage.removeItem('selectedItemFromHomePage');
		}
	},[])
	useEffect(() => {
		setQuantity(1)
		setSelectedWeight(0)
		setCakeMessage("")
		setMessage("")
		const findItem = store.cartItems.filter((each) => each.itemId === selectedItem?._id)[0]
		if (findItem) {
			setQuantity(findItem.quantity)
			setMessage(findItem.message)
			setCakeMessage(findItem.cakeMessage)
		}
		if (selectedItem) {
			const checkinSelectedItem = Object.keys(selectedItem.availability).filter((each) => selectedItem.availability[each] > 0)
			setIsAvailable(checkinSelectedItem.length > 0)
			if (checkinSelectedItem.length > 0) {
				setSelectedWeight(checkinSelectedItem[0])
			}
		}
	}, [selectedItem,store.cartItems])
	useEffect(() => {
		if (quantity <= 0) {
			setQuantity(1)
			return
		}
		if (quantity > 100) {
			setQuantity(100)
			return
		}
		const findItem = store.cartItems.filter((each) => each.itemId === selectedItem?._id)[0]
		
		if(findItem && findItem.quantity !== quantity){
			store.addToCart(selectedItem,quantity,findItem.message,findItem.selectedWeight,findItem.cakeMessage)
		}
	}, [quantity,selectedItem,store])

	useEffect(() => {
		if (selectedCategory === "all") {
			setFilteredData(store.products)
		} else {
			const temp = store.products.filter((each) => each.category === selectedCategory)
			setFilteredData(temp)
		}
	}, [selectedCategory, store.products])
	const updateCategory = (category) => {
		setSelectedCategory(category)
	}
	const displayItem = (item) => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
		setSelectedItem(item)
	}
	const updateCart = () => {
		store.addToCart(selectedItem, quantity, message, selectedWeight, cakeMessage)

	}
	return (
		<div className={styles["items-page"]}>
			{selectedItem && (
				<div className={styles["item-details-container"]}>
					<button
						onClick={(e)=>{
							setSelectedItem(null)
						}}
						id="close"
					>
						X
					</button>
					{/* NOTE THE KEY MUST ME DIFFERENT IN BOTH PLACES */}
					<motion.div
						key={selectedItem?.id} //different key
						initial={{x: "-100vw"}}
						animate={{x: 0}}
						exit={{x: "-100vw"}}
						transition={{type: "spring", stiffness: 120}}
						className={styles["item-img"]}
						style={{backgroundImage: `url(${selectedItem && selectedItem.image[0].url})`, backgroundSize: "cover", backgroundPosition: "center"}}
					></motion.div>
					<motion.div
						className={styles["item-details"]}
						key={selectedItem?.id + "info"} //  different key
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: 1}}
					>
						<h1 name="title">
							<span>{selectedItem.item_name}</span><Rating rating={5} />
						</h1>
						<div className={styles["item-data-container"]}>
							<div className={styles["item-info-container"]}>
								<p name="stock">
									Availability : <span style={{color: isAvailable ? "green" : "red", fontWeight: "bold"}}>{isAvailable ? "In Stock." : "Currently out of stock."}</span>
								</p>

								<p name="price">
									₹ {selectedItem.price[selectedWeight]} <span style={{fontWeight: "100", fontSize: "1.3rem", opacity: "0.8"}}>(Inclusive of tax)</span>
								</p>
								<h2>Product Description:</h2>
								<p>{selectedItem.description}</p>
								<div className={styles["item-form"]}>
									<CakeForm
										selectedWeight={selectedWeight}
										data={selectedItem}
										setSelectedWeight={setSelectedWeight}
										setCakeMessage={setCakeMessage}
										cakeMessage={cakeMessage}
										category={selectedItem.category}
									/>

									<QuantityInput
										quantity={quantity}
										setQuantity={setQuantity}
										message={message}
										setMessage={setMessage}
										price={selectedItem.price[selectedWeight]}
									/>
									<button
										name="addToCart"
										onClick={updateCart}
									>
										Add <FaShoppingCart />{" "}
									</button>
								</div>
								<div className={styles["item-reviews-container"]}>
									<h1>Customer Review</h1>
									<AddReview
										product_id={selectedItem._id}
										setSelectedItem={setSelectedItem}
										setEdit={setEdit}
										edit={edit}
										setEditReviewData={setEditReviewData}
										editReviewData={editReviewData}
									/>
									{selectedItem.reviews.map((each) => {
										return (
											<Review
												reviewData={each}
												key={each._id}
												setEdit={setEdit}
												setEditReviewData={setEditReviewData}
												setSelectedItem={setSelectedItem}
											/>
										)
									})}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
			<FilterButtons
				updateCategory={updateCategory}
				selectedCategory={selectedCategory}
			/>
			<ItemContainer
				filteredData={filteredData}
				displayItem={displayItem}
			/>
		</div>
	)
}
export default Items
