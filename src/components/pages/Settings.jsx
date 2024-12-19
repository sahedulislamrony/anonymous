import style from "../../styles/Settings.module.scss";
import SettingCard from "../SettingCard";
import SettingItem from "../SettingItem";
import ProfileInfo from "./../ProfileInfo";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function Settings() {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleLogout() {
        // add a confirmation dialog 
        await dispatch(logout());
        navigate("/login");
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
                <SettingItem icon="delete" label="Delete account" action={true} danger={true} />
            </SettingCard>
        </section>
    );
}