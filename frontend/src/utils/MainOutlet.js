import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import styles from './MainOutlet.module.css';
import { useEffect,useContext } from "react";
import axios from 'axios'
import {UserContext} from '../Context/user-context'
function MainOutlet() {
    const store = useContext(UserContext);
    useEffect(()=>{
        const checkForLoggedInUser = async()=>{
            try{
                const response = await axios.get(
                    "http://localhost:8000/refresh",
                    {
                        headers:{
                            'Content-Type':'application/json',
                        },
                        withCredentials:true,
                    }
                    )
                store.setUser(response.data.user)
                store.setAccessToken(response.data.accessToken);
            }catch(e){
                console.log("This error is thrown at MainOutlet/UseEffect",e)
                store.setUser("");
                store.setAccessToken("");
            }
        }
        checkForLoggedInUser();
    },[])
    return (
        <>
            <div className={styles['mainOutlet']}>
                <Outlet />
            </div>
            <Footer/>
        </>
    )
}
export default MainOutlet;