// Function to get CSRF cookie value
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i + 1) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-note-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/create_note/', true);
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // Include CSRF token

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    window.location.href = '/notes/';
                } else if (xhr.status === 400) {
                    const errorMessage = xhr.responseText;
                    document.getElementById('error-message').textContent = errorMessage;
                } else {
                    console.error('Error creating note:', xhr.status);
                }
            }
        };

        xhr.send(formData);
    });
});
