
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../../styles/Message.module.scss";
import getRelativeTime from "../../utils/getRelativeTime";
import ActionButtons from "../ActionButtons";
import MessageCard from "../MessageCard";
export default function Message() {

    const navigate = useNavigate();
    const {  state } = useLocation();
    const { uid } = useSelector((state) => state.auth.user);

    if(!state)  navigate("/404");

    const   {data ,  flow } = state;

    if(!data || !flow) navigate("/404");

    const { msg , timestamp  , id } = data;
    const {date , time} = getRelativeTime(timestamp , true);

    const msgdata = {
        msg,
        date,
        time,
    };

    const actionData = {
        id ,
        uid,
    };

    
    return (
        <div className={style.inbox}>
            <div className={style.message}>
                <MessageCard data={msgdata} />
                <ActionButtons data={actionData} />
            </div>
        </div>
    );

}