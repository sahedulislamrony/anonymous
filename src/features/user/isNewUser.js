
import { get, orderByKey, query, ref } from "firebase/database";

import { db } from "../../firebase.config";

export default async function isNewUser(user) {
    let isNew = true;

    
    const userRef = ref(db, "");
    const userQuery = query(userRef, orderByKey());

    try {
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            let obj = snapshot.val();
            let data = Object.values(obj);
            // isNew = // check if user is new; 
            
        }
    } catch (err) {
        console.log(err);
    }
    


    return isNew;
}
