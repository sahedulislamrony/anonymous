import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

export default async  function logout() {
    try {
        await signOut(auth);

    }catch (error) {
        console.error("Error signing out: ", error);
    }
    return null;
}
