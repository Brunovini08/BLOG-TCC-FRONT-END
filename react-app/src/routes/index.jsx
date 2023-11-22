import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./privateRoutes";
import {Login} from "../app/pages/Login/Login.jsx";
import Register from "../app/pages/Register/Register.jsx";
import {CreatePost} from "../app/pages/CreatePost/CreatePost.jsx";
import ProfileUser from "../app/pages/Profile/ProfileUser.jsx";
import Home from "../app/pages/Home/Home.jsx";
import {ForgetPass} from "../app/pages/ForgetPass/ForgetPass.jsx";
import {Post} from "../app/pages/Post/Post.jsx";
import {ProfileOthersUsers} from "../app/pages/ProfileOthersUsers/ProfileOthersUsers.jsx";
import {Settings} from "../app/pages/Settings/Settings.jsx";
import {EditPost} from "../app/pages/EditPost/EditPost.jsx";
import {ForgetPassEmail} from "../app/pages/ForgetPass/ForgetPassEmail.jsx";

export const AppRouter = () => {
    return (
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/login" element={<Login />}/>
               <Route path="/register" element={<Register />}/>
               <Route path="/createpost/:id" element={<PrivateRoutes><CreatePost /></PrivateRoutes>}/>
               <Route path="/resetpassword/:id/:token" element={<ForgetPass />}/>
               <Route path="/profile" element={<PrivateRoutes><ProfileUser /></PrivateRoutes>}/>
               <Route path="/settings/:id" element={<PrivateRoutes><Settings /></PrivateRoutes>}/>
               <Route path="/post?/:id/:opencomment?" element={<Post />}  />
               <Route path="/profile/:id" element={<ProfileUser />}></Route>
               <Route path="/profile/otheruser/:id" element={<ProfileOthersUsers />}></Route>
               <Route path="/editpost/:id" element={<PrivateRoutes><EditPost /></PrivateRoutes>}></Route>
               <Route path="/forgetpasswordemail" element={<ForgetPassEmail />}/>
           </Routes>
       </BrowserRouter>
    );
};

