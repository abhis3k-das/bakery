import { Outlet } from "react-router-dom";
import Header from  '../layouts/Header'
function HeaderOutlet(){
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default HeaderOutlet;