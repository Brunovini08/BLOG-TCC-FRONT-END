import {Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {Menu} from "@headlessui/react";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ButtonEdit} from "../Buttons/ButtonED.jsx";
import {postService} from "../../../services/PostService/postService.js";
import Swal from "sweetalert2";


export const CardPostProfileAuthUser =  () => {


    const user = localStorage.getItem("@Auth:user")
    const userId = JSON.parse(user).user._id
    const [posts, setPosts] = useState([{}])



    const data = async ()  => {
        const postData = await postService.getBlogsUser(userId)
        setPosts(postData.data)
    }


    const buttonDelete = async (props) => {
        await Swal.fire({
            position: 'center',
            icon: 'info',
            showDenyButton: 'true',
            confirmButtonText: `Sim`,
            denyButtonText: `Não`,
            title: 'Deseja deletar o post?',
            text: "Você não poderá reverter isso!",
        }).then( async (result) => {
            if (result.isConfirmed) {
                const deletePost = await postService.deletePost(props)
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Post deletado com sucesso',
                    showConfirmButton: false,
                    timer: 1500,
                })
                data()
            } else if (result.isDenied) {
                await Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Post não deletado',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })

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
                            <div className="flex justify-center">
                                <img src={post.image} alt="" className="w-full h-2/3 object-center object-cover rounded-2xl" />
                            </div>
                            <div className="ml-1 mt-2">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="mb-2">
                                    Postado em: {new Date(post.createdAt).toLocaleDateString('pt-BR', {calendar: 'long', year: 'numeric', month: 'short', day: 'numeric'})}
                                </Typography>
                                <Typography>
                                    <Link to={ `/post/${post._id}`}>
                                        <div
                                            dangerouslySetInnerHTML={{__html: post.content?.substring(0, 255).concat("...")}}
                                        />
                                    </Link>
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0 pl-4">
                            <ToastContainer />
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
                        </CardFooter>

                    </Card>
                </div>
            ))}

        </div>


    )
}