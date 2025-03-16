"use client"
import { useEffect, useState } from "react";
import authService from "../../../services/UserService/UserService.js";
import { useParams } from "react-router-dom";
import { CardPostProfileUser } from "../CardPostProfileUser/CardPostProfileUser.jsx";
import { Link } from "react-router-dom"
import {
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Input,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Chip,
} from "@material-tailwind/react"
export const User = () => {

    const [user, setUser] = useState([{}])
    const { id } = useParams()
    console.log(id)
    const data = async () => {
        try {
            const userData = await authService.getUserById(id)
            setUser(userData.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        data()
    }, []);

    const [activeTab, setActiveTab] = useState("posts")

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <Card className="mb-8 overflow-hidden shadow-sm">
                    <div className=""></div>
                    <CardBody className="p-6 -mt-16 flex flex-col items-center">
                        <Avatar
                            src="/placeholder.svg?height=120&width=120"
                            alt="Ana Julia"
                            size="xxl"
                            className="border-4 border-white mb-2 shadow-lg"
                        />
                        <Typography variant="h4" color="blue-gray" className="mb-1">
                            Ana Julia
                        </Typography>
                        <Typography variant="paragraph" color="blue-gray" className="mb-4 font-normal">
                            Love in Programming
                        </Typography>

                        <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2 text-blue-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    Jaboticabal
                                </Typography>
                            </div>

                            <div className="flex items-center gap-2 text-blue-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    9 de janeiro de 2025
                                </Typography>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outlined" size="sm" className="rounded-lg">
                                Seguir
                            </Button>
                            <Button variant="text" size="sm" className="rounded-lg">
                                Mensagem
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {/* Profile Content */}
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                    <TabsHeader className="bg-transparent border-b border-blue-gray-50 mb-8">
                        <Tab value="posts" className="py-3">
                            Posts
                        </Tab>
                        <Tab value="sobre" className="py-3">
                            Sobre
                        </Tab>
                        <Tab value="seguidores" className="py-3">
                            Seguidores
                        </Tab>
                    </TabsHeader>

                    <TabsBody>
                        <TabPanel value="posts" className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <CardPostProfileUser />
                            </div>
                        </TabPanel>

                        <TabPanel value="sobre">
                            <Card className="shadow-sm">
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-4">
                                        Sobre Ana Julia
                                    </Typography>
                                    <Typography className="font-normal">
                                        Desenvolvedora Full Stack apaixonada por criar soluções inovadoras. Especializada em JavaScript,
                                        React, Node.js e APIs RESTful. Compartilho conhecimento e experiências no mundo da programação.
                                    </Typography>

                                    <div className="mt-6">
                                        <Typography variant="h6" color="blue-gray" className="mb-2">
                                            Habilidades
                                        </Typography>
                                        <div className="flex flex-wrap gap-2">
                                            <Chip value="JavaScript" className="rounded-full" />
                                            <Chip value="React" className="rounded-full" />
                                            <Chip value="Node.js" className="rounded-full" />
                                            <Chip value="APIs" className="rounded-full" />
                                            <Chip value="MongoDB" className="rounded-full" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </TabPanel>

                        <TabPanel value="seguidores">
                            <Typography className="text-center py-8 text-blue-gray-500">Lista de seguidores em breve...</Typography>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    )
}

function PostCard({ isPlaceholder = false }) {
    return (
        <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader
                floated={false}
                color="blue-gray"
                className={`relative h-56 ${isPlaceholder ? "bg-blue-gray-100" : ""}`}
            >
                {!isPlaceholder && (
                    <img src="/placeholder.svg?height=224&width=400" alt="API endpoints" className="h-full w-full object-cover" />
                )}
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {isPlaceholder ? "Título do post" : "Falando sobre APIs"}
                </Typography>
                <Typography variant="small" color="gray" className="mb-3 font-normal">
                    {isPlaceholder ? "Data do post" : "Postado 9 de jan. de 2025"}
                </Typography>
                <Typography className="font-normal text-blue-gray-700">
                    {isPlaceholder ? "Descrição do post..." : "Olá pessoal 👋 Bom, hoje eu irei falar sobre API, para começar..."}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
                <Button variant="text" className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                    {isPlaceholder ? "0 Likes" : "1 Likes"}
                </Button>
                <Button variant="text" className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                    </svg>
                    {isPlaceholder ? "0 Comentários" : "2 Comments"}
                </Button>
            </CardFooter>
        </Card>
    )
}