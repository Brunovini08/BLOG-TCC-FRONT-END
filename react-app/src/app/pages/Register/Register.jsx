import {useContext, useState} from "react";
import {Link} from "react-router-dom";

import {Alert, Input} from "@material-tailwind/react";
import {AuthContext} from "../../../contexts/auth.jsx";
import {toast} from "react-toastify";

export default function Register() {


    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState("")
    const {signUp, signIn} = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()

        if(form.name === "" || form.email === "" || form.password === "") {
            setError(<Alert className="mt-4" color="red">Preencha todos os campos</Alert>)
            return
        }

        const data = {
            name: form.name,
            email: form.email,
            password: form.password
        }

        try {
            const data = {
                name: form.name,
                email: form.email,
                password: form.password
            }
            await signUp(data).then(async (response) => {
                if(response.error) {
                    setError(<Alert className="mt-4" color="red">{response.error}</Alert>)
                    return
                } else {
                    toast("Registrado com sucesso")
                    await signIn({email: form.email, password: form.password})
                }
            })
        }catch (error) {
            console.log(error)
        }

    }

    return(
         <div className="flex h-screen w-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-neutral-50">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-gray-50 rounded-2xl shadow-2xl">
                    <h2 className="font-semibold text-indigo-600 flex justify-center w-full text-4xl mb-4">Blog Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    color="indigo"
                                    label="Nome"
                                    className="pr-20"
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    onChange={e => {
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        }),
                                            setError("")
                                    }} autoComplete="name"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <Input
                                    type="email"
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
                            <div className="flex items-center justify-between">
                            </div>
                            <div className="mt-2">
                                <Input
                                    type="password"
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
                                    }} autoComplete="current-password"
                                />
                            </div>
                            {error}
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                        </div>

                        <div className="flex justify-center items-center">
                            <Link to="/login" className="font-semibold text-indigo-600 hover: text-indigo-500 hover:text-indigo-500">Já tem uma conta? <b>Logar</b></Link>
                        </div>
                    </form>

                </div>
            </div>
    )
}