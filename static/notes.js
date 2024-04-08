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

// Function to format date
function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

// Function to display notes
function displayNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear previous notes
    if (notes.length === 0) {
        const noNotesMessage = document.createElement('div');
        noNotesMessage.textContent = 'No notes found';
        noNotesMessage.classList.add('no-notes-message');
        notesContainer.appendChild(noNotesMessage);
        return;
    }
    notes.forEach((note) => {
        console.log("Title length: ", note.title.length); // Додайте цей рядок
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        const truncatedTitle = note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title;
        const truncatedContent = note.content.length > 70 ? `${note.content.substring(0, 70)}...` : note.content;
        const formattedTime = formatDate(new Date(note.date));
        noteDiv.innerHTML = `<div class="details"><p>${truncatedTitle}</p><span>${truncatedContent}</span></div><div class="bottom-content"><span>${formattedTime}</span></div>`;

        noteDiv.addEventListener('click', () => {
            window.location.href = `/view_note/${note.id}/`;
        });

        notesContainer.appendChild(noteDiv);
    });

}

// Function to load notes
function loadNotes() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/notes/', true);
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // Include CSRF token
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const notes = JSON.parse(xhr.responseText);
                displayNotes(notes);
            } else {
                console.error('Error fetching notes:', xhr.status);
            }
        }
    };
    xhr.send();
}

// Main event listener
document.addEventListener('DOMContentLoaded', () => {
    loadNotes(); // Call loadNotes function
});
