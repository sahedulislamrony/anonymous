import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import updateMsg from "../api/data/updateMsg";
import style from "../styles/ListItem.module.scss";
import getRelativeTime from "../utils/getRelativeTime";
export default function ListItem({data}) {

    const navigate = useNavigate();
    const { uid } = useSelector((state) => state.auth.user);
    const { msg  , timestamp , isUnread , id  } = data;


    const title = isUnread ? "New Message" : `${msg.length <= 28 ? msg : msg.slice(0,26) + "..."}`;
    const liStyle = isUnread ? `${style.li} ${style.unread}` : style.li;
    const relativeTime = getRelativeTime(timestamp);



    async function handleClick() {
        if(isUnread)
            await updateMsg(uid , id , false);

        navigate(`/inbox/${id.slice(1)}` , { state: { data  , flow: true} });
    }




    return (
        <li className={liStyle} onClick={handleClick}>
            <div className={style.content}>
                <div className={style.icon}>
                    <span className="material-symbols-outlined">
                  mail
                    </span>
                </div>

                <div className={style.msg}>
                    <div className={style.text}>
                        <p>{title}</p>
                    </div>
                    <p className={style.meta}>{relativeTime}</p>
                </div>
            </div>
        </li>
    );
}