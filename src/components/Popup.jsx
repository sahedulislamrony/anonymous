import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../features/popup/popupSlice";
import style from "../styles/Popup.module.scss";

export default function Popup({children,onClose = null}) {
    
    const dispatch = useDispatch();
    const {showPopup} = useSelector((state) => state.popup);
    let popup = showPopup ? style.popup : `${style.popup} ${style.disabled}`;

    const closePopup = () => {
        onClose && onClose();
        dispatch(setPopup(false));
    };
    return (
        <div className={popup} onClick={closePopup}>
            <div className={style.content}  onClick={(e) => e.stopPropagation()}>
                <div className={style.close} onClick={closePopup}>
                    <div className={style.icon}>
                        <span className="material-symbols-outlined">
                                close
                        </span>
                    </div>
                </div>
                <div className={style.bg}></div>
                <div className={style.main}>
                    {children}
                </div>
            </div>
        </div>
    );
}