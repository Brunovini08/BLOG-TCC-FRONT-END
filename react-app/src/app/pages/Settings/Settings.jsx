import NavBar from "../../components/Navbar/NavBar.jsx";
import {Avatar, Input, Typography} from "@material-tailwind/react";
import {useContext, useEffect, useState} from "react";
import {ButtonDC} from "../../components/Buttons/ButtonDC.jsx";
import {ButtonEdit} from "../../components/Buttons/ButtonED.jsx";
import {AuthContext, AuthProvider} from "../../../contexts/auth.jsx";
import Swal from "sweetalert2";

export const Settings = () => {

    const user = localStorage.getItem("@Auth:user")
    const [isFieldDisabled, setIsFieldDisabled] = useState(true)
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [biografy, setBiografy] = useState("")
    const [localization, setLocalization] = useState("")

    const editButton =  () =>   {
        setIsFieldDisabled(false)
    }
    const cancelEdit = () => {
        setIsFieldDisabled(true)
        setImage("")
    }

    const saveEdit = async (e) => {
        e.preventDefault()
        try {
            const data = {name: name, biografy: biografy, image: image, localization: localization}
            await modUser(data)
            setIsFieldDisabled(true)
            //window.location.href = `/profile/${JSON.parse(user).user?.id}`
        } catch (error) {
            console.log(error)
        }
    }

    const ComboButtons = () => {
        return(
            <div className="flex justify-between mt-4">
                <ButtonDC color="indigo" onClick={saveEdit} name="CONFIRMAR"/>
                <ButtonDC color="red" onClick={cancelEdit} name="CANCELAR"/>
            </div>
        )
    }

    const convertToBase64 = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        try {
            reader.onload = () => {
                const data = reader.result
                setImage(data)
            }
        }catch (error) {
            console.log(error)
            reader.onerror = error => {
                console.log(error)
            }
        }
    }

    const handleFieldName = (e) => {
        setName(e.target.value)
    }

    const handleFieldLocalization = (e) => {
        setLocalization(e.target.value)
    }

    const handleFieldBiografy = (e) => {
        setBiografy(e.target.value)
    }

    const {modUser} = useContext(AuthContext)



    useEffect(() => {
        setName(JSON.parse(user).user?.name)
        setBiografy(JSON.parse(user).user?.biografy)
        setLocalization(JSON.parse(user).user?.localization)
        setImage(JSON.parse(user).user?.image)
    }, []);


    return(
        <div className="">
            <NavBar />
            <div className="text-center">
                <Typography color="indigo" variant="h4" className="mt-5 border border-b-indigo-600 pb-5">
                    Profile
                </Typography>
                <div className="w-full flex justify-center h-full">
                    <div className="w-1/3 shadow shadow-2xl p-20 flex flex-col rounded-xl ">
                        <ButtonEdit name="EDITAR" onClick={editButton}/>
                        <div className="">
                            <Avatar className="w-24 h-24 -translate-y-12 bg-indigo-400" src={ JSON.parse(user).user?.image !== "" ? JSON.parse(user).user?.image : image}/>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mb-2">
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-indigo-400 hover:file:text-white
                                transition file:ease-in-out file:duration-150
                                file:cursor-pointer"
                                       onChange={convertToBase64}
                                       disabled={isFieldDisabled}
                                />
                            </label>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Typography variant="h5" color="indigo">
                                Nome
                            </Typography>
                            <Input onChange={handleFieldName} disabled={isFieldDisabled} value={name}/>
                        </div>
                        <div className="flex flex-row items-center mt-5 gap-2">
                            <Typography variant="h5" color="indigo">
                                Descrição
                            </Typography>
                            <Input onChange={handleFieldBiografy} disabled={isFieldDisabled} value={biografy}/>
                        </div>
                        <div className="flex flex-row items-center mt-5 gap-2">
                            <Typography variant="h5" color="indigo">
                                Localização
                            </Typography>
                            <Input onChange={handleFieldLocalization} disabled={isFieldDisabled} value={localization}/>
                        </div>
                        {isFieldDisabled ? "" : <ComboButtons /> }
                    </div>

                </div>
            </div>
        </div>
    )
}