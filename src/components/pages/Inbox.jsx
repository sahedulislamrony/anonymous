import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getMsg from "../../api/data/getMsg";
import style from "../../styles/Inbox.module.scss";

import ListItem from "../ListItem";

export default function Inbox() {

    const { uid:UID } = useSelector((state) => state.auth.user);
    const [staus , setStatus] = useState("idle");  // idle, loading, success, error
   
    const [data , setData] = useState(null);

    useEffect(() => {

        (async () => {
            try {
                setStatus("loading");
                const data = await getMsg(UID);

                if(!data) {
                    setStatus("error");
                    return;
                }
                
                setData(data);
                setStatus("success");
            } catch (error) {
                setStatus("error");
                console.error(error);
            }
            
        })();

       
    }, [UID]);


    
    return (
        <div className={style.inbox}>
            {data && staus === "success" && <ul className={style.list}>
                
                { data.map((msg , index) => (
                    <ListItem key={index} data={msg} />
                ))}
           
           
                {/* part of design */}
                <li style={{
                    padding: 0,
                    margin: 0,
                    visibility: "hidden",
                }}>do not remove me :.: </li>
            </ul>}

            {staus === "loading" && <Loader />}
            {staus === "error" && <Empty />}
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