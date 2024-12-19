import { getDatabase, ref, update } from "firebase/database";

export default async function updateMsg(UID, msgID,status){
 
    const db = getDatabase();

    try {
        await update(ref(db, `messages/${UID}/${msgID}`), {
            isUnread: status,
        });
    } catch (error) {
        console.error(error);
    }
};