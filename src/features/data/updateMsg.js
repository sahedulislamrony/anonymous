import { ref, update } from "firebase/database";
import { db } from "../../firebase.config";

export default async function updateMsg(msgID, UID , isUnread){

    let response = {
        status: "ok",
        error: null,
    };
 

    try {
        await update(ref(db, ""), {
            isUnread,
        });


    } catch (error) {
        console.error(error);
        response = {
            status: "error",
            error: error.message,
        };
    }

    return response;
};