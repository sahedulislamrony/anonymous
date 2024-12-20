
import { get, orderByKey, query, ref } from "firebase/database";

import { db } from "../../firebase.config";

export default async function isNewUser(user) {
    const {username} = user;
    let isNew = true;

    
    const userRef = ref(db, "search/usernames");
    const userQuery = query(userRef, orderByKey());

    try {
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            let obj = snapshot.val();
            let data = Object.values(obj); 
            isNew = !data.some((user) => user.username === username); 
            
        }
    } catch (err) {
        console.log(err);
    }
    


    return isNew;
}
