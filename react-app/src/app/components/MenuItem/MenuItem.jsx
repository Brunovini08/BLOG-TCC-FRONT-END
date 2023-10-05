import {Link} from "react-router-dom";

export default function MenuItem(props) {
    return(
        <div className="border border-black transition flex w-25 bg-white text-black rounded-md h-13 justify-center hover:bg-indigo-600 duration-300 hover:text-white hover:underline underline-offset-2 hover:border-0 p-2">
            <li className="text-xl"><Link to={props.link}>{props.name}</Link></li>
        </div>
    )
}