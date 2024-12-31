
import { push, ref } from "firebase/database";
import { db } from "../../firebase.config";
import { encryptMessage } from "../../utils/encryption";

export default async function sendMsg(userData) {

    const {uid , msg , PUBLIC_KEY} = userData;
    let error = null;
    let status = "ok";
    const encryptedMsg = await encryptMessage(PUBLIC_KEY, msg);
    
    
    const data = {
        encryptedMsg,
        timestamp: Date.now(),
        isUnread: true,
    };
    
    const msgRef = ref(db, "");
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