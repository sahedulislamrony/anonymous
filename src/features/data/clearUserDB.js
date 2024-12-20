import { ref, remove } from "firebase/database";
import { db } from "../../firebase.config";

export default async function clearUserData(user) {
    let status = "ok";
    let error = null;

    const { uid } = user;

    const paths = [
        `messages/${uid}`,
        `search/usernames/${uid}`,
    ];

    try {
        await Promise.all(
            paths.map((path) => {
                const userRef = ref(db, path);
                return remove(userRef);
            }),
        );
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
