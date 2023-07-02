import {useContext, useEffect, useState} from "react"
import styles from "./AddReview.module.css"
import axios from "axios"
import {UserContext} from "../../Context/user-context"
import {AiFillStar, AiOutlineStar} from "react-icons/ai"
function AddReview({product_id,setSelectedItem, setEdit, edit, setEditReviewData,editReviewData}) {
	const user = useContext(UserContext)

	const [review, setReview] = useState("")
	const [rating, setRating] = useState(3)
	const [state, setState] = useState("")
	const [occation, setOccation] = useState("")
	const [err, setErr] = useState([])
	const handleRating = (value) => {
		setRating(value)
	}
	const addReviewHandler = async () => {
		console.log(review, rating, user.user, state, occation, product_id._id)
		setErr([])
        if (!review || review.length === 0 || review.length > 80) {
			setErr((prev) => [...prev, "Review cannot be empty and it can contain upto 80 characters"])
		}
		if (!rating || rating <= 0 || rating > 5) {
			setErr((prev) => [...prev, "Rating must be between 1-5"])
		}
		if (!state || state.length === 0 || state.length > 20) {
			setErr((prev) => [...prev, "State cannot be empty and it can contain upto 20 characters"])
		}
		if (!occation || occation.length === 0 || occation.length > 20) {
			setErr((prev) => [...prev, "Occation cannot be empty and it can contain upto 20 characters"])
		}
		if (err.length > 0) {
			return
		}
		try {
			const url = edit ? `${process.env.REACT_APP_BASE_URL}/updateReview` : `${process.env.REACT_APP_BASE_URL}/addReview`
			const jsonData = edit
				? JSON.stringify({
                        review_Id:editReviewData._id,
						review,
						rating,
						user_Id: user.user,
						state,
						occation,
						product_Id: product_id,
				  })
				: JSON.stringify({
						review,
						rating,
						user_Id: user.user,
						state,
						occation,
						product_Id: product_id,
				  })
			const response = await axios.post(
				url,
                jsonData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
					withCredentials: true,
				}
			)
			setSelectedItem(response.data?.updatedData)
			alert(response.data?.message)
			setState("")
			setOccation("")
			setRating(3)
			setReview("")
            setEdit(false)
            setEditReviewData()
		} catch (e) {
			alert(e.response?.data?.message)
		}
	}
	useEffect(() => {
		if (edit) {
			setState(editReviewData.from)
			setOccation(editReviewData.occation)
			setRating(editReviewData.rating)
			setReview(editReviewData.review)
		}
	}, [edit])
	return (
		<div className={styles["review-container"]}>
			<p>Leave a Review:</p>
			{err &&
				err.map((each, index) => (
					<p
						style={{fontWeight: 800, fontSize: "0.8rem", color: "orange"}}
						key={index}
					>
						{each}
					</p>
				))}
			<input
				placeholder="From (State)"
				onChange={(e) => setState(e.target.value)}
				value={state}
			></input>
			<input
				placeholder="Occation"
				onChange={(e) => setOccation(e.target.value)}
				value={occation}
			></input>
			<div>
				{[1, 2, 3, 4, 5].map((value) => (
					<span
						key={value}
						onClick={() => handleRating(value)}
						style={{cursor: "pointer", color: rating >= value ? "yellow" : "gray"}}
					>
						{rating >= value ? <AiFillStar /> : <AiOutlineStar />}
					</span>
				))}
			</div>
			<textarea
				className={styles["review-textarea"]}
				placeholder="Add a review"
				maxLength={30}
				value={review}
				onChange={(e) => setReview(e.target.value)}
			></textarea>
			<div className={styles["button-container"]}>
				<button
					className={styles["add-review-button"]}
					onClick={addReviewHandler}
				>
					{edit && user.user === editReviewData.user_Id ? "Update Review" : "Add Review"}
				</button>
			</div>
		</div>
	)
}

export default AddReview
