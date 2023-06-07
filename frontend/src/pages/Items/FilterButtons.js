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
				onClick={updateCategory.bind(this, "itemA")}
				className={selectedCategory === "itemA" ? styles["selected"] : ""}
			>
				Item A
			</button>
			<button
				onClick={updateCategory.bind(this, "itemB")}
				className={selectedCategory === "itemB" ? styles["selected"] : ""}
			>
				Item B
			</button>
			<button
				onClick={updateCategory.bind(this, "itemC")}
				className={selectedCategory === "itemC" ? styles["selected"] : ""}
			>
				Item C
			</button>
		</div>
	)
}
export default FilterButtons
