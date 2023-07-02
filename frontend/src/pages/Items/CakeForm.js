import styles from "./CakeForm.module.css"
function CakeForm({selectedWeight, data, setSelectedWeight, setCakeMessage, category,cakeMessage}) {
	return (
		<div className={styles["cake-area"]}>
			<h1>Select Weight : </h1>
			<div className={styles["item-weight-selector"]}>
				{Object.keys(data.weight).map((each) => {
					if (data.availability[each] > 0) {
						return (
							<div
								key={each}
								onClick={setSelectedWeight.bind(this, each)}
								className={[styles["weight-box"], selectedWeight === each ? styles["selected-weight"] : ""].join(" ")}
							>
								{data.weight[each]}
							</div>
						)
					}
				})}
			</div>
			{category === "cake" && (
				<>
					<h1>Cake Message : </h1>
					<input
						type="text"
						maxLength={20}
						placeholder="Happy ..."
						onChange={(e) => setCakeMessage(e.target.value)}
						value={cakeMessage}
					/>
				</>
			)}
		</div>
	)
}

export default CakeForm
