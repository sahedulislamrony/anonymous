import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetError } from "../../features/auth/authSlice";
import { setPopup } from "../../features/view/viewSlice";
import style from "../../styles/Login.module.scss";
import ChangeUsername from "../ChangeUsername";
import Error from "../Error";
import LoginMethod from "../LoginMethod";
import Popup from "../Popup";

export default function Login() {
    const { user  , isNew  } = useSelector((state) => state.auth);
    const { status, error } = useSelector((state) => state.auth.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // local state
    const [showUsername, setShowUsername] = useState(false);
    const [anonymous, setAnonymous] = useState(false);

    // hide nav
    useEffect(() => {
        return () => {
            dispatch(resetError({target: "login"}));
        };
    
    }, [dispatch]);

    // handle user login
    useEffect(() => {
    
        (async function validateUser() {
           
            if(user && status === "success" && isNew){
                setShowUsername(true);     
            }
            else if(user && (status === "success" || status === "idle")&& !isNew){
                // reset error
                dispatch(resetError({target: "login"}));
                navigate("/");
            }

            if(error) {
                dispatch(setPopup(true));
                return;
            }
            
        })();

    }, [user,isNew, error, status, navigate, dispatch]);

   
  
    async function handleLogin() {
        await dispatch(login());
    }

    function handleAnonymous() {
        setAnonymous(true);
        dispatch(setPopup(true));
        
    } 

  
    
    return (
        <>
            {/* Login Methods */}
            { !user && status != "success" &&
            <>
                <div className={style.login}>
                    <LoginMethod text="Login with Google" method="google" onClick={handleLogin} isDisabled={status === "loading"} />
                    <LoginMethod text="Anonymous Instance" method="anonymous" isDisabled={status === "loading"} onClick={handleAnonymous} />

                </div>
                <p className={style.text}>By signing in you agree to our <a href="https://github.com/sahedulislamrony/anonymous/blob/main/Terms-of-service.md" target="_blank" className={style.link}>Terms of Service</a> and <a href="https://github.com/sahedulislamrony/anonymous/blob/main/Privacy-policy.md" className={style.link} target="_blank">Privacy Policy.</a></p>
            </>
            }

            {/* error popup */}
            {error && <Popup onClose={()=>  dispatch(resetError({target: "login"}))}>
                <Error title="Error!" text="There was an error loging into your account." />
            </Popup>
            }

            {anonymous && <Popup onClose={()=>  setAnonymous(false)}>
                <Error title="Coming Soon!" text="This feature is currently under development and will be available soon. Thank you for your patience!" />
            </Popup>
            }

            {/* set username  */}

            {
                user && status === "success" && isNew && showUsername && 
                <ChangeUsername />

               
            }


        </>
    );
}

