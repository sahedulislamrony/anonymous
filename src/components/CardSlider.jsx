import style from "../styles/CardSlider.module.scss";

import MessageCard from "./MessageCard";

export default function CardSlider() {

    return (
        <div className={style.content_box}>
            <div className={style.slider}>
                <div className={`${style.slide} ${style.active}`}>
                    <MessageCard data={false} link="root" />
                </div>   
            </div>

                
            <div className={style.slideNavigator}>
                {/* <span className="active"></span> */}
                {/* <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> */}
            </div>
        </div>
    );
}