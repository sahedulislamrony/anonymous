import { useNavigate } from "react-router-dom";
import deleteMsg from "../api/data/deleteMsg";
import style from "../styles/ActionButtons.module.scss";
export default function ActionButtons({data}) {

    const navigate = useNavigate();

    const {id , uid} = data;

    async function handleDelete() {
        // add a confirmation dialog 
        const status = await deleteMsg(uid , id);
        if(status) {
            navigate("/inbox");
        }
        else {
            console.log("Error deleting message");
        }

    }
    
    return (
        <div className={style.actions}>
            <Item className={style.reply} icon="reply" />
            <Item className={style.download} icon="download_2" />
            <Item className={style.delete} icon="delete" onClick={handleDelete} />

        </div>
    );

}


function Item({className, icon , onClick} ){
    return (
        <div className={`${style.item} ${className}`} onClick={onClick}>
            <div className={style.icon}>
                <div className={style.img}>
                    <span className="material-symbols-outlined">
                        {icon}
                    </span>
                </div>
            </div>
        </div>
    );
}