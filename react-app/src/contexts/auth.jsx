import {createContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import authService from "../services/UserService.js";
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = () => {
            const storageUser = localStorage.getItem("@Auth:user");
            const storageToken = localStorage.getItem("@Auth:token");

            if (storageUser && storageToken) {
                setUser(storageUser);
            }
        };
        loadingStoreData();
    }, []);

    const signIn = async ({ email, password }) => {
        try {

            const response = await authService.login({email, password})

            if (response.data.error) {
                alert(response.data.error);
            } else {
                console.log(response.data)
                setUser(response.data);
                axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${response.data.token}`;

                localStorage.setItem("@Auth:user", JSON.stringify());
                localStorage.setItem("@Auth:token", response.data.token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signUp = async ({name, email, password}) => {
        try {
            const response = await authService.register({name, email, password})

            if (response.data.error) {
                alert(response.data.error)
            } else{
                console.log(response.data)
                setUser(response.data)
                axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${response.data.token}`;


                localStorage.setItem("@Auth:user", JSON.stringify({name: response.data.name, email: response.data.email}))
                localStorage.setItem("@Auth:token", response.data.token)
            }
        }catch (error) {
            console.log(error)
        }
    }

    const signOut = () => {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    };

    return(
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            signUp,
            signed: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}