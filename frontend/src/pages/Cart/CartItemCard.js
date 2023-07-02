import { useContext, useEffect, useState } from "react"
import styles from "./CartItemCard.module.css"
import {RiDeleteBin5Line} from 'react-icons/ri'
import { StoreContext } from "../../Context/store-context";
function CartItemCard({removeItem,id,item}) {
    const [quantity,setQuantity] = useState(item.quantity);
    const cart = useContext(StoreContext);
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
    useEffect(()=>{
        cart.addToCart(item.selectedItem,quantity,item?.message,item?.selectedWeight,item?.cakeMessage)
    },[quantity,item,cart])
	return (
		<div className={styles["item-card-container"]}>
			<div className={styles["item-card-left"]}>
                <img src={item.selectedItem?.image[0].url ? "https://assets.winni.in/product/primary/2023/3/83221.jpeg?dpr=2&w=220" : ""} alt="..."></img>
            </div>
			<div className={styles["item-card-right"]}>
				<div className={styles['about']}>
					<h1> {item.selectedItem.item_name}</h1>
					<p>
						Weight : <span>{item.selectedItem.weight[item?.selectedWeight]}</span>
					</p>
					<p> Price : ₹ <span>{item.selectedItem.price[item?.selectedWeight]}</span></p>
                    <p> Veg : <span>{item.selectedItem?.veg}</span></p>
                    <p> Message : <span>{item?.message.length === 0 ? '" "' : item?.message}</span></p>
                    {item.selectedItem?.category === "cake" && (<p> Cake Message : <span>{item.cakeMessage}</span></p>)}
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
                        <h1>Total : <span>₹{item.selectedItem.price[item?.selectedWeight] * item?.quantity}</span></h1>
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
