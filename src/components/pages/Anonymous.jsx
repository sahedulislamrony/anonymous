
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../features/user/userSlice";
import { setHeader } from "../../features/view/viewSlice";
import style from "../../styles/Anonymous.module.scss";
import MessageArea from "../MessageArea";

export default function Anonymous() {
    const dispatch = useDispatch();
    const {userInfo , status} = useSelector((state) => state.user);
    const { isLinkActive } = userInfo || false;
    let {username} = useParams();  
    username = username.split("/")[0];     
    username = username.startsWith("@") ? username.slice(1) : username;
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUser(username));
        if(user) {
            dispatch(setHeader({status: true, text: `@${username}`}));
        }
        return () => {
            dispatch(setHeader({status: false}));
        };

    }, [dispatch, username, user]);
    




    return (
        <>
            {status === "loading" && (
                <Loader />
            )}
    
            {status === "success" && userInfo && isLinkActive && <ValidUser />}
    
            {(status === "error"  || !userInfo  || !isLinkActive) && (
                <InValidUserID />
            )}
        </>
    );

}

function ValidUser() {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth);


    return (
        <div className={style.anonymous}>     
            <MessageArea  />
            {!user && <Button 
                onClick={()=> navigate("/login") }
                text = "get anonymous message"
            />}
        </div>  
    );
}


function InValidUserID() {
    const navigate = useNavigate();
    return (
        <>
            <div className={style.invalidUser}>
                <h2 className={style.error}>404 | User not found!</h2>
                <div className={style.button} onClick={() => navigate("/login")}>
                    <div className={style.bg}></div>
                    <button className={style.btn} type="button"> Get Anonymous Message </button>
                </div>
            </div>
        </>
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
        <>
            <div className={style.loading}>
                <div className={style.loader}>
                    <img src={`/${loaderSVG}`} alt="Loading..." className={style.img} />
                </div>
               
            </div>
        </>
    );
}


