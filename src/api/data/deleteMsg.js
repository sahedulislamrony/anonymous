import { getDatabase, ref, remove } from "firebase/database";

export default async function deleteMsg(UID , msgId) {
    let status = false;
    const db = getDatabase();
    const msgRef = ref(db, `messages/${UID}/${msgId}`);
    try {
        await remove(msgRef);
        status = true;
    }
    catch (error) {
        console.error("Error deleting message: ", error);
    }

    return status;
}