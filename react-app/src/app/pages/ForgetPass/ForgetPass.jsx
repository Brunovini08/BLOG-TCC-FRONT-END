import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/auth.jsx";
import {Alert, Input} from "@material-tailwind/react";
import {Navigate, useParams} from "react-router-dom";

export const ForgetPass = () => {


    const {id, token} = useParams()
    const [form, setForm] = useState({
        password: ''
    })
    const [error, setError] = useState("")
    const {forgetPassword, signed} = useContext(AuthContext)



    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.password){
            setError(<Alert className="pt-2" color="red">Preencha todos os campos</Alert>)
            return
        }
        try {
            const data = {
                password: form.password,
            }

            await forgetPassword(data, id, token).then( () => {
                setError(<Alert className="pt-2" color="green">Senha alterada com sucesso</Alert>)
            })

        }catch (error) {
            console.log(error)
        }
    }

    return(
        signed ? <Navigate to={"/home"} /> :
            <div className="flex h-screen w-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-neutral-50">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-gray-50 rounded-2xl shadow-2xl ">
                    <h2 className="font-semibold text-indigo-600 flex justify-center w-full text-4xl mb-4">Nova senha</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    color="indigo"
                                    label="Senha"
                                    className="pr-20"
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            password: e.target.value
                                        }),
                                            setError("")
                                    }} autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirmar</button>
                        </div>
                        {error}
                    </form>

                </div>
            </div>
    )
}