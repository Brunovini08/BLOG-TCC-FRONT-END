import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/auth.jsx";
import {Alert, Input} from "@material-tailwind/react";
import {Link, Navigate} from "react-router-dom";

export const ForgetPassEmail = () => {

    const [form, setForm] = useState({
        email: ''
    })
    const [error, setError] = useState("")
    const {forgetPassEmail, signed} = useContext(AuthContext)



    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.email){
            setError(<Alert className="pt-2" color="red">Preencha todos os campos</Alert>)
            return
        }
        try {
            const data = {
                email: form.email,
            }

            await forgetPassEmail(data).then( () => {
                setError(<Alert className="pt-2" color="green">Email enviado com sucesso</Alert>)
                setTimeout(() => {
                    window.location.href = "/login"
                }, 4000)
            })

        }catch (error) {
            console.log(error)
        }
    }

    return(
        signed ? <Navigate to={"/home"} /> :
            <div className="flex h-screen w-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-neutral-50">
                <div className="mt-10 w-[24%] p-8 bg-gray-50 rounded-2xl shadow-2xl ">
                    <h2 className="font-semibold text-indigo-600 flex justify-center w-full text-4xl mb-4">Esqueci minha senha</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    color="indigo"
                                    label="E-mail"
                                    className="pr-20"
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            email: e.target.value
                                        }),
                                            setError("")
                                    }} autoComplete="email"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
                        </div>
                        <div className="flex justify-end items-center">
                            <Link to="/login" className="font-semibold text-indigo-600 hover: text-indigo-500 hover:text-indigo-500"><b>Logar</b></Link>
                        </div>
                        {error}
                    </form>

                </div>
            </div>
    )
}