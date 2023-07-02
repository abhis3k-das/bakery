import {createContext, useState} from "react"

export const UserContext = createContext({
	accessToken: "",
	user: "",
	setAccessToken: () => {},
	setUser: () => {},
})
export const UserContextProvider = (props) => {
	const [accessToken, setAccessToken] = useState("")
	const [user, setUser] = useState("")
	return (
		<UserContext.Provider
			value={{
				accessToken,
				user,
				setAccessToken,
				setUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}
