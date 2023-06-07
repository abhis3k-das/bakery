import Rating from "./Rating"
import styles from "./Review.module.css"
function Review({data}) {
	return (
		<div className={styles["review-container"]}>
			<h1>
				{data.name}
				<Rating
					rating={data.rating.toFixed(1)}
					style={{
						fontSize: "1rem",
						margin: "1rem",
						padding: "0 5px",
						borderRadius: "5px",
						textAlign: "center",
					}}
				/>
			</h1>
			<p style={{fontWeight: "100", opacity: "0.8" ,fontSize:'0.9rem'}}>
				Posted on {data.date} &bull; {data.location} &bull; Occation : {data.occation}
			</p>
			<p className={styles['review-description']}>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
				popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
				popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
			</p>
		</div>
	)
}
export default Review
