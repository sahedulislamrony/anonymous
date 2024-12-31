
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { setHeader } from "../features/view/viewSlice";
import style from "../styles/MessageSent.module.scss";

export default function MessageSent() {

    const navigate = useNavigate();
    const {state}  = useLocation();
    const flow = state?.flow || false;
    const {user} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {

        if(!flow) {
            navigate("/");
        }
    }, [ dispatch , flow , navigate]);

    

    useEffect(() => {
        if(user) {
            const {username} = user;
            dispatch(setHeader({status: true, text: `@${username}`}));
        }
        return () => {
            dispatch(setHeader({status: false}));
        };

    }, [dispatch, user]);
    
    return (
        <>
            <div className={style.container}>
                <div className={style.svg}>
                    <div className={style.icon}>
                        <span className="material-symbols-outlined">
                        done_outline
                        </span>
                    </div>
               
                </div>
                <h2 className={style.text}>Message sent!</h2>

                <div className={style.button} onClick={() => navigate(`${user ? "/": "/login"}`)}>
                    <div className={style.bg}></div>
                    <button className={style.btn} type="button"> {user ? "Back to home" : "Get Anonymous Message" }</button>
                </div>
            </div>
        </>
    );

}