import {useEffect, useState} from "react";
import {postService} from "../../../services/PostService/postService.js";
import {ToastContainer} from "react-toastify";
import {Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-solid-svg-icons";

export const CardPostProfileUser = () => {
    const {id} = useParams()
    const [posts, setPosts] = useState([{}])
    
    const data = async ()  => {
        const postData = await postService.getBlogsUser(id)
        setPosts(postData.data)
    }

    useEffect(() => {
        data()
    }, []);

    return (
        <div>
            {posts.blogs?.map((post) => (
                <div key={post._id} className="mt-9 w-full flex justify-center items-center">
                    <Card className="mt-9 w-2/3 h-auto  drop-shadow-2xl">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                <Link to={`/post/${post._id}`}>{post.title}</Link>
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="mb-2">
                                {post.createdAt.substring(0, 10)}
                            </Typography>
                            <Typography>
                               <Link to={`/post/${post?._id}`}>
                                   <div
                                       dangerouslySetInnerHTML={{__html: post.content.substring(0, 255).concat("...")}}
                                   />
                               </Link>
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 pl-4">
                            <ToastContainer />
                            <div className="flex flex-row w-full items-center">
                                <div className=" flex flex-row gap-2 w-48 items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} size={"2xl"} className="cursor-pointer"/>
                                    </div>
                                    <div>
                                        {post.like?.length > 0 ? <Typography variant="h6" color="blue-gray" className="">{post.like?.length} Likes</Typography> : <Typography variant="h6" color="blue-gray"className="">0 Likes</Typography>}
                                    </div>
                                </div>
                                <Link to={ `/post/${post._id}`}>
                                    <div className="flex flex-row gap-2 w-48 items-center">
                                        <div>
                                            <FontAwesomeIcon icon={faComment} color="gray" size={"2xl"} />
                                        </div>
                                        <div>
                                            {post.comments?.length > 0 ? <Typography variant="h6" color="blue-gray" className="">{post.comments?.length} Comments</Typography> : <Typography variant="h6" color="blue-gray" className="">0 Comments</Typography>}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    )
}