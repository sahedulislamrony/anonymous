
import style from "../styles/LoginMethod.module.scss";
export default function LoginMethod({text,method , isDisabled = false, onClick}) {
    const methodClass = isDisabled ? `${style.disabled} ${style.method}`: style.method;

    return (
        <div className={methodClass} onClick={onClick}>
            <div className={style.content}>
                <div className={style.logo}>
                    <div className={style.img}><img src={`/${method}.png`} alt={`Login with ${method}`}/></div>
                </div>
                <div className={style.text}>{text}</div>
            </div>
        </div>
    );


}