import styles from "./QuantityInput.module.css"
function QuantityInput({setQuantity, quantity, message, setMessage, price}) {
	return (
		<div className={styles["input-area"]}>
			<h1>Quantity : </h1>
			<div className={styles["quantity-container"]}>
				<div>
					<div
						className={styles["box"]}
						onClick={() => setQuantity((prev) => (prev <= 1 ? prev : prev - 1))}
					>
						-
					</div>
					<input
						type="number"
						value={quantity}
						onChange={(e) => {
							setQuantity(e.target.value)
						}}
					/>
					<div
						className={styles["box"]}
						onClick={() => setQuantity((prev) => (prev < 20 ? prev + 1 : prev))}
					>
						+
					</div>
				</div>
				<div>
					<h1>Total : ₹ {price * quantity} </h1>
				</div>
			</div>
			<div className={styles['gift']}>
				<h1>A gift ? Leave a Message.</h1>
				<textarea
					className={styles["textarea"]}
					maxLength={100}
					placeholder="(Optional)"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</div>
		</div>
	)
}
export default QuantityInput
