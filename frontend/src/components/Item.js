import {motion} from "framer-motion"
import styles from './Item.module.css';
function Item({data ,onClick}) {
	const imgUrl = "https://cdn.loveandlemons.com/wp-content/uploads/2020/12/cookie-recipes.jpg"
	function getRandomColor() {
		// Generate random values for red, green, and blue components
		const red = Math.floor(Math.random() * 256)
		const green = Math.floor(Math.random() * 256)
		const blue = Math.floor(Math.random() * 256)

		// Construct the RGB color string
		const color = `rgb(${red}, ${green}, ${blue})`

		return color
	}

	return (
		<motion.div
            layout
            whileHover={{scale:1.06 , transition:{duration:0.2}}}
            className={styles['image-card']}
            onClick={onClick}
        >
			<h2 style={{color:'white'}}>{data.name}</h2>
			<img src={data.url}></img>
			<div style={{
				position:'absolute',
				bottom:'2rem',
				right:'2rem',
				border:'1px solid white',
				height:'30px',
				width:'30px',
				display:'flex',
				justifyContent:'center',
				alignItems:'center',
				fontSize:'1.4rem',
				fontWeight:'bold',
			}}>+</div>
		</motion.div>
	)
}
export default Item
