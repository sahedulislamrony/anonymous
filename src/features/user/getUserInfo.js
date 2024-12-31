import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";


export default async function getUserInfo(username) {

    const userRef = ref(db, "");
    let userInfo = null;
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            userInfo = snapshot.val();

        }
    } catch (err) {
        console.log(err);
    }

    return userInfo;
}