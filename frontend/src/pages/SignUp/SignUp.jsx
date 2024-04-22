import "./SignUp.css";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        alert(errorMessage.message);
        return;
      }

      navigate("/login/");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="whole">
    <div className="containr">
        <div className="title">Registration</div>
        <div className="content">
            <form id="registration-form" onSubmit={onSubmit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">First Name</span>
                      <input type="text" name="firstName" placeholder="Enter your first name" required></input>
                    </div>
                    <div className="input-box">
                        <span className="details">Last Name</span>
                        <input type="text" name="lastName" placeholder="Enter your last name" required></input>
                    </div>
                    <div className="input-box">
                        <span className="details">Username</span>
                        <input type="text" name="username" placeholder="Enter your username" required></input>
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="email" name="email" placeholder="Enter your email" required></input>
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input type="password" name="password" placeholder="Enter your password" required></input>
                    </div>
                    <div className="input-box">
                        <span className="details">Confirm Password</span>
                        <input type="password" name="confirmPassword" placeholder="Confirm your password" required></input>
                    </div>
                </div>
                <div className="button">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    </div>
</div>
    </>
  );
}

export default SignUp;
