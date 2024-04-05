document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    const jsonData = JSON.stringify(formObject);

    try {
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
        },
        body: jsonData
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerText = errorMessage.error; // Display error message to the user
        return;
      }
      window.location.href = '/'; // Redirect to home page upon successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.'); // Display generic error message
    }
  });
});