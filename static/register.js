document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const jsonData = JSON.stringify(formObject);

        try {
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const response = await fetch('/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
                body: jsonData,
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                alert(errorMessage.message); // Display error message to the user
                return;
            }

            window.location.href = '/login/';
        } catch (error) {
            console.error('Error registering:', error);
            alert('An error occurred while registering. Please try again.'); // Display generic error message
        }
    });
});
