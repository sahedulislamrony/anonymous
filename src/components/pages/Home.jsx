import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Home.module.scss";
import Profile from "../Profile";


export default function Home() {

    const { user } = useSelector(state => state.auth);
    if (user) {
        return <Profile />;
    }
    const navigate = useNavigate();
   
    
    return(
        <div className={style.home}>
            <h1 className={style.title}>
            Welcome <span className="material-symbols-outlined">
            star
                </span>
            </h1>
            <p className={style.text}>Get anonymous message from </p>
            <p className={style.text2}>&quot;You don&apos;t know who!&quot;</p>
       
            <div className={style.button} onClick={() => navigate("/login")}>
                <div className={style.bg}></div>
                <button className={style.btn} type="button"> Get Anonymous Message </button>
            </div>
        </div>
    );
}