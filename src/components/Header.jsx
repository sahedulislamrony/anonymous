import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import style from "../styles/Header.module.scss";

export default function Header() {

    const {user} = useSelector((state) => state.auth);
    const username = user?.username;
    const [text, setText] = useState("Anonymous");
    const {pathname } = useLocation();
    
    

    
    useEffect(() => {
        let path = pathname.split("/"); 
        const header = path[1];
        setText(header.charAt(0).toUpperCase() + header.slice(1));

        if(header == ""  || header == username && user){
            setText(`@${username}`);
        }else if(!user && header !== "login" && header !== "404"){
            setText("Anonymous");
        } else if(path.length === 3){
            setText("Message");
        }
        

    }, [pathname, user, username]);
    return (
        <header className={style.header}>
            <div className={style.logo}>
                {/* <div class="logoImg">

                <img src="/img/logo.png" alt="logo" />
                </div>*/}
                <h2 className={style.logoTxt}>{ text}</h2>
            </div>

        </header>
    );


}