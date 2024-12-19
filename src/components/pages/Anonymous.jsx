
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/auth/user";
import { showNavbar } from "../../features/navigation/navSlice";
import style from "../../styles/Anonymous.module.scss";
import MessageArea from "../MessageArea";

export default function Anonymous({username}) {
    const dispatch = useDispatch();
    const [data , setData] = useState(null);
    const [status , setStatus] = useState("idle");  // idle, loading, success, error
    

    useEffect(() => {
        dispatch(showNavbar(false));

        (async () => {

            try {
                setStatus("loading");
                const userInfo = await getUserInfo(username);

                if(!userInfo) {
                    setStatus("error");
                    document.title = "User not found | Anonymous";
                    return;
                }
                setData(userInfo);
                setStatus("success");
                document.title = `@${username} | Anonymous`;
            }catch(error) {
                setStatus("error");
                console.error(error);
                document.title = "User not found | Anonymous";
            }
           
        })();
        return () => {
            dispatch(showNavbar(true));
        };
        

    }, [ dispatch, username]);

    




   



    return (
        <>
            {status === "loading" && (
                <Loader />
            )}
    
            {status === "success" && data && <ValidUser data={data} />}
    
            {status === "error" && (
                <InValidUserID />
            )}
        </>
    );

}

function ValidUser({data}) {
    const navigate = useNavigate();
    return (
        <div className={style.anonymous}>     
            <MessageArea  user={data} />
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

function InValidUserID() {
    const navigate = useNavigate();
    return (
        <div className={style.invalidUser}>
            <img src="/userNotFound.svg" alt="404 | User not found!" />
            <h2 className={style.error}>404 | User not found!</h2>
            <div className={style.button} onClick={() => navigate("/login")}>
                <div className={style.bg}></div>
                <button className={style.btn} type="button"> Get Anonymous Message </button>
            </div>
        </div>
    );
}

