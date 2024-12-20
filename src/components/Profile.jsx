

import { useDispatch } from "react-redux";
import { setPopup } from "../features/view/viewSlice";
import style from "../styles/Profile.module.scss";
import CardSlider from "./CardSlider";
import Error from "./Error";
import Popup from "./Popup";

export default function Profile() {
    const dispatch = useDispatch();
    
    const handleClick = () => {
        dispatch(setPopup(true));
    };
    

    return (
        <div className={style.profile}>
           
            {/* <ProfileInfo /> */}
            <CardSlider />
            <div className={style.new}>
                <div className={style.btngroup} onClick={handleClick}>
                    <div className={style.wrapper}>
                        <span className="material-symbols-outlined">
                           add
                        </span>
                        <button className={style.btn}>Create  custom link </button>
                    </div>
                    
                </div>
            </div>

            <Popup>
                <Error 
                    title="Coming Soon!" 
                    text="This feature is currently under development and will be available soon. Thank you for your patience!" 
                />
            </Popup>
        </div>
    );
}


