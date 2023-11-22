import MenuItem from "../MenuItem/MenuItem.jsx";
import Profile from "../MenuItem/Profile.jsx";
import {Link} from "react-router-dom";
import {Avatar, Input} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react";
import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/auth.jsx";
import {postService} from "../../../services/PostService/postService.js";


export default function NavBar() {

    const {signed} = useContext(AuthContext)

    const authUser = localStorage.getItem("@Auth:user")

    const [searchResult, setSearchResult] = useState([])

    const searchPost = async (e) => {
        e.preventDefault()
        const {value} = e.target
        if (!value) {
            setSearchResult([])
            return
        }
        try {
            const result = await postService.getPostTitle(value).then((res) => setSearchResult(res.data))
        }catch(error) {
            console.log(error)
        }
    }


    const Buttons = () => {
        return(
            <div className="flex flex-row w-80 items-center justify-evenly md:flex justify-start">
                <MenuItem name="Criar Post" link={`/createpost/${JSON.parse(authUser).user?._id}`}/>
                <Profile />
            </div>
        )
    }

    return(
        <div className="w-full border-2 h-13 justify-center flex shadow drop-shadow lg:max-w-[100%] md:w-screen">
            <nav className="flex justify-center items-center w-[50%] h-[60px] pb-3 pt-3  pr-10">
                <div className="flex flex-row justify-between items-center w-full lg:max-w-[100%] md:w-full">
                    <div className="flex relative gap-2 md:w-max items-center">
                        <Link to="/" className="text-2xl text-indigo-600">WebWiz</Link>
                        <Input
                            type="search"
                            color="indigo"
                            label="Search."
                            className=""
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                            onChange={searchPost}
                        />

                        <Button
                            size="sm"
                            color="indigo"
                            className="!absolute -right-[25%] top-1 rounded"
                        >
                            Search
                        </Button>
                    </div>

                   <ul className={`flex flex-col bg-white w-auto h-auto rounded-md ${!searchResult ? "hidden" : "absolute"} shadow-md top-[90%] left-[13%]`}>
                           {searchResult ? searchResult.map((item) => {
                               return(
                           <li key={item._id} className="flex flex-row justify-between items-center w-full h-10 px-2">
                               <Link to={`/post/${item._id}`} onClick={() => {
                                   const time = setTimeout(() => {
                                       window.location.reload()
                                      }, 500)
                               }}>
                                   <div>
                                       <p className="text-sm text-gray-500">{item.title}</p>
                                   </div>
                               </Link>
                           </li>
                               )
                           }) : null}
                   </ul>

                    <ul className="grid grid-rows-1 grid-cols-3 w-1/4 items-center gap-2 h-13">
                        {signed ?  <Buttons />  : <MenuItem name="Login" link="/login" />}
                    </ul>

                </div>
        </nav>
    </div>
    )
}