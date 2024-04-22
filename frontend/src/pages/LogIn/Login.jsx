import "./LogIn.css";
import {useNavigate} from "react-router-dom";


function LogIn({onLogin}) {
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const jsonData = JSON.stringify(formObject);

        const response = await fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            alert(errorMessage.message);
            return;
        }
        const data = await response.json();
        onLogin(data.user_id);
        navigate("/");
    };

    return (
        <>
            <div className="wholepart">
                <div className="containers">
                    <div className="title">User Login</div>
                    <div id="error-message" className="error-message" style={{display: "none"}}></div>
                    <form id="login-form" onSubmit={onSubmit}>

                        <div className="row">
                            <i className="fa fa-user"></i>
                            <input type="text" id="username" name="username" placeholder="Username" required></input>
                        </div>
                        <div className="row">
                            <i className="fa fa-lock"></i>
                            <input type="password" id="password" name="password" placeholder="Password" required></input>
                        </div>
                        <div className="row bottom">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <div className="linksign">
                        <p>Don't have an account? <a href="/register/">Register here</a></p>
                    </div>
                </div>
            </div>
        </>
);
}

export default LogIn;
