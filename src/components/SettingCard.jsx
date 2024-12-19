import style from "../styles/SettingCard.module.scss";

export default function SettingCard({icon,label,children , danger}) {
    const card = danger ? `${style.card} ${style.danger}` : style.card;
    return (
        <div className={card}>
            <div className={style.header}>
                <div className={style.icon}>
                    <span className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
                <h2 className={style.text}>{label}</h2>
            </div>
            <div className={style.body}>
                {children}
            </div>
        </div>
    );
}




