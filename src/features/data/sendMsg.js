
import { push, ref } from "firebase/database";
import { db } from "../../firebase.config";

export default async function sendMsg(userData) {

    const {uid , msg} = userData;
    let error = null;
    let status = "ok";
    
    const data = {
        msg,
        timestamp: Date.now(),
        isUnread: true,
    };
    
    const msgRef = ref(db, `messages/${uid}`);
    try {
        await push(msgRef, data);
    } catch (err) {
        error = err.message;
        status = "error";
    }

    return {
        status,
        error,
    };
}