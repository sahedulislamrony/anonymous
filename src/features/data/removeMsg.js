import { ref, remove } from "firebase/database";
import { db } from "../../firebase.config";

export default async function removeMsg(msgID , uid) {
    let status = "failed";
    let err = null ;
    const msgRef = ref(db, `messages/${uid}/${msgID}`);
    try {
        await remove(msgRef);
        status = "ok";
    }
    catch (error) {
        console.error("Error deleting message: ", error);
        err = error.message;
    }

    return {
        status,
        err,
    };
}