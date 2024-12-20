
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "../styles/MessageCard.module.scss";
export default function MessageCard({messageData , link }) {

    const {msg , time , date } = messageData || {};

    return (
      
        <div className={style.content}>
            <div className={style.title}>
                <h1>send me anonymous message</h1>
            </div>
            <div className={style.main}>
                { messageData && 
                <p className={style.text}>
                    {msg}
                </p>
                }

                {link && <HomeActionCard  link={link} />}
            </div>
            <div className={style.meta}>
                {messageData && <p>{`Anonymous - ${date} at ${time}`}</p>
                }
            </div>

            
        </div>
        
    );

}

function HomeActionCard({link}){

    const {user} = useSelector((state) => state.auth);
    const {username} = user;
    const {host} = window.location;

    if(link === "root"){
        link = `${host}/${username}`;
    }

    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to copy: ", err);
            setCopied(false);
        }

    };
    return (
        <div className={style.link}>

                   
            <div className={style.linkText}>
                <span className="material-symbols-outlined">
            link
                </span>
                <span>
                    {
                        link.length > 30 ? link.substring(0,30) + "..." : link
                    }
                </span>
            </div>

            <div className={style.btn} onClick={copyToClipboard}>
                <div className={style.wrapper}>
                    {!copied &&<>
                        <span className="material-symbols-outlined">
                           content_copy
                        </span>
                        <span className={style.text}>copy </span>
                    </> 
        
                    }

                    {copied && <>
                        <span className="material-symbols-outlined" style={{color:"#17fa00",fontSize:"2rem"}}>
                               check
                        </span>
                        <span className={style.text}>copied! </span>
                    </>
                    }
    
                </div>
 
            </div>
        </div>
    );
}