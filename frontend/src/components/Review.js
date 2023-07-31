import {useEffect, useState, useContext} from "react"
import Rating from "./Rating"
import styles from "./Review.module.css"
import {UserContext} from "../Context/user-context"
import axios from "axios"
function Review({reviewData, setEdit, setEditReviewData, setSelectedItem}) {
	const [date, setDate] = useState("")
	const user = useContext(UserContext)
	useEffect(() => {
		const date = new Date(reviewData.posted_On)

		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()

		const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`
		setDate(formattedDate)
	}, [])

	const deleteReview = async () => {
		console.log(reviewData)
		console.log(user.user)
		try {
			const response = await axios.delete(`http://localhost:8000/review/${reviewData._id}`, {
				data: {
					user_Id: user.user,
				},

				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${user.accessToken}`,
				},
				withCredentials: true,
			})
			alert(response.data?.message)
			console.log(response.data.updatedData)
			setSelectedItem(response.data?.updatedData)
		} catch (e) {
			alert(e.response?.data?.message)
		}
	}
	return (
		<div className={styles["review-container"]}>
			<div style={{display: "flex", justifyContent: "space-between", margin: "0.2rem 0"}}>
				<h1>
					{reviewData.posted_By}
					{/* <Rating
						rating={reviewData.rating.toFixed(1)}
						style={{
							fontSize: "1rem",
							margin: "1rem",
							padding: "0 5px",
							borderRadius: "5px",
							textAlign: "center",
						}}
					/> */}
				</h1>
				{user.user === reviewData.user_Id && (
					<div className={styles["button-container"]}>
						<button
							className={styles["edit-review"]}
							onClick={() => {
								setEdit(true)
								setEditReviewData(reviewData)
							}}
						>
							Edit
						</button>
						<button
							className={styles["delete-review"]}
							onClick={deleteReview}
						>
							Delete
						</button>
					</div>
				)}
			</div>
			<p style={{fontWeight: "100", opacity: "0.8", fontSize: "0.9rem"}}>
				Posted on {date} &bull; {reviewData.from} &bull; Occation : {reviewData.occation}
			</p>
			<p className={styles["review-description"]}>{reviewData.review}</p>
		</div>
	)
}
export default Review
