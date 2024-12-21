import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MemoForm({ onAdd, onApply }) {
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

  function handleClear() {
    setTitle('');
    setContent('');
  }

  function handleSaveAndApply() {
    handleSave();
    onApply({ content });
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
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSaveAndApply}>Save and Apply</button>
      <p>プレビュー</p>
      <div
        style={{
          width: '50%',
          border: '1px solid #ccc',
          padding: '1rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default MemoForm;
