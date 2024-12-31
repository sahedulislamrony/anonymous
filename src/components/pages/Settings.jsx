import style from "../../styles/Settings.module.scss";
import ProfileInfo from "./../ProfileInfo";

import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount, logout, pauseLink } from "../../features/auth/authSlice";
import { clearDB } from "../../features/data/dataSlice";
import { setPopup } from "../../features/view/viewSlice";
import SettingItem from "../SettingItem";
import Confirmation from "./../Confirmation";
import Popup from "./../Popup";

export default function Settings() {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLinkActive} = user.settings || false;
    // const isLinkActive = false;
    


    //local  state for popup dialog
    const initialState = {
        title: "",
        msg: "",
        action: () => {},
        danger: false,
        btnText: "",
    
    };
    function reducer(state, action) {
        switch(action.type) {
                case "logout":
                    state = {
                        title: "Logout",
                        msg: "Are you sure you want to logout?",
                        action: handleLogout,
                        danger: false,
                        btnText: "Logout",
                    };

                    return state;
                case "delete":
                    state = {
                        title: "Delete Account",
                        msg: "This action is permanent and cannot be undone. All your data will be permanently deleted.",
                        action: handleDeleteAccount,
                        danger: true,
                        btnText: "Delete",
                    };
                    return state;
                case "link":
                    state = {
                        title: isLinkActive ? "Pause your link" : "Activate your link",
                        msg: isLinkActive ? "Are you sure you want to pause your link?" : "Are you sure you want to activate your link?",
                        action: () => pauseUserLink(),
                        danger: isLinkActive,
                        btnText: isLinkActive ? "Pause" : "Activate",
                    };
                    return state;
                default:
                    return state;
        }
    }
    
    const [popupBox , dispatcher]  = useReducer(reducer , initialState);



    async function handleLogout() {
        return dispatch(logout());
        
    }
    async function pauseUserLink() {
        const userData = {
            uid: user.uid,
            isLinkActive: !isLinkActive,
        };   
        await dispatch(pauseLink(userData));
    }

    async function handleDeleteAccount() {
        await dispatch(clearDB(user));
        const res = await dispatch(deleteUserAccount());
        let state = res.payload;
        if(state.status !== "ok") {
            throw new Error("Failed to delete account");

        }
    }

    function handleClick(action) {
        dispatch(setPopup(true));
        dispatcher({type: action});
    }
    return (
        <>
            <section className={style.settings}>
                <ProfileInfo />
                <div className={style.card}>          
                    <div className={style.body}>       
                        <SettingItem icon="alternate_email" text="Change username" onClick={()=> navigate("/settings/change-username")}/>
                        <SettingItem
                            icon={!isLinkActive ? "play_arrow" : "pause_circle"}
                            text= {isLinkActive ? "Pause your link" : "Activate your link"}
                            onClick={() => handleClick("link")}  
                            
                        />
                        <SettingItem icon="logout" text="Logout" onClick={() => handleClick("logout")}  />
                        <SettingItem icon="delete" text="Delete account" danger={true} onClick={() => handleClick("delete")} />
                   
                    </div>
                </div>
            </section>

            {/* Popup dialog */}
            <Popup>
                <Confirmation isDanger={popupBox.danger} btnText={popupBox.btnText} title={popupBox.title} msg={popupBox.msg} action={popupBox.action} />
            </Popup>
        </>
    );
}

