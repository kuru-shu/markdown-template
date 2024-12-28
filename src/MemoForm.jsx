import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMde from 'react-simplemde-editor';
import remarkGfm from 'remark-gfm';

// TailwindのCSS ( @tailwind base; @tailwind components; @tailwind utilities; ) を読み込み
import './tailwind.css';

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
    <div className="max-w-[600px] mx-auto my-8 font-sans p-4 border border-gray-300 rounded bg-white">
      <div className="mb-4">
        <label className="block mb-2 font-bold">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full box-border p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold">Content</label>
        <SimpleMde value={content} onChange={(value) => setContent(value)} />
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={handleClear}
          className="border border-gray-300 bg-gray-100 px-3 py-1 cursor-pointer rounded transition-colors hover:bg-gray-200"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="border border-gray-300 bg-gray-100 px-3 py-1 cursor-pointer rounded transition-colors hover:bg-gray-200"
        >
          Save
        </button>
        <button
          onClick={handleSaveAndApply}
          className="border border-gray-300 bg-gray-100 px-3 py-1 cursor-pointer rounded transition-colors hover:bg-gray-200"
        >
          Save and Apply
        </button>
      </div>

      <div className="mb-4">
        <p className="m-0 mb-2 font-bold">プレビュー</p>
        <div className="w-full min-h-[100px] border border-gray-300 p-4 rounded bg-gray-100 whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MemoForm;
