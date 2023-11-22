import { Input, Typography } from "@material-tailwind/react";

export function InputProfile(props) {
    return (
        <div className="w-[20rem]">
            <Input type={props.type} value={props.value} disabled/>
            <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
            >
            </Typography>
        </div>
    );
}