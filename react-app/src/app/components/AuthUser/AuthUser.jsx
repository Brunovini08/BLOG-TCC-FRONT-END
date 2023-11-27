import {CardPostProfileAuthUser} from "../CardPostProfileAuthUser/CardPostProfileAuthUser.jsx";
import {Avatar, Typography} from "@material-tailwind/react";
import azulIndigo from "../../../../public/azul-indigo.jpg";
export const AuthUser = () => {

    const user = localStorage.getItem("@Auth:user")

    return(
        <div className="w-full h-screen flex flex-col items-center pt-10 bg-gray-200 z-0">
            <div className="w-3/5 h-60 bg-white shadow drop-shadow-2xl mt-2 flex items-center flex-col rounded-xl px-2 z-0">
                <div className=" w-full h-60 flex pb-4 justify-center items-center text-center pt-2 flex-col z-0">
                        <Avatar className={`w-24 h-24 -translate-y-12 bg-indigo-400 bg-center`} src={JSON.parse(user).user?.image === "" ? azulIndigo : JSON.parse(user).user?.image}/>
                    <div className="w-auto">
                       <Typography variant="h4">
                           {JSON.parse(user).user?.name}
                       </Typography>
                    </div>
                    <div className="w-full">
                        <Typography variant="paragraph">
                            {JSON.parse(user).user?.biografy}
                        </Typography>
                    </div>
                    <div className="pt-2 grid grid-cols-2 gap-3 justify-items-center">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {JSON.parse(user).user?.localization}
                        </div>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                            </svg>
                            {new Date(JSON.parse(user).user?.createdAt).toLocaleDateString('pt-BR', {year: 'numeric', month: 'long', day: 'numeric'})}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/5 h-3/5 mb-5 bg-white shadow drop-shadow-2xl mt-2 flex items-center flex-col rounded-xl px-2 overflow-y-auto pb-5">
                <CardPostProfileAuthUser />
            </div>
        </div>
    )
}