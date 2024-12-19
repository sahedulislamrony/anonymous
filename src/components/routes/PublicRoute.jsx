import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PublicRoute() {

    const {user , isValidUser} = useSelector(state => state.auth);
  

    return (
        user && isValidUser ? <Navigate to="/" /> : <Outlet /> 
    );
}
