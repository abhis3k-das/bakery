import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

function MainOutlet() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
export default MainOutlet;