import React from 'react';
import  './LogOut.css';

function LogOut({logOut}) {
  const handleLoginAgain = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/logout/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        logOut();
        window.location.href = '/login/'; // Redirect to login page
      } else {
        console.error('Logout request failed');
      }
    } catch (error) {
      console.error('Error during logout request:', error);
    }
  };

  return (
    <div>
      <div className="wh">
        <div className="cont">
          <div className="title">Logged Out</div>
          <div className="message">
            <p>You have been successfully logged out of your account.</p>
            <p>
              <a href="http://127.0.0.1:3000/login/" id="loginAgain" onClick={handleLoginAgain}>Log in again</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
