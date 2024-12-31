import style from "../styles/SettingItem.module.scss";



export default function Item({icon , text , danger = false , onClick}) {
    const item = danger ? `${style.item} ${style.danger}` : style.item;
    return (
        <div className={item} onClick={onClick} >
            <div className={style.bg}></div>

            <div className={style.group}>

                <div className={style.icon}>
                    <span className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
                <button className={style.btn} type="button">{text}</button>
            </div>
        </div>

    );
}
