import {Avatar} from "@material-tailwind/react";

export const ImageUser = (props) => {
    return(
        <li>
            <Avatar className={props.className}/>
        </li>
    )
}