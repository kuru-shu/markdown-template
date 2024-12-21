import React, { useState } from 'react';

function MemoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }
    onAdd(title, content);
    setTitle('');
    setContent('');
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default MemoForm;
