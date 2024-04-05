document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('create-note-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(form);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/create_note/', true);
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // Include CSRF token

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    window.location.href = '/notes/';
                } else if (xhr.status === 400) {
                    var errorMessage = xhr.responseText;
                    document.getElementById('error-message').textContent = errorMessage;
                } else {
                    console.error('Error creating note:', xhr.status);
                }
            }
        };

        xhr.send(formData);
    });

    // Function to get CSRF cookie value
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});