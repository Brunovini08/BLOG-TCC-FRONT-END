import NavBar from "../../components/Navbar/NavBar.jsx";
import { postService } from "../../../services/PostService/postService.js";
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { CardDefault } from "../../components/Card/Card.jsx";

function Home() {



    const [posts, setPosts] = useState([{}])
    const data = async () => {
        const postData = await postService.getPosts()
        setPosts(postData.data)
    }

    useEffect(() => {
        data()
    }, []);


    return (
        <div className={`h-screen flex flex-col 2xl:max-w-[100%] bg-white`}>
            <div className="z-10">
                <NavBar />
            </div>
            <div className="mt-10 mx-[16.6%]">
                <Typography className="font-bold" variant="h3">Últimos Posts</Typography>
                <CardDefault />
            </div>

        </div>
    )
}

export default Home