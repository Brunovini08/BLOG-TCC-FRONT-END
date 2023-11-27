import {useEffect, useRef, useState} from "react";
import {Avatar, Button, Input, Typography} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar.jsx";
import {postService} from "../../../services/PostService/postService.js";
import ReactQuill from "react-quill";
import {ButtonDC} from "../../components/Buttons/ButtonDC.jsx";

export function EditPost() {

    const {id} = useParams()
    const authUser = localStorage.getItem("@Auth:user")
    const [error, setError] = useState(null)
    const [post, setPost] = useState({
        content: '',
        title: '',
        image: ''
    })
    const [isFieldDisabled, setIsFieldDisabled] = useState(true)


    const editPost = () => {
        postService.getPostById(id).then(response => {
            setPost(response.data)
        })
    }

    const editPostSubmit = async (e) => {
        e.preventDefault()
        if (post.content === '' || post.title === '' || post.base64 === '') {
            setError("Preencha todos os campos")
            return setTimeout(() => {
                setError(null)
            } , 3000)
        }
        postService.modPost({data: {title: post.title, content: post.content, base64: post.image}, id: id}).then(response => {
            navigate(`/profile/${JSON.parse(authUser).user._id}`)
        })
    }

    const cancelImage = () => {
        setPost({...post, image: ''})
        setIsFieldDisabled(false)
    }

    console.log(post)


    const convertToBase64 = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        try {
            reader.onload = () => {
                setPost({...post, image: reader.result})
            }
        }catch (error) {
            console.log(error)
            reader.onerror = error => {
                console.log(error)
            }
        }
    }


    const navigate = useNavigate()


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

             <form className="w-2/3 h-2/3 p-10 shadow shadow-2xl rounded-xl drop-shadow-2xl">
                <div>
                    <div className="absolute left-[7%] top-[5%]">
                        {isFieldDisabled && <ButtonDC color="red" onClick={cancelImage} name="CANCELAR"/>}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full mb-3 border border-black">
                        <img src={post.image} className="bg-cover bg-no-repeat w-full min-w-[48px] max-w-[95%] min-h-[48px] max-h-[100vh]"/>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-indigo-400 hover:file:text-white
                                transition file:ease-in-out file:duration-150
                                file:cursor-pointer
                                mb-3"
                                   aria-description={"Choose profile photo"}
                                   onChange={convertToBase64}
                                   disabled={isFieldDisabled}
                            />
                        </label>
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
                        {error && <Typography color="red" variant="h5">{error}</Typography>}
                    </div>
                </div>
            </form>
        </div>
    )
}