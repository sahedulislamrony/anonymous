import style from "../styles/Layout.module.scss";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {

    return (
        <section className={style.wrapper}>
            <div className={style.app}>
                <div className={style.main}>
                    <Header  />
                    <div className={style.content}>
                        {children}
                    </div>
                   
                    <Navbar />
                </div>
            </div>
        </section>
    );
}