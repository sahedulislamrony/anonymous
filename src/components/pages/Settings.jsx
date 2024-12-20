import style from "../../styles/Settings.module.scss";
import SettingCard from "../SettingCard";
import SettingItem from "../SettingItem";
import ProfileInfo from "./../ProfileInfo";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount, logout } from "../../features/auth/authSlice";
import { clearDB } from "../../features/data/dataSlice";

export default function Settings() {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleLogout() {
        // add a confirmation dialog popup
        await dispatch(logout());
        navigate("/login");
    }

    async function handleDeleteAccount() {
        // add a confirmation dialog popup
        try{
            // const res = await Promise.all([dispatch(deleteUserAccount()),dispatch(clearDB(user))]);
            const res = await dispatch(deleteUserAccount());
            let state = res.payload;

            if(state.status === "ok"){
                // delete user from search database , and msessages database
                dispatch(clearDB(user));
                // check if user is deleted from search database and messages database
            }
            else if(state.status === "failed"){
                // console.log(state.error);
                // and error code is Firebase: Error (auth/requires-recent-login).
                // than re authenticate the user by dispatching login action

            }
        }catch(err){
            console.log(err);
        }
        
        
    }
    return (
        <section className={style.settings}>
            <ProfileInfo />
            <SettingCard icon="badge" label="Personal information">
                <SettingItem icon="mail" label="Email" action={true} />
                <SettingItem icon="alternate_email" label="Username" action={true} />
            </SettingCard>

            <SettingCard icon="security" label="Safety controls">
                <SettingItem icon="eda" label="Pause my link" action={true} />
                <SettingItem icon="local_police" label="Advance filtering" action={true} />
            </SettingCard>

            <SettingCard icon="book_4_spark" label="More info">
                <SettingItem icon="network_intelligence" label="Developer information" action={true} />
                <SettingItem icon="lens_blur" label="Terms of use" action={true} />
                <SettingItem icon="eco" label="Privacy policy" action={true} />
            </SettingCard>

            <SettingCard icon="warning" label="Danger zone" danger={true}>
                <SettingItem icon="logout" label="Logout" action={true} danger={true} onClick={handleLogout}/>
                <SettingItem icon="delete" label="Delete account" action={true} danger={true}  onClick={handleDeleteAccount }/>
            </SettingCard>
        </section>
    );
}