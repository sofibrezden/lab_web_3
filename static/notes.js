document.addEventListener('DOMContentLoaded', function () {
    loadNotes();

    function loadNotes() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/notes/', true);
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // Include CSRF token
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let notes = JSON.parse(xhr.responseText);
                    displayNotes(notes);
                } else {
                    console.error('Error fetching notes:', xhr.status);
                }
            }
        };
        xhr.send();
    }

    function displayNotes(notes) {
        let notesContainer = document.getElementById('notes-container');
        notesContainer.innerHTML = ''; // Clear previous notes
        if (notes.length === 0) {
            let noNotesMessage = document.createElement('div');
            noNotesMessage.textContent = 'No notes found';
            noNotesMessage.classList.add('no-notes-message');
            notesContainer.appendChild(noNotesMessage);
            return;
        }
        notes.forEach(function (note) {
            let noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            let truncatedContent = note.content.length > 70 ? note.content.substring(0, 70) + '...' : note.content;
            let formattedTime = formatDate(new Date(note.date));
            noteDiv.innerHTML = '<div class="details"><p>' + note.title + '</p><span>' + truncatedContent + '</span></div><div class="bottom-content"><span>' + formattedTime + '</span></div>';

            noteDiv.addEventListener('click', function () {
                window.location.href = '/view_note/' + note.id + "/";
            });

            notesContainer.appendChild(noteDiv);
        });
    }

    function formatDate(date) {
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    // Function to get CSRF cookie value
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
