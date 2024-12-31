import { ref, update } from "firebase/database";
import { db } from "../../firebase.config";


export async function updateUserName(user) {
    const {  username } = user;
    const userRef = ref(db, "");
    const userRef2 = ref(db, "");
    const  usernameLastUpdate =  Date.now();

    try {
        await Promise.all([
            update(userRef, { username  }),
            update(userRef2, { username , usernameLastUpdate }),
        ]);
    } catch (err) {
        console.error("Error updating user data:", err);
    }
  
    
}

export async function updateLinkStatus(userData) {
    const {  isLinkActive } = userData;
    
    const userRef = ref(db, "");
    const userRef2 = ref(db, "");

    try {
        await Promise.all([
            update(userRef, { isLinkActive  }),
            update(userRef2, { isLinkActive }),
        ]);
    } catch (err) {
        console.error("Error updating user settings:", err);
    }
}