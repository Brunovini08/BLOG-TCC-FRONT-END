import {Avatar, Button, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


export const CommentHamburguer = (props) => {




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
                </div>
                <div className="border-b-2 border-black w-11/12 mt-2"/>
                <div>
                    {props.postComments.map((commentPost) => (
                        <div key={commentPost._id} className="w-96 mt-2 shadow rounded-md">
                            <div className="flex flex-col w-full">
                                <div className="ml-3 flex">
                                    <Link to={`/profile/${commentPost.userId?._id}`}>
                                        <div className="flex gap-1">
                                            <Avatar src={commentPost.userId?.image} className="bg-white w-10 h-10"/>
                                            {commentPost.userId?.name}
                                        </div>
                                        {commentPost.createdAt}
                                    </Link>
                                </div>
                                <div className="ml-3">
                                    {commentPost.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}