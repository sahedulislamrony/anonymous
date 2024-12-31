import { ref, remove } from "firebase/database";
import { db } from "../../firebase.config";
import sysLog from "../system/sysLog";

export default async function clearUserData(user) {
    let status = "ok";
    let error = null;

    const { uid } = user;

    const paths = [
        // all paths to be cleared
    ];

    try {

        await Promise.all(
            paths.map((path) => {
                const userRef = ref(db, path);
                return remove(userRef);
            }),
        );

        // Log after the removal operations
        await sysLog({
            action: "Delete User Account",
            data: user,
            message: "User data cleared",
            isVerified: false,
        });

    } catch (err) {
        console.error("Error clearing user data:", err);
        status = "failed";
        error = err;
    }

    return {
        status,
        error,
    };
}
