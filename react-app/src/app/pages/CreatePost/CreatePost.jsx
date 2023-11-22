import {useEffect, useState} from "react";
import {Avatar, Button, Input, Typography} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar.jsx";
import {postService} from "../../../services/PostService/postService.js";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill";

export function CreatePost() {


    const authUser = localStorage.getItem("@Auth:user")
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


    const [post, setPost] = useState({
        base64: '',
        title: '',
        content: ''
    })

    const navigate = useNavigate()
    const contentFieldChange = async (e) =>{
        e.preventDefault()
        try {

            const response = await postService.createPost({data: {title: post.title, content: post.content, base64: post.base64}, id: JSON.parse(authUser).user._id})
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500,
            })
            return navigate("/")
        }catch (error) {
            console.log(error)
        }
    }


    const fieldChanged = (e) => {
        setPost({...post, title: e.target.value})
        console.log(post)
    }



    useEffect(() => {
       setPost({...post, title: post.title, content: post.content, base64: post.base64})
    }, []);

    return(
       <div className="w-full h-full flex flex-col justify-center items-center">
           <NavBar />
           <form className="w-2/3 h-2/3 p-10 shadow shadow-2xl rounded-xl drop-shadow-2xl" onSubmit={contentFieldChange}>
               <div>
                   <div className="flex flex-col items-center justify-center w-full mb-3 border border-black">
                           <img src={post.base64} className="bg-cover bg-no-repeat w-full min-w-[48px] max-w-[95%] min-h-[48px] max-h-[100vh]"/>
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
                           <Button color="indigo" type="submit" >CREATE POST</Button>
                           <Link to="/" >
                               <Button color="red">CANCEL</Button>
                           </Link>
                       </div>

                   </div>
               </div>
           </form>

       </div>
   )
}