const notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesList = document.getElementById('notesList');
const noteEditor = document.getElementById('noteEditor');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNote');
const deleteNoteBtn = document.getElementById('deleteNote');
const copyNoteBtn = document.getElementById('copyNote');
const addNoteBtn = document.getElementById('addNote');
let currentNoteIndex = null;

// Function to render notes in the list
function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerText = note.title || `${note.content.substring(0, 20)}...`; // Show title or preview
        noteElement.onclick = () => openNoteEditor(index);
        notesList.appendChild(noteElement);
    });
}

// Function to open the note editor
function openNoteEditor(index) {
    currentNoteIndex = index;
    const note = notes[index];
    noteTitle.value = note.title;
    noteContent.value = note.content;
    notesList.style.display = 'none';
    noteEditor.classList.remove('hidden');
    addNoteBtn.style.display = 'none'; // Hide add note button
    copyNoteBtn.style.display = 'inline-block'; // Show copy button if editing
    deleteNoteBtn.style.display = 'inline-block'; // Show delete button if editing
}

// Back button functionality
document.getElementById('backBtn').onclick = () => {
    noteEditor.classList.add('hidden');
    notesList.style.display = 'block';
    addNoteBtn.style.display = 'block'; // Show add note button again
};

// Event listener for the '+' button
addNoteBtn.onclick = () => {
    currentNoteIndex = null;
    noteTitle.value = '';
    noteContent.value = '';
    notesList.style.display = 'none';
    noteEditor.classList.remove('hidden');
    addNoteBtn.style.display = 'none'; // Hide add note button
    deleteNoteBtn.style.display = 'none'; // Hide delete button
    copyNoteBtn.style.display = 'none'; // Hide copy button
};

// Event listener for the save button
saveNoteBtn.onclick = () => {
    const title = noteTitle.value;
    const content = noteContent.value;

    if (title.trim() === '' && content.trim() === '') {
        alert('Note title and content cannot be empty!');
        return; // Don't save if both are empty
    }

    if (currentNoteIndex !== null) {
        notes[currentNoteIndex] = { title, content };
    } else {
        notes.push({ title, content });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    noteEditor.classList.add('hidden');
    notesList.style.display = 'block';
    addNoteBtn.style.display = 'block'; // Show add note button again
};

// Event listener for the delete button
deleteNoteBtn.onclick = () => {
    if (currentNoteIndex !== null) {
        notes.splice(currentNoteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        noteEditor.classList.add('hidden');
        notesList.style.display = 'block';
        addNoteBtn.style.display = 'block'; // Show add note button again
    }
};

// Event listener for the copy button
copyNoteBtn.onclick = () => {
    navigator.clipboard.writeText(noteContent.value);
};

// Render initial notes
renderNotes();
