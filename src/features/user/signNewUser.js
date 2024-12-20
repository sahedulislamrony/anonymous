import { ref, set } from "firebase/database";
import { db } from "../../firebase.config";

// set new user info in search database

export async function signNewUser(user){

    const { uid , username   , isVerified , photoURL} = user;
    const userRef = ref(db, `search/usernames/${uid}`);
    const  data = {
        username,
        uid,
        isVerified,
        photoURL,
        
    };
    try {
        await set(userRef, data);
    } catch (err) {
        console.log(err);
    }
};


