
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopup } from "../features/view/viewSlice";
import style from "../styles/Confirmation.module.scss";

export default function Confirmation({title,msg , btnText, isDanger = false , action = () => {} }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        try {
            setIsLoading(true);
            await action();
            setIsLoading(false);
            dispatch(setPopup(false));

        }
        catch(err) {
            console.log(err);
            setIsLoading(false);
        }
        
    }

    return (
        <>
            {!isLoading && 
           <div className={style.confirmation}>
               <h2 className={style.title}>{title}</h2>
               <div className={style.wrapper}>
                   <p className={style.msg}>{msg}</p>
                   <div className={style.btnGroup}>
                       <button type="button" className={`${style.btn} `} onClick={() => dispatch(setPopup(false))}>Cancel</button>
                       <button type="button" className={`${style.btn} ${isDanger ? style.danger : style.safe}`} onClick={handleClick}>{btnText}</button>
                   </div>
               </div>
           </div>}

            { isLoading &&
            <div className={style.confirmation}>
                <h2 className={style.title}>Processing...</h2>
                <div className={style.wrapper}>
                    <div className={style.processing}>
                        <div className={style.loader}>
                            <img src="/loader.svg" alt="Loading..." className={style.img} />
                        </div>
                    </div>
                </div>
            </div>

            }
        
        </> 
    );
}

