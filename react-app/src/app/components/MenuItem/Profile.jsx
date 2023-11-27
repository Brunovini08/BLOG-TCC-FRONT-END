import {Menu, Transition} from "@headlessui/react";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/auth.jsx";
import {Avatar} from "@material-tailwind/react";
import azulIndigo from "../../../../public/azul-indigo.jpg"

export default function Profile(props) {

    const authUser = localStorage.getItem("@Auth:user")


    const {signOut} = useContext(AuthContext)
    const handleSignout = () => {
        signOut()
    }
    return(
        <div className="transition flex w-15 text-black rounded-full h-15 justify-center">
            <li className="">
                <Menu as="div" className="relative ml-3 md: -left-3">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                                <Avatar
                                    className="bg-indigo-400"
                                    size="regular"
                                    src={JSON.parse(authUser).user?.image === "" ? azulIndigo : JSON.parse(authUser).user?.image}
                                />
                        </Menu.Button>
                    </div>
                    <Transition
                        enter="transition ease-out duration-100 "
                        enterFrom="transform opacity-0 scale-95 "
                        enterTo="transform opacity-100 scale-100 translate-x-32 lg:translate-x-20 translate-x-0 scale-80"
                        leave="transition ease-in duration-75 transition origin-top-right absolute "
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-[160px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none lg:w-[130px] z-10">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={`/profile/${JSON.parse(authUser).user?._id}`}
                                        className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 underline-offset-1 hover:text-indigo-500 hover:')}
                                    >
                                        Meu perfil
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={`/settings/${JSON.parse(authUser).user?._id}`}
                                        className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 underline-offset-1 hover:text-indigo-500')}
                                    >
                                        <button type="submit">Configurações</button>
                                    </Link>
                                )}

                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/"
                                        className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 underline-offset-1 hover:text-indigo-500')}
                                    >
                                        <button onClick={handleSignout} type="submit">Sair</button>
                                    </Link>
                                )}
                            </Menu.Item>

                        </Menu.Items>
                    </Transition>
                </Menu>
            </li>
        </div>
    )
}