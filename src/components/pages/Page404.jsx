import { useNavigate } from "react-router-dom";
import style from "../../styles/Page404.module.scss";

export default function Page404() {
    const navigate = useNavigate();
  
    return (
        <div className={style.notFound}>
            <div className={style.img}>
                <img src="/userNotFound.svg" alt="404 | User not found!" />
            </div>
            <h2 className={style.error}>404 | Page not found!</h2>
            <div className={style.button} onClick={() => navigate("/login")}>
                <div className={style.bg}></div>
                <button className={style.btn} type="button"> Get Anonymous Message </button>
            </div>
        </div>
    );
}