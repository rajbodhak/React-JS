import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import { Outlet } from "react-router-dom";


function Layout() {
    return(
        <>
           <Header/>
            <Outlet/>
           <Footer/>
        </>
    )
}

export default Layout;