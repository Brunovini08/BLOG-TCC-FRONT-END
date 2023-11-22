import {Button} from "@material-tailwind/react";

export const ButtonEdit = (props) => {
   return(
          <div className="flex justify-end items-end">
              <Button className={`rounded-xl w-12.5 h-9 flex justify-center items-center`} onClick={props.onClick} color={props.color}>
                  {props.name}
              </Button>
          </div>
   )
}