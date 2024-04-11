import React, { useState, useEffect } from 'react';

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };

  const addNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newNoteText })
      });
      fetchNotes();
      setNewNoteText('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.length > 0 ? (
          notes.map(note => (
            <li key={note._id}>{note.text}</li>
          ))
        ) : (
          <p>No Notes Yet!</p>
        )}
      </ul>
    </div>
  );
};

export default NotePage;
