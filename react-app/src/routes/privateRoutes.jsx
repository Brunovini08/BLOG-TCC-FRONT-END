import {useContext} from "react";
import {AuthContext} from "../contexts/auth.jsx";
import {Navigate} from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const {signed} = useContext(AuthContext)
    console.log(signed)
    return signed ? children : <Navigate to="/login" />
}