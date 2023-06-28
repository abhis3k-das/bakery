import styles from './FilterButtons.module.css';
function FilterButtons({updateCategory,selectedCategory}) {
	return (
		<div className={styles["items-filter-buttons"]}>
			<button
				onClick={updateCategory.bind(this, "all")}
				className={selectedCategory === "all" ? styles["selected"] : ""}
			>
				All
			</button>
			<button
				onClick={updateCategory.bind(this, "cake")}
				className={selectedCategory === "cake" ? styles["selected"] : ""}
			>
				Cake
			</button>
			<button
				onClick={updateCategory.bind(this, "cookie")}
				className={selectedCategory === "cookie" ? styles["selected"] : ""}
			>
				Cookie
			</button>
			<button
				onClick={updateCategory.bind(this, "bread")}
				className={selectedCategory === "bread" ? styles["selected"] : ""}
			>
				Bread
			</button>
		</div>
	)
}
export default FilterButtons
