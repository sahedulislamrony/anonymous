import style from "../styles/Layout.module.scss";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";


import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const {pathname} = useLocation();
    const isLogin = pathname === "/login";
    const {user} = useSelector((state) => state.auth);
    return (
        <section className={style.wrapper}>
            <div className={style.app}>
                <div className={style.main}>
                    <Header  />
                    <div className={style.content}>
                        {children}
                        
                        {!user && !isLogin  && <Footer />}
                    </div>
                   
                    {user && <Navbar />}
                </div>
            </div>
        </section>
    );
}