document.addEventListener('DOMContentLoaded', () => {
    const loginAgainLink = document.getElementById('loginAgain');

    loginAgainLink.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/login/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = '/login/'; // Redirect to login page
            } else {
                console.error('Login request failed');
            }
        } catch (error) {
            console.error('Error during login request:', error);
        }
    });
});
