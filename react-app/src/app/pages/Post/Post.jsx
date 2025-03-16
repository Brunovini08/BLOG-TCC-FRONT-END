import NavBar from "../../components/Navbar/NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import { postService } from "../../../services/PostService/postService.js";
import { Link, useParams } from "react-router-dom";
import { Avatar, Typography } from "@material-tailwind/react";
import { Card, CardBody, CardFooter, Button, IconButton, Textarea } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";

import { AuthContext } from "../../../contexts/auth.jsx";


export const Post = () => {

    const [post, setPost] = useState({})
    const [setLoading, loading] = useState(false)
    const [comments, setComments] = useState([{}])
    const [comment, setComment] = useState("")
    const { id, opencomment } = useParams()
    const [open, setOpen] = useState(false)
    const userId = JSON.parse(localStorage.getItem("@Auth:user"))?.user?._id
    const { user } = useContext(AuthContext)
    const [error, setError] = useState(false)


    const likedPost = post.like?.includes(userId)

    const data = async () => {
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
        const createComment = await postService.postComment({ text: comment, id: id })
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
        if (opencomment) {
            setOpen(true)
        }
    }, [opencomment])


    return (
        <div className="w-full h-full">
            <NavBar />
            {!loading ? <Loader /> :
                <div className="flex justify-center items-center h-full">
                    <div className="container mx-auto px-4 py-8 max-w-5xl">
                        <div className="flex items-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4 mr-2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <Typography variant="small" color="blue-gray">
                                <Link to="/">Voltar para o Feed</Link>
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Post Header */}
                                <div className="mb-8">
                                    <div className="rounded-xl overflow-hidden h-64 md:h-80 mb-6 bg-indigo-600 shadow-md">
                                        <img
                                            src={post?.image}
                                            alt="Post cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 mb-6">
                                        <Link to={`${post?.user?._id === userId ? `/profile/${post?.user?._id}` : `/profile/otheruser/${post?.user?._id}`}`}>
                                            <Avatar src={post?.user?.image} alt="Ana Julia" size="md" />
                                        </Link>
                                        <div>
                                            <Typography variant="h6" color="blue-gray">
                                                <Link to={`${post?.user?._id === userId ? `/profile/${post?.user?._id}` : `/profile/otheruser/${post?.user?._id}`}`}>
                                                    {post?.user?.name}
                                                </Link>
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                {new Date(post?.createdAt).toLocaleDateString('pt-BR', { calendar: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <Card className="mb-8 shadow-sm">
                                    <CardBody>
                                        <Typography variant="h2" className="mb-4">{post?.title}</Typography>

                                        <Typography className="mb-4">
                                            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="flex items-center justify-between py-4 border-t">
                                        <div className="flex items-center gap-4">
                                            <Button variant="text" className="flex items-center gap-2 normal-case" onClick={() => likeInPost(post?._id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                    />
                                                </svg>
                                                <Typography variant="small" className="font-normal">
                                                    {post?.like?.length} Curtidas
                                                </Typography>
                                            </Button>
                                            <Button variant="text" className="flex items-center gap-2 normal-case" onClick={openCloseComment}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                                                    />
                                                </svg>
                                                <Typography variant="small" className="font-normal">
                                                    {comments?.length} Comentários
                                                </Typography>
                                            </Button>
                                        </div>
                                        <Button variant="text" className="flex items-center gap-2 normal-case" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0m-3.935 0l-9.566-5.314m9.566-4.314a2.25 2.25 0 10-3.935 0m3.935 0l-9.566 5.314"
                                                />
                                            </svg>
                                            <Typography variant="small" className="font-normal">
                                                Compartilhar
                                            </Typography>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            {/* Comments Section */}
                            {open && (
                                <div className="lg:col-span-1">
                                    <Card className="sticky top-24 shadow-md">
                                        <CardBody className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <Typography variant="h5" color="black">
                                                    Comentários
                                                </Typography>
                                                <button onClick={openCloseComment}>
                                                    <IconButton variant="text" size="sm">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="h-4 w-4"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </IconButton>
                                                </button>
                                            </div>

                                            <Textarea
                                                label="Escreva aqui..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="mb-3"
                                                rows={3}
                                            />

                                            <div className="flex justify-end mb-6">
                                                <Button onClick={handleComment}>COMENTAR</Button>
                                            </div>

                                            <hr className="my-4 border border-gray" />

                                            <div className="space-y-4">
                                                <div className="flex gap-3 flex-col">
                                                    {comments?.map((comment) => (
                                                        <div key={comment._id} className="flex items-center gap-3">
                                                            <Avatar src={comment.userId?.image} alt="User" size="sm" />
                                                            <div>
                                                                <Typography variant="small" color="blue-gray">
                                                                    {comment.userId?.name}
                                                                </Typography>
                                                                <Typography variant="small" color="gray">
                                                                    {comment.text}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardFooter className="pt-0 px-4 pb-3 border-t bg-gray-50">
                                            <Button variant="text" fullWidth>
                                                Ver todos os comentários
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </div>}
        </div>
    )
}