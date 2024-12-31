
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Anonyous from "../pages/Anonymous";
import Home from "../pages/Home";

export default function MidleWare() {
    let {username:path} = useParams();
    const {user} = useSelector(state => state.auth);
    path = path.split("/")[0];
    path = path.startsWith("@") ? path.slice(1) : path;
    const username = user?.username;
    

    if(user && username === path )
        return <Home/>;
    return <Anonyous />;

}