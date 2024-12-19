
import { useSelector } from "react-redux";
import style from "../styles/ProfileInfo.module.scss";

export default function ProfileInfo() {

    const {user} = useSelector((state) => state.auth);

    const { displayName , photoURL } = user;

    return (
        <>
            <div className={style.profile__avatar}>
                <div className={style.wrapper}>
                    <img src={photoURL} alt="avatar" />
                </div>
            </div>
            <div className={style.profile__info}>
                <h2 className={style.text}>{displayName}</h2>
            </div>
        </>
   
    );
}