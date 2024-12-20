
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNav } from "../features/view/viewSlice";

import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import style from "../styles/MessageSent.module.scss";

export default function MessageSent() {

    const navigate = useNavigate();
    const {state}  = useLocation();
    const flow = state?.flow || false;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNav(false));

        if(!flow) {
            navigate("/");
        }
        return () => {
            dispatch(setNav(true));
        };
    }, [ dispatch , flow , navigate]);
    
    return (
        <div className={style.container}>
            <div className={style.svg}>
                <div className={style.icon}>
                    <span className="material-symbols-outlined">
                        done_outline
                    </span>
                </div>
               
            </div>
            <h2 className={style.text}>Message sent!</h2>

            <div className={style.button} onClick={() => navigate("/login")}>
                <div className={style.bg}></div>
                <button className={style.btn} type="button"> Get Anonymous Message </button>
            </div>
        </div>
    );

}