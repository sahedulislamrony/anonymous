import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove } from "../features/data/dataSlice";
import style from "../styles/ActionButtons.module.scss";
export default function ActionButtons({actionData}) {

    const {msgID , uid} = actionData;

    const navigate = useNavigate();
    const dispatch = useDispatch();


    async function handleDelete() {
        // add a confirmation dialog 
        const response = await dispatch(remove({msgID, uid}));
        if(response.payload.status === "ok") {
            navigate("/inbox" , { replace: true });
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