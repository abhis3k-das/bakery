import {motion} from "framer-motion"
import styles from './Item.module.css';
function Item({data ,onClick}) {
	return (
		<motion.div
            layout
            whileHover={{scale:1.06 , transition:{duration:0.2}}}
            className={styles['image-card']}
            onClick={onClick}
        >
			<h2 style={{color:'white'}}>{data.item_name}</h2>
			<img src={data.image[0].url}></img>
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
