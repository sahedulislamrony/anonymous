
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showNavbar } from "../../features/navigation/navSlice";
import { getUser } from "../../features/user/userSlice";
import style from "../../styles/Anonymous.module.scss";
import MessageArea from "../MessageArea";

export default function Anonymous() {
    const dispatch = useDispatch();
    const {userInfo , status} = useSelector((state) => state.user);

    let {username} = useParams();  
    username = username.split("/")[0];     
    username = username.startsWith("@") ? username.slice(1) : username;
    

    useEffect(() => {
        dispatch(getUser(username));
    }, [dispatch, username]);
    

    useEffect(() => {
        dispatch(showNavbar(false));
        return () => {
            dispatch(showNavbar(true));
        };

    }, [dispatch]);

   



    return (
        <>
            {status === "loading" && (
                <Loader />
            )}
    
            {status === "success" && userInfo && <ValidUser />}
    
            {status === "error" && !userInfo && (
                <InValidUserID />
            )}
        </>
    );

}

function ValidUser() {
    const navigate = useNavigate();
    return (
        <div className={style.anonymous}>     
            <MessageArea  />
            <Button 
                onClick={()=> navigate("/login") }
                text = "get anonymous message"
            />

            <div className={style.info}>
                <p className={style.info__text}>
                Your privacy, your rules. Control your anonymous messages with Anonymous.me
                </p>
            </div>
        </div>
    );
}


function InValidUserID() {
    const navigate = useNavigate();
    return (
        <div className={style.invalidUser}>
            <div className={style.img}>
                <img src="/userNotFound.svg" alt="404 | User not found!" />
            </div>
            <h2 className={style.error}>404 | User not found!</h2>
            <div className={style.button} onClick={() => navigate("/login")}>
                <div className={style.bg}></div>
                <button className={style.btn} type="button"> Get Anonymous Message </button>
            </div>
        </div>
    );
}



function Button({onClick , text}) {
    return (
        <div className={style.button}  onClick={onClick}>
            <div className={style.bg}></div>
            <button className={style.btn} type="button">{text}</button>
        </div>
    );

}


function Loader() {
    const loader = ["loader.svg" , "loop.svg"];
    const index = Math.floor(Math.random() * loader.length);
    const loaderSVG = loader[index];
    return (
        <div className={style.loading}>
            <div className={style.loader}>
                <img src={`/${loaderSVG}`} alt="Loading..." className={style.img} />
            </div>
        
        </div>
    );
}
