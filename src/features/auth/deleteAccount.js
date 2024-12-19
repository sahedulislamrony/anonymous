import { deleteUser, getAuth } from "firebase/auth";


export default async function deleteAccount() {
    const auth = getAuth();
    await deleteUser(auth.currentUser);
    
    return null;
}