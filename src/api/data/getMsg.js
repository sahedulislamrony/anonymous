import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

export default async  function getMsg(UID) {

    const db = getDatabase();
    const msgRef = ref(db, `messages/${UID}`);
    const msgQuery = query(msgRef, orderByKey());

    let data = null;

    try {
        var snapshot = await get(msgQuery);

        if (snapshot.exists()) {
            data = snapshot.val();
            Object.keys(data).forEach(key => {
                data[key].id = key;
            });
            // we need to store key for update status and delete message
            data = Object.values(data).reverse();
        }

    }catch (err) {
        console.error(err);
    }
    
   
   


    return data;


}

