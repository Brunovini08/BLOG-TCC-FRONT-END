import { useEffect, useState } from "react";
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar.jsx";
import { postService } from "../../../services/PostService/postService.js";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill";
import { ButtonDC } from "../../components/Buttons/ButtonDC.jsx";

export function CreatePost() {


    const [error, setError] = useState(null)
    const [isFieldDisabled, setIsFieldDisabled] = useState(false)
    const authUser = localStorage.getItem("@Auth:user")
    const convertToBase64 = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        try {
            reader.onload = () => {
                setPost({ ...post, base64: reader.result })
            }
            setIsFieldDisabled(true)
        } catch (error) {
            console.log(error)
            reader.onerror = error => {
                console.log(error)
            }
        }
    }


    const [post, setPost] = useState({
        base64: '',
        title: '',
        content: ''
    })

    const navigate = useNavigate()
    const contentFieldChange = async (e) => {
        e.preventDefault()
        try {
            if (post.title === '' || post.content === '' || post.base64 === '') {
                setError("Preencha todos os campos")
                return setTimeout(() => {
                    setError(null)
                }, 3000)
            }
            const response = await postService.createPost({ data: { title: post.title, content: post.content, base64: post.base64 }, id: JSON.parse(authUser).user._id })
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Post criado com sucesso',
                showConfirmButton: false,
                timer: 1500,
            })
            return navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const cancelImage = () => {
        setPost({ ...post, base64: '' });
        setIsFieldDisabled(false)
    }


    const fieldChanged = (e) => {
        setPost({ ...post, title: e.target.value })
        console.log(post)
    }




    useEffect(() => {
        setPost({ ...post, title: post.title, content: post.content, base64: post.base64 })
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavBar />
            <form className="w-[40%] h-2/3 p-10 " onSubmit={contentFieldChange}>
                <div>
                    <div className="flex justify-between w-full">
                        <div className="flex items-end pb-1 font-bold "> 
                            <Typography className="text-center" variant="h4">Criar novo Post</Typography>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Link to="/" >
                                <Button color="white">Cancelar</Button>
                            </Link>
                            <Button type="submit" >Publicar</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full mb-3">
                        <img src={post.base64} className="w-full min-w-[48px] max-w-[95%] min-h-[48px] max-h-[50vh] mb-4" />
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
                        <input className="w-full h-20 mt-3 p-2 border-none outline-none" placeholder="Titulo do post"  onChange={fieldChanged} value={post?.title}/>
                    </div>
                    <div className="mt-3">
                        <ReactQuill
                            theme="snow"
                            onChange={(e) => setPost({ ...post, content: e })}
                            value={post.content}
                            className="h-96 mb-20"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                    { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                        />
                    </div>

                    <div className="flex w-full flex-row items-center justify-between">

                        {error && <Typography color="red" className="text-center underline underline-offset-1" variant="h5">{error}</Typography>}
                    </div>
                </div>
            </form>

        </div>
    )
}