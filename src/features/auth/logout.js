import { getAuth, signOut } from "firebase/auth";


export default async  function logout() {
    const auth = getAuth();
    try {
        await signOut(auth);

    }catch (error) {
        console.error("Error signing out: ", error);
    }
    return null;
}
