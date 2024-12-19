import { get, getDatabase, orderByKey, query, ref, set } from "firebase/database";


export  async function isNewUser(user) {
    const {username} = user;
    let isNew = true;
    const db = getDatabase();
    const userRef = ref(db, "search/usernames");
    const userQuery = query(userRef, orderByKey());

    try {

        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            let obj = snapshot.val();
            let data = Object.values(obj); 
            isNew = !data.some((user) => user.username === username); 
            
        }
    } catch (err) {
        console.log(err);
    }
    


    return isNew;
}

// set new user info in search database

export async function signNewUser(user){

    const { uid , username  , email , isVerified , photoURL} = user;
    const db = getDatabase();
    const userRef = ref(db, `search/usernames/${uid}`);
    const  data = {
        username,
        uid,
        email,
        isVerified,
        photoURL,
        
    };
    try {
        await set(userRef, data);
    } catch (err) {
        console.log(err);
    }
};




export async function getUserInfo(username) {
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