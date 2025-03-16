import MenuItem from "../MenuItem/MenuItem.jsx";
import Profile from "../MenuItem/Profile.jsx";
import { Link } from "react-router-dom";
import { Avatar, Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/auth.jsx";
import { postService } from "../../../services/PostService/postService.js";


export default function NavBar() {

    const { signed } = useContext(AuthContext)

    const authUser = localStorage.getItem("@Auth:user")

    const [searchResult, setSearchResult] = useState([])

    const searchPost = async (e) => {
        e.preventDefault()
        const { value } = e.target
        if (!value) {
            setSearchResult([])
            return
        }
        try {
            return await postService.getPostTitle(value).then((res) => setSearchResult(res.data))
        } catch (error) {
            console.log(error)
        }
    }


    const Buttons = () => {
        return (
            <div className="flex flex-row w-80 items-center lg:justify-evenly lg:max-w-[29vw] sm:max-w-[27vw] sm:justify-between ">
                <MenuItem name="Novo Post" className="w-[110px] flex items-center h-12" link={`/createpost/${JSON.parse(authUser).user?._id}`} />
                <Profile />
            </div>
        )
    }

    return (
        <div className="flex flex-row container w-full mx-auto">
            <nav className="flex flex-row container w-full h-16 items-center">
                <div className="flex flex-row w-full h-16 items-center justify-between ">  
                    <div className="flex h-12 items-center justify-evenly w-[77%]">
                       <div>
                       <Link to="/" className="text-2xl font-bold sm:text-sm">DevNotes</Link>
                       </div>
                        <div className="border-none">
                        <Input
                            type="search"
                            color="black"
                            label="Pesquisar"
                            size="md"
                            containerProps={{
                                className: "",
                            }}
                            onChange={searchPost}
                        />  
                        </div>
                    </div>
                    
                    <ul className={`z-10 flex flex-col bg-white w-auto h-auto rounded-md ${!searchResult ? "hidden" : "fixed"} shadow-md top-[9%] left-[42%]`}>
                    {searchResult.length > 0 ? searchResult.map((item) => {
                            return (
                                <li key={item._id} className="flex flex-row justify-between items-center w-full h-10 px-2">
                                    <Link to={`/post/${item._id}`}>
                                        <div>
                                            <p className="text-sm text-gray-500">{item.title}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }) : null}
                    </ul>

                    <div className="w-[23%] flex h-12 justify-center">
                        <ul className="flex ">
                            {signed ? <Buttons /> : <MenuItem name="Login" link="/login" />}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}