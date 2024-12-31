import { ref, set } from "firebase/database";
import { db } from "../../firebase.config";


// Set new user info in search database
export async function signNewUser(user) {
   


    // Prepare user data
    const userData = {
        // user data
       
    };
    const searchData = {
        // search data
    };

    try {
        // Save user data to main user database and search database
        await Promise.all([
            set(ref(db, ""), { info: userData }),
            set(ref(db, ""), searchData),
        ]);
    } catch (err) {
        console.error("Error updating user data:", err);
    }
}
