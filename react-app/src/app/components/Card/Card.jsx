import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton, Avatar, Button,
} from "@material-tailwind/react";
import {useContext, useEffect, useState} from "react";
import {postService} from "../../../services/PostService/postService.js"
import {Menu} from "@headlessui/react";
import {Link, useParams} from "react-router-dom";
import authService from "../../../services/UserService/UserService.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faXmark} from "@fortawesome/free-solid-svg-icons";
import {CommentHamburguer} from "../CommentHamburguer/CommentHamburguer.jsx";
import {AuthContext} from "../../../contexts/auth.jsx";


export function CardDefault() {

    const {signed} = useContext(AuthContext)
    const user = signed ? localStorage.getItem("@Auth:user") : null
    const userId = JSON.parse(user)?.user?._id
    const [posts, setPost] = useState([{}])

    const likedPost = posts.filter((post) => {
        return post.like?.includes(userId)
    }).map((post) => {
        return post._id
    })

     const data = async ()  => {
        const postData = await postService.getPosts()
        setPost(postData.data)
    }

    const likeInPost = async (props) => {
        await postService.likePost(props)
        await data()
    }

    useEffect(() => {
        data()
    }, []);

    return (
        <div className="mt-10">
            {posts?.map((post) => (
                <div className={`w-full flex justify-center items-center`}>
                    <Card key={post._id} className="mt-9 w-[34%] drop-shadow-2xl pt-1">
                        <div className="pb-7 flex items-center gap-2 ml-4">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <Link to={`/profile/${post?.user?._id}`}>
                                            <Avatar src={post?.user?.image} />
                                        </Link>
                                    </Menu.Button>
                                </div>
                             </Menu>
                            <Typography variant="h5" color="blue-gray">
                               <Link to={`/profile/otheruser/${post?.user?._id}`}>{post?.user?.name}</Link>
                            </Typography>
                        </div>
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img src={post.image} className=""/>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                               <Link to={`/post/${post._id}`}>{post.title}</Link>
                                <Typography variant="small" color="blue-gray" className="mb-2">
                                    {post.createdAt ? post.createdAt.toLocaleString('pt-bt').substring(0, 10) : "No date"}
                                </Typography>
                            </Typography>
                            <Typography>
                                <Link to={ `/post/${post._id}`}>
                                    <Typography className="cursor-pointer break-words">
                                        <div
                                            dangerouslySetInnerHTML={{__html: post.content?.substring(0, 255).concat("...")}}
                                        />
                                    </Typography>
                                </Link>
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex flex-col justify-center ">
                            <div className="flex flex-row w-full items-center">
                                    <div className=" flex flex-row gap-2 w-48 items-center">
                                        <div>
                                            <FontAwesomeIcon icon={faHeart} color={`${likedPost.includes(post._id) ? "red" : "gray"}`} size={"2xl"} onClick={() => {
                                                likeInPost(post._id)
                                            }} className="cursor-pointer"/>
                                        </div>
                                        <div>
                                            {post.like?.length > 0 ? <Typography variant="h6" color="blue-gray" className="">{post.like?.length} Likes</Typography> : <Typography variant="h6" color="blue-gray"className="">0 Likes</Typography>}
                                        </div>
                                    </div>
                                <Link to={`/post/${post._id}/true`}>
                                    <div className="flex flex-row gap-2 w-48 items-center">
                                        <div>
                                            <FontAwesomeIcon icon={faComment} color="gray" size={"2xl"} />
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