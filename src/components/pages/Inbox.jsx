import { useSelector } from "react-redux";
import style from "../../styles/Inbox.module.scss";

import ListItem from "../ListItem";

export default function Inbox() {

    // const dispatch = useDispatch();
    const {inbox} = useSelector((state) => state.data);
    const {status , data } = inbox || {};

    // fetch inbox messages here and dispatch to store 
    
    return (
        <div className={style.inbox}>
            {data && status === "success" && <ul className={style.list}>
                
                { data.map((msg) => (
                    <ListItem key={msg.msgID} data={msg} />
                ))}
           
           
                {/* part of design */}
                <li className={style.pixedBottomSpace}>do not remove me :.: </li>
            </ul>}

            {status === "loading" && <Loader />}
            {status === "error" && <Empty />}
        </div>
    );
}



function Loader() {
    const loader = ["loader.svg" , "loop.svg"];
    const index = Math.floor(Math.random() * loader.length);
    const loaderSVG = loader[index];
    return (
        <div className={style.loading}>
            <div className={style.loader}>
                <img src={`/${loaderSVG}`} alt="Loading..." className={style.img} />
            </div>
        
        </div>
    );
}


function Empty() {
    return (
        <div className={style.empty}>
            <h3 className={style.title}>No Messages Available</h3>
            <p className={style.text}>You currently have no messages. Please check back later.</p>
        </div>
    );
}