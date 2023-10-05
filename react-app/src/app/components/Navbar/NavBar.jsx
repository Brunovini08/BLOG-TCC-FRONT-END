import MenuItem from "../MenuItem/MenuItem.jsx";
import Profile from "../MenuItem/Profile.jsx";
import {Link} from "react-router-dom";
import {Input} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/auth.jsx";


export default function NavBar() {

    const {signed} = useContext(AuthContext)

    const Buttons = () => {
        return(
            <div className="flex flex-row w-80 items-center justify-evenly">
                <MenuItem name="Criar Post" link="/createpost"/>
                <Profile />
            </div>
        )
    }

    return(
        <div className="w-full   border-2 h-13 flex justify-center position-absolute">
            <nav className="flex justify-center items-center w-full h-13 pb-3 pt-3">
                <ul className="flex flex-row w-1/2  items-center gap-10 justify-center">
                    <div className="">
                        <Link to="/home" className="text-2xl text-indigo-600">Blog</Link>
                    </div>
                    <div className="flex relative gap-2 md:w-max">
                        <Input
                            type="search"
                            color="indigo"
                            label="Type here..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                        <Button
                            size="sm"
                            color="indigo"
                            className="!absolute right-1 top-1 rounded"
                        >
                            Search
                        </Button>
                    </div>
                </ul>
                <ul className="grid grid-rows-1 grid-cols-3 w-1/4 items-center gap-2">
                    {signed ?  <Buttons />  : <MenuItem name="Login" link="/login" />}
                </ul>
        </nav>
    </div>
    )
}