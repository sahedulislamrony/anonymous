import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import style from "../../styles/Message.module.scss";
import getRelativeTime from "../../utils/getRelativeTime";
import ActionButtons from "../ActionButtons";
import MessageCard from "../MessageCard";

export default function Message() {
    const { state } = useLocation();
    const { uid } = useSelector((state) => state.auth.user);

    // Validate state and redirect if invalid
    if (!isValidState(state)) {
        return <Navigate to="/404" replace />;
    }
    const { data } = state;
    const { msg, timestamp, msgID } = data;

    // Prepare data for child components
    const messageData = formatMessageData(msg, timestamp);
    const actionData = { msgID, uid };

    return (
        <div className={style.inbox}>
            <div className={style.message}>
                <MessageCard messageData={messageData} />
                <ActionButtons actionData={actionData} />
            </div>
        </div>
    );
}

// Helper function to validate location state
function isValidState(state) {
    return state && state.data && state.flow;
}

// Helper function to format message data
function formatMessageData(msg, timestamp) {
    const { date, time } = getRelativeTime(timestamp, true);
    return { msg, date, time };
}
