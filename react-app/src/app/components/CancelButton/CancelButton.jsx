import {Button} from "@material-tailwind/react";

export const CancelButton = (props) => {
    return(
        <li>
                <Button color="red" className={`rounded-full ${props.display}`} onClick={props.onClick}>
                    CANCEL
                </Button>
        </li>
    )
}