import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../styles/Navbar.module.scss";
import Icon from "./Icon";

import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Navbar() {

    const {showNav} = useSelector((state) => state.view);
    const {pathname} = useLocation();
    let path = pathname.split("/")[1];
    path = path === "" ? "home" : path;
    const isActive = (link) => link === path;


    useEffect(() => {  
        const nav = document.querySelector("nav");
        const links = nav && nav.querySelectorAll("a");
        
        links && links.forEach((link) => {
            // Prevent right click | long press context menu
            link.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });
        }); 

    }, []);

    return (
        showNav && 
        <nav className={style.nav}>
            <ul className={style.list}>
                <Link to="/">
                    <Icon name="home" text="home" isActive={isActive("home")} />
                </Link>
                <Link to="/inbox">
                    <Icon name="mark_unread_chat_alt" text="inbox"   isActive={isActive("inbox")}  />
                </Link>

                <Link to="/settings">
                    <Icon name="settings" text="settings"   isActive={isActive("settings")} />
                </Link>
              
            </ul>
        </nav>
    );

}