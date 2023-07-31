import {motion} from "framer-motion"
import styles from "./Item.module.css"
function Item({data, onClick ,style=undefined}) {
	return (
		<motion.div
			layout
			whileHover={{scale: 1.06, transition: {duration: 0.2}}}
			className={styles["image-card"]}
			onClick={onClick}
			style={style}
		>
			<div className={styles["item-image-container"]}>
				<img
					src={data.image[0].url}
					alt="404 not found"
					></img>
			</div>
			<div className={styles["item-details"]}>
				<div>
					<h2>{data.item_name}</h2>
				</div>
				<div>
					<p style={{fontWeight:900}}>₹{parseFloat(data.price[Object.keys(data.price)[0]]).toFixed(2)}</p>
				</div>
			</div>
		</motion.div>
	)
}
export default Item
