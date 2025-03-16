import {createContext, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import authService from "../services/UserService/UserService.js";


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
                alert(response.data.error)
            } else {
                setUser(response.data);
                console.log(response.data)
                localStorage.setItem("@Auth:user", JSON.stringify(response.data));
                localStorage.setItem("@Auth:token", response.data.token);
            }
        } catch (error) {
            const { data } = error.response;
            return data;
        }
    };

    const signUp = async ({name, email, password}) => {
        try {
            const response = await authService.register({name, email, password})
            if (response.data.error) {
                alert(response.data.error)
            }
            setUser(response.data)
        }catch (error) {
            const { data } = error.response;
            return data;
        }
    }

    const signOut = () => {
        localStorage.clear();
        setUser(null);
        const navigate = useNavigate()
        navigate("/")
    };

    const modUser = async ({name, biografy, localization, image}) => {
        try {
            const response = await authService.modUser({name, biografy, localization, image}).then((response) => {
                localStorage.setItem("@Auth:user", JSON.stringify(response.data))
            }).catch((error) => {
                const {data} = error.response
                return data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const forgetPassword = async (data, id, token) => {
        try {
            const response = await authService.forgetPassword(data, id, token)
            if (response.data.error) {
                console.log(response.data.error)
            }
            return response.data
        } catch(error) {
            console.log(error)
        }
    }

    const forgetPassEmail = async (data) => {
        try {
            const response = await authService.forgetPassEmail(data)
            if (response.data.error) {
                console.log(response.data.error)
            }
            return response.data
        } catch(error) {
            console.log(error)
        }
    }


    return(
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            signUp,
            modUser,
            forgetPassword,
            forgetPassEmail,
            signed: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}