import { Link } from "react-router-dom";
import style from "../styles/Navbar.module.scss";
import Icon from "./Icon";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

export default function Navbar() {

    const {pathname} = useLocation();
    const pathLength = pathname.split("/").length;
    let path = pathname.split("/")[1];
    path = path === "" ? "home" : path;
    const isActive = (link) => link === path;

    // blur effect
    const [isBlur, setIsBlur] = useState(false);

    const navRef = useRef(null);

    useEffect(() => {  
        const nav = navRef.current;
        const links = nav?.querySelectorAll("a");
        
        links?.forEach((link) => {
            // Prevent right click | long press context menu
            link.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });
        }); 

    }, []);

    // blur effect 

    useEffect(() => {
        if(path === "inbox"){
            setIsBlur(true);
            return () => {
                setIsBlur(false);
            };
        }

    }, [path, pathLength]);


    return (
        <nav className={isBlur ? `${style.blur} ${style.nav}` : style.nav} ref={navRef}>
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