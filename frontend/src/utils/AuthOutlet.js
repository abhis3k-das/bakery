import { useState } from "react";
import { Navigate, Outlet ,useLocation} from "react-router-dom";

function AuthOutlet(){
    const [rand] = useState(Math.random())
    const location = useLocation();
    return <Outlet/>
    // return (
    //         rand > 0.5
    //          ? <Outlet/> 
    //          : <Navigate to="/login" state={{from : location}} replace></Navigate>
    // )
}
export default AuthOutlet;