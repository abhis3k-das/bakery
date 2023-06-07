import styles from "./ItemsContainer.module.css"
import {motion} from 'framer-motion';
import Item from "../../components/Item";
function ItemContainer({filteredData,displayItem}) {
	return (
		<motion.div
			layout
			className={styles["items-container"]}
		>
			{filteredData.map((each, index) => {
				return (
					<Item
						key={each.id}
						data={each}
						onClick={displayItem.bind(this, each)}
					/>
				)
			})}
		</motion.div>
	)
}

export default ItemContainer
