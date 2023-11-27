
import {AuthUser} from "../../components/AuthUser/AuthUser.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";



export default function ProfileUser() {

    return(
        <div className="fixed w-full">
            <div className="z-10">
                <NavBar />
            </div>
            <div className="z-0">
                <AuthUser />
            </div>
        </div>
    )
}