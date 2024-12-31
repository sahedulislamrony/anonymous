import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove } from "../features/data/dataSlice";
import { setPopup } from "../features/view/viewSlice";
import style from "../styles/ActionButtons.module.scss";
import Confirmation from "./Confirmation";
import Popup from "./Popup";

export default function ActionButtons({actionData}) {

    const {msgID , uid} = actionData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { showPopup } = useSelector(state => state.view);


    async function handleDeleteAction() {
        const response = await dispatch(remove({msgID, uid}));
        if(response.payload.status === "ok") {
            navigate("/inbox" , { replace: true });
        }
        else {
            console.log("Error deleting message");
        }

    }

    function handleDelete() {
        dispatch(setPopup(true));
    }
    
    return (
        <>
            <div className={style.actions}>
                <Item className={style.reply} icon="reply" />
                <Item className={style.download} icon="download_2" />
                <Item className={style.delete} icon="delete" onClick={handleDelete} />

            </div>

            {
                showPopup && <Popup >
                    <Confirmation 
                        title="Delete Message"
                        msg="This action is permanent and cannot be undone!"
                        btnText="Delete"
                        action={()=> handleDeleteAction()}
                        isDanger={true}
                    />
                </Popup>
            }

        </>
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