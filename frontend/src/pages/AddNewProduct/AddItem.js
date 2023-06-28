import styles from "./AddItem.module.css"
import {useState} from "react"
import InputCheckBox from "./InputCheckBox"
import axios from "axios"
function AddItem() {
	const [item_name, setItem_name] = useState("")
	const [description, setDescription] = useState("")
	const [category, setCategory] = useState("cake")

	const [weight_1, setWeight_1] = useState()
	const [price_1, setPrice_1] = useState(0)
	const [quantity_available_1, setQuantity_available_1] = useState(0)

	const [weight_2, setWeight_2] = useState()
	const [price_2, setPrice_2] = useState(0)
	const [quantity_available_2, setQuantity_available_2] = useState(0)

	const [weight_3, setWeight_3] = useState()
	const [price_3, setPrice_3] = useState(0)
	const [quantity_available_3, setQuantity_available_3] = useState(0)

	const [weight_4, setWeight_4] = useState()
	const [price_4, setPrice_4] = useState(0)
	const [quantity_available_4, setQuantity_available_4] = useState(0)

	const [selectedImage, setSelectedImage] = useState(null)

	const [errList, setErrList] = useState([])
	const handleImageChange = (event) => {
		const file = event.target.files[0]
		setSelectedImage(file)
	}
	const formSubmitHandler = async (e) => {
		e.preventDefault()
		setErrList([])
		const weightObject = {}
		const priceObject = {}
		const quantityObject = {}
		if (!item_name || item_name.length > 20) {
			setErrList((prev) => {
				return [...prev, "Item name cannot be empty and can contain only 20 char."]
			})
		}
		if (!description || description.length > 200) {
			setErrList((prev) => {
				return [...prev, "Description cannot be empty and can contain only 200 char."]
			})
		}
		if (!selectedImage) {
			setErrList((prev) => {
				return [...prev, "Add an image"]
			})
		}
		if (!weight_1 && !weight_2 && !weight_3 && !weight_4) {
			setErrList((prev) => {
				return [...prev, "Must select 1 weight category"]
			})
		}

		if (weight_1 && (quantity_available_1 <= 0 || price_1 <= 0)) {
			setErrList((prev) => {
				return [...prev, "Quantity and price must be greater > 0 for 500gm weight"]
			})
		}else if(weight_1){
			weightObject["code_01"] = weight_1
			priceObject["code_01"] = price_1
			quantityObject["code_01"] = quantity_available_1
		}
		if (weight_2 && (quantity_available_2 <= 0 || price_2 <= 0)) {
			setErrList((prev) => {
				return [...prev, "Quantity and price must be greater > 0 for 1kg weight"]
			})
		}else if(weight_2){
			weightObject["code_02"] = weight_2
			priceObject["code_02"] = price_2
			quantityObject["code_02"] = quantity_available_2

		}
		if (weight_3 && (quantity_available_3 <= 0 || price_3 <= 0)) {
			setErrList((prev) => {
				return [...prev, "Quantity and price must be greater > 0 for 1.5kg weight"]
			})
		}else if(weight_3){
			weightObject["code_03"] = weight_3
			priceObject["code_03"] = price_3
			quantityObject["code_03"] = quantity_available_3

		}
		if (weight_4 && (quantity_available_4 <= 0 || price_4 <= 0)) {
			setErrList((prev) => {
				return [...prev, "Quantity and price must be greater > 0 for 2kg weight"]
			})
		}else if(weight_4){
			weightObject["code_04"] = weight_4
			priceObject["code_04"] = price_4
			quantityObject["code_04"] = quantity_available_4

		}
		if (errList.length >= 1) {
			return
		}
		try {
			console.log(priceObject,quantityObject,weightObject)

			const formData = new FormData();
			formData.append('item_name', item_name);
			formData.append('description', description);
			formData.append('image', selectedImage);
			formData.append('category',category);
			formData.append('weightObject', JSON.stringify(weightObject));
			formData.append('priceObject', JSON.stringify(priceObject));
			formData.append('quantityObject', JSON.stringify(quantityObject));
			const response = await axios.post(
				"http://localhost:8000/addNewProduct",
				formData,
				{
					headers:{
						'Content-Type':'multipart/form-data',
					}
				}
			)
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className={styles["newItem-container"]}>
			<img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2100&q=80"></img>
			<div></div>
			<div className={styles["newItem-card"]}>
				<div className={styles["header"]}>
					<h1>Add New Item</h1>
				</div>
				<div style={{margin: "1rem 0"}}>
					{errList.length > 0 &&
						errList.map((each) => {
							return <p style={{color: "orange", fontWeight: "bold"}}>{each}</p>
						})}
				</div>
				<form
					className={styles["newItem-form"]}
					onSubmit={formSubmitHandler}
					encType="multipart/form-data"
				>
					<div className={styles["input-box"]}>
						<label>
							{" "}
							Item Title <span>*</span>
						</label>
						<input
							type="text"
							maxLength={20}
							onChange={(e) => setItem_name(e.target.value)}
							placeholder="Enter item title"
						></input>
					</div>
					<div className={styles["input-box"]}>
						<label>Select Image:</label>
						<div style={{display: "flex", flexDirection: "column"}}>
							<input
								type="file"
								onChange={handleImageChange}
							/>

							<img
								src={selectedImage && URL.createObjectURL(selectedImage)}
								alt="Selected"
								style={{width: "100px", height: "100px", border: "1px solid white"}}
							></img>
						</div>
					</div>
					<div className={styles["input-box"]}>
						<label>
							{" "}
							Description <span>*</span>
						</label>
						<textarea
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Description"
						></textarea>
					</div>

					<div className={styles["input-box"]}>
						<label>
							{" "}
							Category <span>*</span>
						</label>
						<select onChange={(e) => setCategory(e.target.value)}>
							<option value={"cake"}>Cake</option>
							<option value={"cookie"}>Cookie</option>
							<option value={"bread"}>Bread</option>
							<option value={"dairy"}>Dairy</option>
						</select>
					</div>

					<div className={styles["input-box"]}>
						<label>
							Weight/Quantity/Price <span>*</span>
						</label>
						<div style={{width: "calc(100% - 160px - 20px)", fontWeight: "bold", textAlign: "center"}}>
							<InputCheckBox
								weight={(e) => setWeight_1("500gm")}
								price={(e) => setPrice_1(e.target.value)}
								quantity={(e) => setQuantity_available_1(e.target.value)}
							>
								500gm
							</InputCheckBox>
							<InputCheckBox
								weight={(e) => setWeight_2("1kg")}
								price={(e) => setPrice_2(e.target.value)}
								quantity={(e) => setQuantity_available_2(e.target.value)}
							>
								1kg
							</InputCheckBox>
							<InputCheckBox
								weight={(e) => setWeight_3("1.5kg")}
								price={(e) => setPrice_3(e.target.value)}
								quantity={(e) => setQuantity_available_3(e.target.value)}
							>
								1.5kg
							</InputCheckBox>
							<InputCheckBox
								weight={(e) => setWeight_4("2kg")}
								price={(e) => setPrice_4(e.target.value)}
								quantity={(e) => setQuantity_available_4(e.target.value)}
							>
								2kg
							</InputCheckBox>
							<p style={{color: "orange", marginTop: "0.5rem"}}>Note : Only the checked Weights will be considered</p>
						</div>
					</div>
					<button>Submit</button>
				</form>
			</div>
		</div>
	)
}

export default AddItem
