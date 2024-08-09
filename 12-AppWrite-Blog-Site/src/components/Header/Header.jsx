import React from "react";
import { useNavigate } from "react-router-dom";
import {Container, Logo, LogoutBtn} from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },
        {
            name: "Singup",
            slug: '/singup',
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: "Add Post",
            slug: '/add-post',
            active: authStatus
        },
    ]
    return (
        <div>Header</div>
    )
}

export default Header