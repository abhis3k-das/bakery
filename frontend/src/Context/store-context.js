import { createContext ,useState} from "react";
export const StoreContext = createContext({
    isLoggedIn:false,
    updateCart:(selectedItem,quantity,message,selectedWeight)=>{},
    cartItems:[],
    message:undefined,
    weight:undefined,
});
export const StoreProvider = (props)=>{
    const [cartItems,setCartItems] = useState([]);
    const [msg,setMessage] = useState("");
    const [wt,setWeight] = useState(1);
    const storeVariables = {
        isLoggedIn:false,
        updateCart:(selectedItem,quantity,message,selectedWeight)=>{
            setCartItems((prev)=>{
                let found = false;
                let temp = prev.map((each)=>{
                    if(each.itemId === selectedItem.id){
                        found = true;
                        return (
                            {
                                quantity: each.quantity + quantity,
                                itemId : each.itemId,
                            }
                        )
                    }else{
                        return each;
                    }
                })
                if(!found){
                    temp.push({quantity:quantity,itemId:selectedItem.id})
                }
                return temp;
            })
            setMessage(message);
            setWeight(selectedWeight);
        },
        cartItems:cartItems,
        weight:wt,
        message:msg,
    }
    return (
        <StoreContext.Provider value={storeVariables}>
            {props.children}
        </StoreContext.Provider>
    )
}