import NavBar from "../../components/Navbar/NavBar.jsx";
import {postService} from "../../../services/PostService/postService.js";
import {useEffect, useState} from "react";
import {Typography} from "@material-tailwind/react";
import {CardDefault} from "../../components/Card/Card.jsx";

function Home() {



    const [posts, setPosts] = useState([{}])
    const data = async ()  => {
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
       <div className="absolute left-[33.4%] 2xl:top-[9%] z-0 xl:top-[6.5%] ">
           <Typography variant="h3">Posts({posts?.length})</Typography>
       </div>
       <CardDefault />
   </div>
  )
}

export default Home