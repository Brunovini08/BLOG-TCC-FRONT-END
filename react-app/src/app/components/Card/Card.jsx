import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { postService } from "../../../services/PostService/postService.js"
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { MessageSquare, Heart, Search, PlusCircle, Trash, Download, Upload } from "lucide-react"
import { AuthContext } from "../../../contexts/auth.jsx";
import { toast, ToastContainer } from "react-toastify";
import azulIndigo from "../../../../public/azul-indigo.jpg"


export function CardDefault() {

    const { signed } = useContext(AuthContext)
    const user = signed ? localStorage.getItem("@Auth:user") : null
    const userId = JSON.parse(user)?.user?._id
    const [posts, setPost] = useState([{}])

    const likedPost = posts.filter((post) => {
        return post.like?.includes(userId)
    }).map((post) => {
        return post._id
    })

    const data = async () => {
        const postData = await postService.getPosts()
        setPost(postData.data)
    }

    const likeInPost = async (props) => {
        if (user === null) {
            toast.error("Você precisa estar logado para curtir")
            setTimeout(() => {
                window.location.href = "/login"
            }, 5000)
            return
        }
        await postService.likePost(props)
        await data()
    }

    useEffect(() => {
        data()
    }, []);

    return (
        <div className="mt-10 grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 w-[100%]">
            {posts?.map((post) => (
                <div className={``} key={post._id}>
                    <Card key={post._id} shadow={false} className={``}>
                        <div className="pb-7 flex items-center gap-2 ml-4">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <Link to={`${post.user?._id === userId ? `/profile/${post.user?._id}` : `/profile/otheruser/${post.user?._id}`}`}>
                                            <Avatar src={post?.user?.image === "" ? azulIndigo : post?.user?.image} />
                                        </Link>
                                    </Menu.Button>
                                </div>
                            </Menu>
                            <div className="flex flex-col">
                                <div>
                                    <Typography variant="h5" color="black">
                                        <Link to={`${post.user?._id === userId ? `/profile/${post.user?._id}` : `/profile/otheruser/${post.user?._id}`}`}>
                                            {post.user?.name}
                                        </Link>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="small" color="" className="mb-2">
                                        {new Date(post.createdAt).toLocaleDateString('pt-BR', { calendar: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <CardHeader color="" className="relative h-56">
                            <Link to={`/post/${post._id}`}>
                                <img src={post.image} className="h-full w-full object-cover object-center" />
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="black" className="mb-2">
                                <Link to={`/post/${post._id}`}>{post.title}</Link>
                            </Typography>
                            <Typography>
                                <Link to={`/post/${post._id}`}>
                                    <Typography className="cursor-pointer break-words">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 255).concat("...") }}
                                        />
                                    </Typography>
                                </Link>
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex flex-col justify-center ">
                            <div className="flex flex-row w-full items-center">
                                <div className=" flex flex-row gap-2 w-48 items-center">
                                    <div>
                                        <Heart onClick={() => likeInPost(post._id)} className={`h-4 w-4 cursor-pointer ${likedPost.includes(post._id) ? "text-red-500" : "text-gray-500"}`} />
                                    </div>
                                    <div>
                                        {post.like?.length > 0 ? <Typography variant="h6" color="blue-gray" className="">{post.like?.length} Likes</Typography> : <Typography variant="h6" color="blue-gray" className="">0 Likes</Typography>}
                                    </div>
                                </div>
                                <Link to={`/post/${post._id}/true`}>
                                    <div className="flex flex-row gap-2 w-48 items-center">
                                        <div>
                                            <MessageSquare className="h-4 w-4"/>
                                        </div>
                                        <div>
                                            {post.comments?.length > 0 ? <Typography variant="h6" color="blue-gray" className="">{post.comments?.length} Comentários</Typography> : <Typography variant="h6" color="blue-gray" className="">0 Comentários</Typography>}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}