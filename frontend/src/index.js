import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation, Home, Login } from './components'; // Import the Note component
import SignUp from './components/SignUp';
import Note from "./components/Note";

ReactDOM.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/" element={<Note />} /> {/* Use the Note component here */}
        </Routes>

        <Routes>
            <Route path="/login/" element={<Login />} />
            <Route path="/signup/" element={<SignUp />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
