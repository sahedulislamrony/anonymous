import { deleteUser } from "firebase/auth";
import { auth } from "../../firebase.config";


export default async function deleteAccount() {
    let state = {
        status : "ok",
        error : null,
    };
    try {

        await deleteUser(auth.currentUser);
    }
    catch (err) {
        state = {
            status : "failed",
            error : err.code,
        };
    }
    return state;
}