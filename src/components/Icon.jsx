import style from "../styles/Icon.module.scss";
export default function Icon({ name ,text , isActive}) {
    const activeStyle = isActive ? `${style.active} ${style.li}`: style.li;

    return (
        <li className={activeStyle}>    
            <div className={style.item}>
                <div className={style.icon}>
                    <span className="material-symbols-outlined">
                        {name}
                    </span>
                </div>
                <h4 className={style.text}>{text}</h4>
            </div>
        </li>
    );

}