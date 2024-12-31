import { useState } from "react";
import style from "../styles/MessageArea.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { send } from "../features/data/dataSlice";

export default function MessageArea() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo: user} = useSelector((state) => state.user);
    const { username , photoURL , isVerified , uid } = user || {};
    const title = `@${username}`;

    //  local states of form
    const [message , setMessage] = useState("");
    const [status , setStatus] = useState("idle"); // idel , loading , error , success

    async function handleSubmit(e) {
        e.preventDefault();
        let msg = message.trim();
        if(msg.length === 0) {
            setStatus("error");
            return;
        }

        try {
            setStatus("loading");

            // send message
            const [response] = await Promise.all([dispatch(send({uid , msg })),loadingEffect(800)]);
            if (response.payload.status === "error") {
                throw new Error(response.error);
            } 
            
            
            setStatus("success");
            navigate(`/${username}/msg-sent` , { state : { flow : true }});
        } catch (err) {
            setStatus("error");
            console.log(err);
        }

    }

  
    return (
        <form className={style.form}>   
            <div className={style.formGroup}>
                <div className={style.label}>
                    <div className={style.profilePic}>
                        <img src={photoURL} alt="Prifile pic of the recever" className={style.img} />
                    </div>
                    <div className={style.text}>
                        <div className={style.username}>
                            <p className={style.text}>{title}</p>
                            {isVerified && <Badge name="verified" />}
                            {/* {isAnonymous && <Badge name="report" />} */}
                            
                        </div>

                        <h5 className={style.meta}>Send me anonymous message!</h5>
                    </div>
                    
                   
                    
                </div>
                
                <div className={style.input}> 
                    <div className={style.bg}></div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} spellCheck="false" name="msg" id="msg"  placeholder="Type your message here..."></textarea>
                </div>
            </div>
            
            <Button 
                text = {status === "loading" ? "Sending..." : "Send Anonymous Message"}
                type="submit"
                isLoading={status === "loading"}
                onClick={handleSubmit}
            />
            

        </form>

    );

}

function Badge({name}) {
    return (
        <div className={`${style.badge} ${style[name]}`}>
            <span className="material-symbols-outlined">
                {name}
            </span>
        </div>
    );
}



function Button({onClick , text , type , isLoading }) {

    const loader = ["loader.svg" , "loop.svg"];
    // const index = Math.floor(Math.random() * loader.length);
    const index = 0;
    const loaderSVG = loader[index];
    return (
        <div className={style.formGroup} onClick={onClick} role="button">
            <div className={style.button}  >
                <div className={style.bg}></div>
                <div className={style.content}>
              
                    { isLoading && <div className={style.loader}>
                        <img src={`/${loaderSVG}`} alt="" className={style.img} />
                    </div>}
                    <button className={style.btn} type={type}>{text}</button>
                </div>
            </div>
        </div>
    );

}


async function loadingEffect(time) {
    // time in ms
    await new Promise((resolve) => setTimeout(resolve , time || 1000));
}
