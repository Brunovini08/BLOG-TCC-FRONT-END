import {useEffect, useRef, useState} from "react";
import {Avatar, Button, Input, Typography} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar.jsx";
import {postService} from "../../../services/PostService/postService.js";
import ReactQuill from "react-quill";

export function EditPost() {

    const {id} = useParams()
    const authUser = localStorage.getItem("@Auth:user")
    const editor = useRef(null)
    const [post, setPost] = useState({
        content: '',
        title: ''
    })

    const [preview, setPreview] = useState(false)


    const editPost = () => {
        postService.getPostById(id).then(response => {
            setPost(response.data)
        })
        console.log(post)
    }

    const editPostSubmit = async (e) => {
        e.preventDefault()
        postService.modPost({data: {title: post.title, content: post.content, base64: post.image}, id: id}).then(response => {
            navigate(`/profile/${JSON.parse(authUser).user._id}`)
        })
    }

    const previewPost = () => {
        preview ? setPreview(false) : setPreview(true)
    }

    const convertToBase64 = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        try {
            reader.onload = () => {
                setPost({...post, base64: reader.result})
            }
        }catch (error) {
            console.log(error)
            reader.onerror = error => {
                console.log(error)
            }
        }
    }


    const navigate = useNavigate()

    const back = () => {
        preview ? setPreview(false) : navigate(`/profile/${JSON.parse(authUser).user._id}`)
    }


    const fieldChanged = (e) => {
        setPost({...post, title: e.target.value})
    }


    useEffect(() => {
        editPost()
    }, []);
    console.log(post)

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavBar />
            {console.log(post)}
            {!preview ? <form className="w-2/3 h-2/3 p-10 shadow shadow-2xl rounded-xl drop-shadow-2xl">
                <div>
                    <div className="flex flex-col items-center justify-center w-full mb-3 border border-black">
                        <img src={post.image} className="bg-cover bg-no-repeat w-full min-w-[48px] max-w-[95%] min-h-[48px] max-h-[100vh]"/>
                        <input id="dropzone-file" type="file" className="mt-2" onChange={convertToBase64} accept="image/*"/>
                    </div>
                    <div>
                        <Input variant="outlined" label="Title..." size="md" onChange={fieldChanged} value={post.title}/>
                    </div>
                    <div className="mt-3">
                        <ReactQuill
                            theme="snow"
                            onChange={(e) => setPost({...post, content: e})}
                            value={post.content}
                            className="h-96 mb-20"
                            modules={{ toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                                    [{'list': 'ordered'}, {'list': 'bullet'},
                                        {'indent': '-1'}, {'indent': '+1'}],
                                    ['link', 'image'],
                                    ['clean']
                                ]}}
                        />
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                        <div className="flex gap-4 ">
                            <Button color="green" type="submit" onClick={editPostSubmit}>EDITAR POST</Button>
                            <Link to={`/profile/${JSON.parse(authUser).user._id}`} >
                                <Button color="red">CANCELAR</Button>
                            </Link>
                        </div>
                        <div>
                            <Button color="teal" onClick={previewPost}>PREVIEW</Button>
                        </div>
                    </div>
                </div>
            </form> :  <div className="w-full h-full flex flex-col">
                <Button className="absolute left-10 top-32 w-20 h-8 flex justify-center items-center" color="red" onClick={back}>
                    VOLTAR
                </Button>
                <div className="w-full h-auto flex justify-center items-center bg-indigo-400">
                    <div className="w-2/3 h-96 flex justify-center items-center flex-col gap-2">
                        <div>
                            <Typography variant="h3" color="white">
                                {post?.title}
                            </Typography>
                        </div>
                        <div className="flex w-4/12 pl-5 gap-2">
                            <div>
                                <Link to={`/profile/${JSON.parse(authUser).user._id}`}>
                                    <Avatar src={JSON.parse(authUser).user.image} className="bg-white"/>
                                </Link>
                            </div>
                            <div className="flex justify-center flex-col">
                                <Typography variant="h6" color="white">
                                    <div className="flex flex-row w-48 gap-2">
                                        Escrito por:
                                        <Typography className=" hover:underline decoration-1">
                                            <Link to={`/profile/${JSON.parse(authUser).user._id}`}>{JSON.parse(authUser).user.name}</Link>
                                        </Typography>
                                    </div>
                                    em: {new Date().toLocaleDateString()}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full  justify-center items-center flex">
                    <div className="w-1/2 h-auto flex justify-center p-4 items-center flex-col"
                         dangerouslySetInnerHTML={{__html: post?.content}}
                    />
                </div>
            </div>}

        </div>
    )
}