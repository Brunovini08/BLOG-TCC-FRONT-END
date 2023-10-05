import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./privateRoutes";
import Login from "../app/pages/Login/Login.jsx";
import Register from "../app/pages/Register/Register.jsx";
import CreatePost from "../app/pages/CreatePost/CreatePost.jsx";
import ProfileUser from "../app/pages/Profile/ProfileUser.jsx";
import Home from "../app/pages/Home/Home.jsx";
import Support from "../app/pages/Support/Support.jsx";
import {Settings} from "../app/pages/Settings/Settings.jsx";
import {MyPosts} from "../app/pages/MyPosts/MyPosts.jsx";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route path="register" element={<Register />}/>
                </Route>
                <Route path="/">
                    <Route path="support" element={<Support />}/>
                </Route>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/">
                    <Route path="home" element={<Home />}/>
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="createpost" element={<CreatePost />} />
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="profile" element={<ProfileUser />}/>
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="createpost" element={<CreatePost />}/>
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="myposts" element={<MyPosts />}/>
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="settings" element={<Settings />}/>
                </Route>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="signout" element={<Home />}/>
                </Route>
            </Routes>
        </Router>
    );
};

