import NavBar from "../../components/Navbar/NavBar.jsx";
import {User} from "../../components/User/User.jsx";
import ProfileUser from "../Profile/ProfileUser.jsx";

export const ProfileOthersUsers = () => {



    return(

        <div className="w-screen h-screen flex bg-gray-200 flex-col" >
            <NavBar />
            <User />
        </div>
    )
}