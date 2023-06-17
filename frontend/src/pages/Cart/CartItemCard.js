import { useState } from "react"
import styles from "./CartItemCard.module.css"
import {RiDeleteBin5Line} from 'react-icons/ri'
function CartItemCard({removeItem,id}) {
    const [quantity,setQuantity] = useState(1);
    const onClickHandler = (state)=>{
        if(state){
            setQuantity((prev)=>{
                if(prev+1<=20){
                    return prev+1;
                }
                else{
                    return prev;
                }
            })
        }else{
            setQuantity((prev)=>{
                if(prev-1>0){
                    return prev-1;
                }else{
                    return prev;
                }
            })
        }
    }
	return (
		<div className={styles["item-card-container"]}>
			<div className={styles["item-card-left"]}>
                <img src="https://assets.winni.in/product/primary/2023/3/83221.jpeg?dpr=2&w=220" alt="..."></img>
            </div>
			<div className={styles["item-card-right"]}>
				<div className={styles['about']}>
					<h1> Tropical Mango Delight {id}</h1>
					<p>
						Weight : <span>0.5kg</span>
					</p>
					<p> Price : ₹ <span>500.00</span></p>
                    <p> Veg : <span>Yes</span></p>
					<div className={styles["item-card-quantity-container"]}>
						<p>Quantity : </p>
						<div className={styles["item-card-quantity-handler"]}>
							<span onClick={onClickHandler.bind(this,true)}>+</span>
							<p>{quantity}</p>
							<span onClick={onClickHandler.bind(this,false)}>-</span>
						</div>
					</div>
				</div>
                <div className={styles['total']}>
                    <div>
                        <h1>Total : <span>₹ 500.00</span></h1>
                    </div>
                    <div className={styles['button']}>
                        <button onClick={removeItem}><RiDeleteBin5Line style={{marginRight:'0.3rem'}}/><span>Remove</span></button>
                    </div>
                </div>
			</div>
		</div>
	)
}

export default CartItemCard
