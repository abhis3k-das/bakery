import {createContext, useEffect, useState, useContext} from "react"
import axios from "axios"
import {UserContext} from "./user-context"
export const StoreContext = createContext({
	addToCart: (selectedItem, quantity, message, selectedWeight) => {},
	removeFromCart: (removeItemId) => {},
	cartItems: [],
	setCartItems:()=>{},
	products: [],
	setProducts: () => {},
	totalCost: 0,
	slider:undefined,
	setSlider:()=>{},
})
export const StoreProvider = (props) => {
	const [cartItems, setCartItems] = useState([])
	const [total, setTotal] = useState(0)
	const [products, setProducts] = useState([])
	const [slider, setSlider] = useState(undefined)
	const user = useContext(UserContext)
	useEffect(() => {
		setTotal(0)
		for (let i = 0; i < cartItems.length; i++) {
			setTotal((prev) => {
				return prev + cartItems[i].selectedItem.price[cartItems[i].selectedWeight] * cartItems[i].quantity
			})
		}
		const saveToUserDb = async () => {
			if (user.user) {
				try {
					const response = await axios.put(
						`${process.env.REACT_APP_BASE_URL}/updateCart`,
						{
							user_Id: user.user,
							cart_items: cartItems,
						},
						{
							headers: {
								"Content-Length": "application/json",
								Authorization: `Bearer ${user.accessToken}`,
							},
							withCredentials: true,
						}
					)
					console.log(response)
				} catch (e) {
					console.log(e)
				}
			}
		}
		saveToUserDb()
	}, [cartItems,user.user,user.accessToken])
	useEffect(() => {
		const getCart = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getCart/${user.user}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
					withCredentials: true,
				})
				console.log(response.data.cart_items)
                setCartItems(response.data.cart_items)
			} catch (e) {
				console.log(e)
			}
		}
		getCart()
	}, [user.user,user.accessToken])
	const storeVariables = {
		addToCart: (selectedItem, quantity, message, selectedWeight, cakeMessage) => {
			setCartItems((prev) => {
				let found = false
				let temp = prev.map((each) => {
					if (each.itemId === selectedItem._id && each.selectedWeight === selectedWeight) {
						found = true
						return {
							itemId: each.itemId,
							message: each.message,
							cakeMessage: each.cakeMessage,
							selectedWeight: each.selectedWeight,
							selectedItem: each.selectedItem,
							quantity: quantity,
						}
					} else {
						return each
					}
				})
				if (!found) {
					temp.push({
						quantity: quantity,
						itemId: selectedItem._id,
						message: message,
						cakeMessage: cakeMessage,
						selectedWeight: selectedWeight,
						selectedItem: selectedItem,
					})
				}
				return temp
			})
		},
		removeFromCart: (removeItemId) => {
			setCartItems((prev) => {
				return prev.filter((each) => each.itemId !== removeItemId)
			})
		},
		cartItems: cartItems,
		totalCost: total,
		products: products,
		setProducts: setProducts,
		slider:slider,
		setSlider:setSlider,
		setCartItems:setCartItems,
	}
	return <StoreContext.Provider value={storeVariables}>{props.children}</StoreContext.Provider>
}
