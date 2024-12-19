import style from "../styles/Error.module.scss";

export default function Error({title,text}) {
    return (
        <div className={style.error}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.text}>{text}</p>
        </div>
    );
}