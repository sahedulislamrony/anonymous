import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { isNewUser, signNewUser } from "../../api/auth/user";
import { writeSysLog } from "../../api/sysLog";
import { deleteUserAccount, login } from "../../features/auth/authSlice";
import { setPopup } from "../../features/popup/popupSlice";
import style from "../../styles/Login.module.scss";
import Error from "../Error";
import LoginMethod from "../LoginMethod";
import Popup from "../Popup";
export default function Login() {
    const { user, isLoading, isValidUser, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        async function validateUser() {
            

            if (user && isValidUser) {
                const isNew = await isNewUser(user);
                if(isNew) { 
                    await signNewUser(user);
                    navigate("/");
                    writeSysLog("user", user , "New User Signed" , user.isVerified);
                    return;
                }
                
                navigate("/");
                return;
            }

            
            if (user && !isValidUser) {   
                dispatch(setPopup(true));
                await writeSysLog("Unauthorized", user , "Attempt to sign in" );
                dispatch(deleteUserAccount());
                return;    
            }
            if (error) {
                dispatch(setPopup(true));
                return;
            }
            
        }

        validateUser();
    }, [user, isValidUser, error, navigate, dispatch]);

   
  
    async function handleLogin() {
        await dispatch(login());
    }

    return (
        <>
            { !user && <div className={style.login}>
                <LoginMethod text="Login with Google" method="google" onClick={handleLogin} isDisabled={isLoading} />
                <LoginMethod text="Anonymous Instance" method="anonymous" isDisabled={true} />
            
                { !error && !isValidUser && <Popup>
                    <Error title="Access Denied!" text="You are not authorized to access this app." />
                </Popup>
                }

                {error && <Popup onClose={() => window.location.reload()}>
                    <Error title="Error!" text="There was an error loging into your account." />
                </Popup>
                }

            </div>}

            {user && isValidUser && <Navigate to="/" />}

        </>
    );
}
