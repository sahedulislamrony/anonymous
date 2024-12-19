import { get, getDatabase, ref } from "firebase/database";



export default async function getUserInfo(username) {
    const db = getDatabase();
    const userRef = ref(db, "search/usernames");
    let userInfo = null;
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            userInfo = snapshot.val();
            userInfo = Object.values(userInfo).find((user) => user.username === username);

        }
    } catch (err) {
        console.log(err);
    }

    return userInfo;
}