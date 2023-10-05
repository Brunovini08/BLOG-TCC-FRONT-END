import {Avatar} from "@material-tailwind/react";

export const User = () => {
    return(
        <div className="w-screen h-screen flex justify-center pt-10">
            <div className="w-1/3 h-1/3 bg-gray-100 shadow drop-shadow-2xl flex justify-center">
                <Avatar src="coding.jpg" size="lg" className="-translate-y-5"/>
            </div>
        </div>
    )
}