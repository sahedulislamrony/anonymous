import { getDatabase, push, ref } from "firebase/database";





export async function writeSysLog(role,data , message , isVerified = false) {
    const db = getDatabase();
    const path = isVerified ? "syslog/verified" : "syslog/unverified";
    const logRef = ref(db, path);
    const  log = {
        role,
        info : data,
        message,
        meta: {
            timestamp: Date.now(),
            message: "System Log",
            
        },
    };
    try {
        await push(logRef, log);
    } catch (err) {
        console.log(err);
    }
}