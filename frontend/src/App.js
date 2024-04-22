import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import LogIn from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/Notes";
import Logout from "./pages/LogOut/Logout";
import logo from "./images/logo.png"

function App() {
    const [userId, setUserId] = useState(Cookies.get("user_id"));

    const logOut = () => {
        setUserId(null);
        Cookies.remove("user_id");
    };

    const onLogin = (val) => {
        setUserId(val);
        Cookies.set("user_id", val, {path: "/"});
    };

    return (
        <Router>
            <header>
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <nav>
                    <ul>
                        {userId ? (
                            <>
                                <li><a href="/notes/">Notes</a></li>
                                <li><a href="/logout/">Log Out</a></li>
                            </>
                        ) : (
                            <>
                                <li><a href="/">Home</a></li>
                                <li><a href="/register/">Sign up</a></li>
                                <li><a href="/login/">Sign In</a></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogIn onLogin={onLogin}/>}/>
                <Route path="/logout/" element={<Logout logOut = {logOut}/>} />
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/notes/" element={<Notes/>}/>

            </Routes>

        </Router>
    );
}

export default App;
