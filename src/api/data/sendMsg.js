
import { getDatabase, push, ref } from "firebase/database";


export default async function sendMsg(uid, msg) {
    let error = null;
    let status = "ok";
    
    const data = {
        msg,
        timestamp: Date.now(),
        isUnread: true,
    };
    
    const db = getDatabase();
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