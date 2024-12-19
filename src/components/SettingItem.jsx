import style from "../styles/SettingItem.module.scss";


export default function SettingItem({icon , label , action , danger , onClick}) {

    const item = danger ? `${style.item} ${style.danger}` : style.item;

    return (
        <div className={item} onClick={onClick}>
            <div className={style.iconL}>
                <div className={style.wrapper}>
                    <div className={style.icon}>
                        <span className="material-symbols-outlined">
                            {icon}
                        </span>
                    </div>
                
                </div>
           
            </div>
            <div className={style.text}>
                <p className={style.p}>{label}</p>
            </div>
            <div className={style.iconR}>
                {action && <div className={style.wrapper}>
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                </div>}
            
            </div>
        </div>
    );
}