import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRoute() {

    const {user , isValidUser } = useSelector(state => state.auth);
  

    return (
        user && isValidUser ? <Outlet /> : <Navigate to="/login"/>
    );
}