import NavBar from "../../components/Navbar/NavBar.jsx";
import {useContext, useEffect, useState} from "react";
import {postService} from "../../../services/PostService/postService.js";
import {Link, useParams} from "react-router-dom";
import {Avatar, Typography} from "@material-tailwind/react";
import {Loader} from "../../components/Loader/Loader.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faUpload} from "@fortawesome/free-solid-svg-icons";
import {CommentHamburguer} from "../../components/CommentHamburguer/CommentHamburguer.jsx";
import {toast, ToastContainer} from "react-toastify";
import styles from "./styles.module.css"
import {AuthContext} from "../../../contexts/auth.jsx";
import {Transition} from "@headlessui/react";
import azulIndigo from "../../../../public/azul-indigo.jpg"

export const Post = () => {

    const [post, setPost] = useState({})
    const [setLoading, loading] = useState(false)
    const [comments, setComments] = useState([{}])
    const [comment, setComment] = useState("")
    const {id, opencomment} = useParams()
    const [open, setOpen] = useState(false)
    const userId = JSON.parse(localStorage.getItem("@Auth:user"))?.user?._id
    const {user} = useContext(AuthContext)
    const [error, setError] = useState(false)


    const likedPost = post.like?.includes(userId)

    const data = async ()  => {
        const postData = await postService.getPostById(id)
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

    const getComments = async () => {
        const comments = await postService.getCommentsByPost(id)
        setComments(comments.data)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        if (user === null) {
            setError(true)
            setTimeout(() => {
                setError(false)
                window.location.href = "/login"
            }, 3000)
            return
        }
        const createComment = await postService.postComment({text: comment, id: id})
        await getComments()
    }


    const handleFieldComment = (e) => {
        setComment(e.target.value)
    }

    const openCloseComment = () => {
        open ? setOpen(false) : setOpen(true)
    }

    useEffect(() => {
        data()
        getComments()
    }, []);

    useEffect(() => {
        if(opencomment) {
            setOpen(true)
        }
    }, [opencomment])


    return(
        <div className="w-full h-full">
            <NavBar />
            {!loading ? <Loader /> :  <div key={post._id} className={`w-full h-full flex justify-center items-center flex-col gap-10 bg-gray-200`}>
                <div className="w-full h-96 flex flex-col justify-center items-center bg-indigo-400">
                    <ToastContainer />
                    <div className="w-2/3 h-96 flex justify-center items-center flex-col gap-2">
                        <div className="flex justify-center">
                            <Typography variant="h3" color="white">
                                   {post.title}
                            </Typography>
                        </div>
                        <div className="flex w-4/12 pl-5 gap-2 justify-center">
                            <div>
                                <Link to={`${post.user?._id === userId ? `/profile/${post.user?._id}` : `/profile/otheruser/${post.user?._id}`}`}>
                                    <Avatar src={post.user?.image === "" ? azulIndigo : post.user?.image} className="bg-white"/>
                                </Link>
                            </div>
                            <div className="flex justify-center flex-col ">
                                <Typography variant="paragraph" color="white">
                                    <div className="flex flex-row gap-2">
                                        Escrito por:
                                        <Link to={`${post.user?._id === userId ? `/profile/${post.user?._id}` : `/profile/otheruser/${post.user?._id}`}`}>
                                            <Typography className=" hover:underline decoration-1 cursor-pointer">
                                                {post.user?.name}
                                            </Typography>
                                        </Link>
                                    </div>
                                </Typography>
                                <Typography variant="paragraph" color="white">
                                    em: {new Date(post.createdAt).toLocaleDateString('pt-BR', {calendar: 'long', year: 'numeric', month: 'short', day: 'numeric'})}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full justify-center items-center flex ">
                    <div className={`w-1/2 h-auto flex justify-center p-4 items-center flex-col ${styles.postContent}`}
                         dangerouslySetInnerHTML={{__html: post.content}}
                    />
                </div>
                <div className="w-1/2 mb-10">
                    <div className="flex justify-between px-3">
                        <div className="flex gap-3">
                            <button>
                                <FontAwesomeIcon icon={faHeart} color={`${likedPost ? "red" : "gray"}`} size="2x"
                                    onClick={() => {
                                        likeInPost(post._id)
                                    }}
                                />
                                {post.like?.length > 0 ? <Typography variant="h5" color="blue-gray" className="mb-2">{post.like?.length} Likes</Typography> : <Typography variant="h5" color="blue-gray" className="mb-2">0 Likes</Typography>}
                            </button>
                            <button onClick={openCloseComment}>
                                <FontAwesomeIcon icon={faComment} color="gray" size="2x"/>
                                {comments?.length > 0 ? <Typography variant="h5" color="blue-gray" className="mb-2">{comments?.length} Comentários</Typography> : <Typography variant="h5" color="blue-gray" className="mb-2">0 Comentários</Typography> }
                            </button>
                        </div>
                        <div>
                            <button onClick={() =>{
                              navigator.share({
                                  title: post.title,
                                  text: post.content,
                                  url: `http://localhost:5173/post/${post._id}`
                              }).then(() => { toast.success("Você copiou o link do post") })}}>
                                <FontAwesomeIcon icon={faUpload} color="gray" size="2x"/>
                            </button>
                        </div>
                    </div>
                    <div className="w-full border border-black mt-10" />
                </div>
                <div className={`${open ? `fixed right-3 w-96 h-screen top-1 flex justify-center bg-white rounded-xl` : `hidden`} `}>
                    <Transition
                        show={open}
                        enter="transition ease-out duration-100 "
                        enterFrom="transform opacity-0 scale-95 translate-x-32 lg:translate-x-20 translate-x-0 scale-80"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75 transition origin-top-right absolute"
                        leaveFrom="transform opacity-100 scale-100 -translate-x-32 lg:-translate-x-20 translate-x-0 scale-80 "
                        leaveTo="transform opacity-0 scale-95 translate-x-32 lg:translate-x-20 translate-x-0 scale-80"
                    >
                        <CommentHamburguer openCloseComment={openCloseComment} id={id} onClick={handleComment} handleFieldComment={handleFieldComment} value={comment} postComments={comments} error={error}/>
                    </Transition>
                </div>
            </div>
            }
        </div>
    )
}