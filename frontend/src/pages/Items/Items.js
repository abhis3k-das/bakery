import styles from "./Items.module.css"
import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {data, sampleCake} from "./sampleData"

import {FaShoppingCart} from "react-icons/fa"

import Rating from "../../components/Rating"
import Review from "../../components/Review"
import FilterButtons from "./FilterButtons"
import ItemContainer from "./ItemsContainer"
import CakeForm from "./CakeForm"
import QuantityInput from "./QuantityInput"

import { StoreContext } from "../../Context/store-context"
import { useContext } from "react"

function Items() {
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [filteredData, setFilteredData] = useState(data)
	const [selectedItem, setSelectedItem] = useState()
	const [selectedWeight, setSelectedWeight] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [message, setMessage] = useState("")
	const store = useContext(StoreContext);
	useEffect(() => {
		if (quantity <= 0) {
			setQuantity(1)
			return
		}
		if (quantity > 100) {
			setQuantity(100)
			return
		}
	}, [quantity])
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
	useEffect(() => {
		if (selectedCategory === "all") {
			setFilteredData(data)
		} else {
			const temp = data.filter((each) => each.name === selectedCategory)
			setFilteredData(temp)
		}
	}, [selectedCategory, data])

	const updateCart = ()=>{
		store.updateCart(selectedItem,quantity,message,selectedWeight)
	}
	return (
		<div className={styles["items-page"]}>
			{selectedItem && (
				<div className={styles["item-details-container"]}>
					<button
						onClick={setSelectedItem.bind(this, null)}
						id="close"
					>
						X
					</button>
					{/* NOTE THE KEY MUST ME DIFFERENT IN BOTH PLACES */}
					<motion.div
						key={selectedItem?.id}            //different key
						initial={{x: "-100vw"}}
						animate={{x: 0}}
						exit={{x: "-100vw"}}
						transition={{type: "spring", stiffness: 120}}
						className={styles["item-img"]}
						style={{backgroundColor: `${selectedItem?.color}`}}
					></motion.div>
					<motion.div
						className={styles["item-details"]}
						key={selectedItem?.id + "info"}   //  different key
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: 1}}
					>
						<h1 name="title">
							{sampleCake.title} <Rating rating={sampleCake.rating} />
						</h1>
						<div className={styles["item-data-container"]}>
							<div className={styles["item-info-container"]}>
								<p name="stock">
									Availability : <span style={{color: sampleCake.inStock[selectedWeight] > 0 ? "green" : "red", fontWeight: "bold"}}>{sampleCake.inStock[selectedWeight] > 0 ? "In Stock." : "Currently out of stock."}</span>
								</p>

								<p name="price">
									₹ {sampleCake.price[selectedWeight]} <span style={{fontWeight: "100", fontSize: "1.3rem", opacity: "0.8"}}>(Inclusive of tax)</span>
								</p>
								<h2>Product Description:</h2>
								<p>{sampleCake.description}</p>
								<div className={styles["item-form"]}>
									{sampleCake.category === "cake" && (
										<CakeForm
											selectedWeight={selectedWeight}
											sampleCake={sampleCake}
											setSelectedWeight={setSelectedWeight}
										/>
									)}
									<QuantityInput
										quantity={quantity}
										setQuantity={setQuantity}
										message={message}
										setMessage={setMessage}
										price={sampleCake.price[selectedWeight]}
									/>
									<button name="addToCart" onClick={updateCart}>
										Add <FaShoppingCart />{" "}
									</button>
								</div>
							</div>
							{sampleCake.reviews.length > 0 && (
								<div className={styles["item-reviews-container"]}>
									<h1>Customer Review</h1>
									{sampleCake.reviews
										.filter((each, index) => {
											return index < 5
										})
										.map((each) => {
											return (
												<Review
													data={each}
													key={each.id}
												/>
											)
										})}
								</div>
							)}
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
