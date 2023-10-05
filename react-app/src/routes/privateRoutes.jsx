import {useContext} from "react";
import {AuthContext} from "../contexts/auth.jsx";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoutes = () => {
    const {signed} = useContext(AuthContext)
    console.log(signed)
    return signed ? <Outlet /> : <Navigate to="/login" />
}