import { Button } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function  MenuItem(props) {
    return(
        <Link to={props.link}>
          <Button className={props.className}>
            {props.name}
          </Button>
        </Link>
    )
}