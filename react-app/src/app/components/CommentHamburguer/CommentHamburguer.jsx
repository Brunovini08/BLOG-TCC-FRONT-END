import {Avatar, Button, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import azulIndigo from "../../../../public/azul-indigo.jpg"



export const CommentHamburguer = (props) => {

    const error = props.error

    return(
            <div className={`w-96 h-full items-center flex flex-col rounded-xl gap-2 overflow-y-auto shadow drop-shadow-2xl`}>

                <div className="w-full h-12 flex justify-between items-center px-4">
                    <Typography variant="h4">
                        Comentários
                    </Typography>
                    <Button color="red" onClick={props.openCloseComment}>
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>
                <div className="border-b-2 border-black w-83"/>
                <div className="w-full px-4 flex flex-col gap-4">
                    <input type="text" className=" shadow shadow-md drop-shadow-sm h-10 w-full placeholder:pl-2 placeholder:text-gray-900" placeholder="Escreva aqui..." onChange={props.handleFieldComment} value={props.value}/>
                    <Button onClick={props.onClick} color="indigo">
                        Comentar
                    </Button>
                    {error && <Typography variant="h6" color="red">Você não pode comentar sem estar logado</Typography>}
                </div>
                <div className="border-b-2 border-black w-11/12 mt-2"/>
                <div>
                    {props.postComments.map((commentPost) => (
                        <div key={commentPost._id} className="w-[375px] mt-2 h-auto rounded-2xl">
                            <div className="flex flex-row w-full">
                                <div className="w-1/5 flex justify-center">
                                    <Link to={`${commentPost.userId?._id === props.userId ? `/profile/${commentPost.userId?._id}` : `/profile/otheruser/${commentPost.userId?._id}`}`}>
                                        <div>
                                            <Avatar src={commentPost.userId?.image === "" ? azulIndigo : commentPost.userId?.image} className="bg-white w-12 h-12"/>
                                        </div>
                                        {commentPost.createdAt}
                                    </Link>
                                </div>
                                <div className="w-full p-0">
                                    <Link to={`${commentPost.userId?._id === props.userId ? `/profile/${commentPost.userId?._id}` : `/profile/otheruser/${commentPost.userId?._id}`}`}>
                                        <Typography variant="h6" color="gray">
                                            {commentPost.userId?.name}
                                        </Typography>
                                    </Link>
                                    <Typography variant="paragraph" color="gray">
                                        {commentPost.text}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}