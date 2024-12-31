import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";

export default async function getUserData(uid) {
 
    let userData = null;

    const userRef = ref(db, ""); // ref of user data 

    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            userData = snapshot.val();
        }
    } catch (err) {
        console.log(err);
    }

    return userData;
}