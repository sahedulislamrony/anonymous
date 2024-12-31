import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetError } from "../features/auth/authSlice";
import style from "../styles/ChangeUsername.module.scss";

export default function ChangeUsername() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // local ststes 
    const [username, setUsername] = useState("");
    const [validity, setValidity] = useState({
        error: false,
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
      
    async function handleUsername(e) {
        e.preventDefault();
        // reset error
        setValidity({error: false, message: ""});
        
        const trimmedUsername = username.trim();
        const validationError = validateUsername(trimmedUsername);
        
        if (validationError) {
            setValidity({
                error: true,
                message: validationError,
            });
            return;
        }
        
        // Check if username already exists
        // if (usernames?.includes(trimmedUsername)) {
        //     setValidity({
        //         error: true,
        //         message: "Username already exists.",
        //     });
        // return;
        // }
        // if (reservedUsernames.includes(trimmedUsername)) {
        //     setValidity({
        //         error: true,
        //         message: "Username is reserved.",
        //     });
        //     return;
        // }
        
        // Proceed with updating username
       
        try { 
            setIsLoading(true);
            // const data = {
            //     ...user,
            //     username: trimmedUsername,
            // };
            // await Promise.all([
            //     dispatch(updateProfile(data)),
            //     loadingEffect(1500),
            // ]);
            setIsLoading(false);
            dispatch(resetError({target: "login"}));
            navigate("/");
        }
        catch(err){
            setIsLoading(false);
            console.log(err);
            setValidity({
                error: true,
                message: "Something went wrong. Please try again.",
            });
        }

        return;
    }
    
    return (
        <div className={style.username}>
            
            <form className={style.form} onSubmit={handleUsername} onChange={()=> setValidity({error: false, message: ""})}>
                
                
                <div className={style.input}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        id="username" 
                        value={username}
                        placeholder="Set a username" 
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div className={style.error}>
                    <p>{validity.message}</p>
                </div>
                <Button
                    text={!isLoading ?"Submit" : ""}
                    onClick={handleUsername}
                    isLoading={isLoading}
              
                />
            </form>

            <p className={style.p}>Usernames can only be updated once every 30 days. You cannot change your username within 30 days of the last update.</p>
        </div>
    );

}


function validateUsername(handle) {
    
    if (handle !== handle.toLowerCase()) {
        return "Username must be in lowercase.";
    }

    if (handle.length < 4) {
        return "Username must be at least 4 characters long.";
    }

    if(handle.length > 15){
        return "Username must be at most 15 characters long.";
    }
      
    if (!/^[a-z0-9_.-]+$/.test(handle)) {
        return "Username can only contain letters, numbers, underscores (_), hyphens (-) and dots(.).";
    }

    if (/^[\d.-]/.test(handle)) {
        return "Username cannot start with a number, a hyphen, or a dot.";
    }

    if (/[-.]$/.test(handle)) {
        return "Username cannot end with a hyphen or a dot.";
    }

    return null;
}



function Button({onClick , text  , isLoading }){

    const loader = ["loader.svg" , "loop.svg"];
    // const index = Math.floor(Math.random() * loader.length);
    const index = 0;
    const loaderSVG = loader[index];
    return (
        <div className={style.button} onClick={onClick}  >
            <div className={style.bg}></div>
            <div className={style.content}>
              
                { isLoading && <div className={style.loader}>
                    <img src={`/${loaderSVG}`} alt="" className={style.img} />
                </div>}
                <button className={style.btn} type="submit" disabled={isLoading}>{text}</button>
            </div>
            
        </div>
    );

}


// async function loadingEffect(time) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, time || 1000);
//     });
// }