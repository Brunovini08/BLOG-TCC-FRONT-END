import {Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {Menu} from "@headlessui/react";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ButtonEdit} from "../Buttons/ButtonED.jsx";
import {postService} from "../../../services/PostService/postService.js";


export const CardPostProfileAuthUser =  () => {


    const user = localStorage.getItem("@Auth:user")
    const userId = JSON.parse(user).user._id
    const [posts, setPosts] = useState([{}])



    const data = async ()  => {
        const postData = await postService.getBlogsUser(userId)
        setPosts(postData.data)
    }

    const verifyUser = () => {
        if (JSON.parse(user).user._id === userId) {
            toast.warning("Você não pode curtir seu próprio post")
        }else {
            return true
        }
    }

    const buttonDelete = async (props) => {
        const deletePost = await postService.deletePost(props)
        toast
        data()
    }

    useEffect(() => {
        data()
    }, []);

    return (
        <div>
            {posts.blogs?.map((post) => (
                <div key={post._id} className="mt-9 w-full flex justify-center items-center">
                    <Card className="mt-9 w-2/3 h-auto  drop-shadow-2xl">
                        <div className="flex items-center ">
                            <Menu as="div" className="relative ml-3 w-full flex justify-between">
                                <div className="w-52 flex flex-row justify-around pt-1 pb-1 pr-3">
                                    <Link to={`/editpost/${post._id}`}>
                                       <ButtonEdit name="EDIT" color="indigo"/>
                                    </Link>
                                       <ButtonEdit name="DELETE" color="red" onClick={() => buttonDelete(post._id)}/>
                                </div>
                            </Menu>
                        </div>

                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                <Link to={`/post/${post._id}`}>{post.title}</Link>
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="mb-2">
                                {post.createdAt ? post.createdAt.toLocaleString('pt-bt').substring(0, 10) : "No date"}
                            </Typography>
                            <Typography>
                                <Link to={ `/post/${post._id}`}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: post.content?.substring(0, 255).concat("...")}}
                                    />
                                </Link>
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 pl-4">
                            <ToastContainer />

                        </CardFooter>
                    </Card>
                </div>
            ))}

        </div>


    )
}