import NavBar from "../../components/Navbar/NavBar.jsx";
import {CardTest} from "../../components/CardTest/CardTest.jsx";
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
   <div className={` h-screen flex flex-col border border-black 2xl:max-w-[100%] bg-white p-0`}>
       <NavBar />
       <div className="absolute left-[33.4%] 2xl: top-[10%]">
           <Typography variant="h3">Posts({posts?.length})</Typography>
       </div>
       <CardDefault />
   </div>
  )
}

export default Home