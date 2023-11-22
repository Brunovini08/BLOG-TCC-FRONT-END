import {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/auth.jsx";
import {Alert, Input} from "@material-tailwind/react";


export const Login = () => {

        const [sucess, setSucess] = useState(false)
        const [form, setForm] = useState({
            email: '',
            password: ''
        })
        const [error, setError] = useState("")
        const {signIn, signed} = useContext(AuthContext)



        async function handleSubmit(e) {
            e.preventDefault()
            const emptyValues = Object.values(form).some((value) => value === "") ? setError(<Alert className="pt-2" color="red">Preencha todos os campos</Alert>) : setError("")
            const validEmail = form.email.toLowerCase().match(/[a-z]+@[a-z]+\.com(\.br)*/) ? setError("") : setError(<Alert className="flex items-center" color="red">Email inválido</Alert>)
            try {
                const data = {
                    email: form.email,
                    password: form.password
                }

                    await signIn(data)

                setSucess(true)

            }catch (error) {
                console.log(error)
            }
        }

        return(
            signed ? <Navigate to={"/"} /> :
                <div className="flex h-screen w-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-neutral-50">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-gray-50 rounded-2xl shadow-2xl">
                        <h2 className="font-semibold text-indigo-600 flex justify-center w-full text-4xl mb-4">WebWiz Login</h2>
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
                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <Link to="/forgetpasswordemail" className="font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu sua senha?</Link>
                                    </div>
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
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logar</button>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link to="/register" className="font-semibold text-indigo-600 hover: text-indigo-500 hover:text-indigo-500">Não tem uma conta? <b>Registre-se</b></Link>
                            </div>
                        </form>

                    </div>
                </div>
        )
}