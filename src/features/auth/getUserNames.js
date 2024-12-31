import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";


export default async function getUserNames() {

    const userRef = ref(db, ""); 
    let usernames = null;
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            usernames = snapshot.val();
            // get only usernames
            
            usernames = Object.values(usernames).map((user) => user.username);
           

        }
    } catch (err) {
        console.log(err);
    }

    return usernames;
}