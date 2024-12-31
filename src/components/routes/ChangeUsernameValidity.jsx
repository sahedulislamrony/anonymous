import { useSelector } from "react-redux";
import style from "../../styles/ChangeUsernameValidity.module.scss";
import { getDateAfter } from "../../utils/getRelativeTime";
import ChangeUsername from "../ChangeUsername";

const MAX_USERNAME_UPDATE_TIME = 30; // in days

export default function ChangeUsernameValidity() {

    const { usernameLastUpdate  } = useSelector((state) => state.auth.user);
    

    // usernmae canbe updated once in a month
    const lastUpdate = new Date(usernameLastUpdate);
    const currentDate = new Date();
    const diff = currentDate - lastUpdate;
    const days = Math.floor( diff / (1000 * 60 * 60 * 24) );
    const remainingDays = MAX_USERNAME_UPDATE_TIME - days;
    const futureDate = getDateAfter(remainingDays);


    if (remainingDays > 0) {
        return (
            <div className={style.container}>
                <p className={style.p}>Usernames can only be updated once every 30 days. You can update your username after <span className={style.span}>{futureDate}</span>.</p>
            </div>
        );
    }

    // get usernames from database
    (async () => {
        // fetch usernames
    })();
    
    
    return <ChangeUsername />;
}