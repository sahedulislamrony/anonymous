import { push, ref } from "firebase/database";
import { db } from "../../firebase.config";

export default async function sysLog({action,data , message , isVerified = false}) {
    let state = {
        status: "ok",
        error: null,
    };

    const path = isVerified ? "syslog/verified" : "syslog/unverified";

    const logRef = ref(db, path);
    const  log = {
        action,
        message,
        info : data,
        meta: {
            timestamp: Date.now(),
            message: "System Log",
            
        },
    };
    try {
        await push(logRef, log);
    } catch (err) {
        console.log(err);
        state = {
            status: "failed",
            error: err,
        };
    }


    return state;
}