import { createContext ,useEffect,useState} from "react";
import { sampleCake } from "../pages/Items/sampleData";
export const StoreContext = createContext({
    addToCart:(selectedItem,quantity,message,selectedWeight)=>{},
    removeFromCart:(removeItemId)=>{},
    cartItems:[],
    products:[],
    setProducts:()=>{},
    totalCost:0,
});
export const StoreProvider = (props)=>{
    const [cartItems,setCartItems] = useState([]);
    const [total,setTotal] = useState(0);
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        setTotal(0)
        for(let i = 0 ; i < cartItems.length ; i++){
            setTotal((prev)=>{
                return prev + (cartItems[i].selectedItem.price[cartItems[i].selectedWeight] * cartItems[i].quantity)
            })
        }
    },[cartItems])
    const storeVariables = {
        addToCart:(selectedItem,quantity,message,selectedWeight,cakeMessage)=>{
            setCartItems((prev)=>{
                let found = false;
                let temp = prev.map((each)=>{
                    if(each.itemId === selectedItem._id && each.selectedWeight === selectedWeight){
                        found = true;
                        return (
                            {
                                itemId:each.itemId,
                                message:each.message,
                                cakeMessage:each.cakeMessage,
                                selectedWeight:each.selectedWeight,
                                selectedItem:each.selectedItem,
                                quantity: quantity,
                            }
                        )
                    }else{
                        return each;
                    }
                })
                if(!found){
                    temp.push({
                        quantity:quantity,
                        itemId:selectedItem._id,
                        message:message,
                        cakeMessage:cakeMessage,
                        selectedWeight:selectedWeight,
                        selectedItem:selectedItem,
                    })
                }
                return temp;
            })
        },
        removeFromCart:(removeItemId)=>{
            setCartItems((prev)=>{
                return prev.filter((each)=>each.itemId !== removeItemId);
            })
        },
        cartItems:cartItems,
        totalCost:total,
        products:products,
        setProducts:setProducts,
    }
    return (
        <StoreContext.Provider value={storeVariables}>
            {props.children}
        </StoreContext.Provider>
    )
}