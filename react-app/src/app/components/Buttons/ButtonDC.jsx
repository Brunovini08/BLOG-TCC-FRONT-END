import {Button} from "@material-tailwind/react";

export const ButtonDC = (props) => {
    return(
            <Button className={`rounded-xl w-12.5 h-9 flex justify-center items-center `} onClick={props.onClick} color={props.color}>
                {props.name}
            </Button>
    )
}