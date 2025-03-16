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
            const result = await postService.getPostTitle(value).then((res) => setSearchResult(res.data))
        } catch (error) {
            console.log(error)
        }
    }


    const Buttons = () => {
        return (
            <div className="flex flex-row w-80 items-center justify-evenly lg: max-w-[29vw]">
                <MenuItem name="Novo Post" link={`/createpost/${JSON.parse(authUser).user?._id}`} />
                <Profile />
            </div>
        )
    }

    return (
        <div className="w-full border-2 h-13 justify-center flex shadow drop-shadow lg:max-w-[100]">
            <nav className="flex items-center w-[100%] h-[60px] pb-3 pt-3 justify-center">
                <div className="flex flex-row items-center w-full justify-evenly h-12">
                    <div className="w-[23%] flex justify-center">
                        <Link to="/" className="text-2xl font-bold">DevNotes</Link>
                    </div>
                    <div className="w-[23%] flex relative gap-2 md: items-center">
                        <Input
                            type="search"
                            color="black"
                            label="Pesquisar"
                            className=""
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                            onChange={searchPost}
                        />


                    </div>
                    <ul className={`z-10 flex flex-col bg-white w-auto h-auto rounded-md ${!searchResult ? "hidden" : "fixed"} shadow-md top-[90%] 2xl:left-[38.5%] lg:left-[20%] xl:left-[29%]`}>
                        {searchResult ? searchResult.map((item) => {
                            return (
                                <li key={item._id} className="flex flex-row justify-between items-center w-full h-10 px-2">
                                    <Link to={`/post/${item._id}`} onClick={() => {
                                        window.location.reload()
                                    }}>
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