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
    // container 相当:
    // max-width: 600px, margin: 2rem auto, font-family: sans-serif, padding: 1rem,
    // border: 1px solid #ccc, border-radius: 4px, background-color: #fff
    <div
      className="
      max-w-[600px]
      mx-auto
      my-8
      font-sans
      p-4
      border
      border-gray-300
      rounded
      bg-white
    "
    >
      {/* タイトル入力 */}
      {/* formGroup 相当: margin-bottom: 1rem */}
      <div className="mb-4">
        {/* label: block, margin-bottom: 0.5rem, font-weight: bold */}
        <label className="block mb-2 font-bold">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // テキストボックス: w-full, padding, border, rounded, focusスタイル等
          className="
            w-full
            box-border
            p-2
            text-base
            border
            border-gray-300
            rounded
            focus:outline-none
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-200
          "
        />
      </div>

      {/* コンテンツ入力 */}
      <div className="mb-4">
        <label className="block mb-2 font-bold">Content</label>
        <SimpleMde value={content} onChange={(value) => setContent(value)} />
      </div>

      {/* ボタン群 */}
      {/* buttonGroup 相当: margin-bottom: 1.5rem, display: flex, gap: 0.5rem */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={handleClear}
          className="
            border
            border-gray-300
            bg-gray-100
            px-3
            py-1
            cursor-pointer
            rounded
            transition-colors
            hover:bg-gray-200
          "
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="
            border
            border-gray-300
            bg-gray-100
            px-3
            py-1
            cursor-pointer
            rounded
            transition-colors
            hover:bg-gray-200
          "
        >
          Save
        </button>
        <button
          onClick={handleSaveAndApply}
          className="
            border
            border-gray-300
            bg-gray-100
            px-3
            py-1
            cursor-pointer
            rounded
            transition-colors
            hover:bg-gray-200
          "
        >
          Save and Apply
        </button>
      </div>

      {/* プレビュー */}
      {/* previewGroup 相当 */}
      <div className="mb-4">
        {/* p: margin: 0 0 0.5rem, font-weight: bold */}
        <p className="m-0 mb-2 font-bold">プレビュー</p>
        {/* previewBox 相当: width: 100%, min-height: 100px, border: 1px, padding: 1rem, rounded, bg-gray-100, whitespace-pre-wrap */}
        <div
          className="
          w-full
          min-h-[100px]
          border
          border-gray-300
          p-4
          rounded
          bg-gray-100
          whitespace-pre-wrap
        "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MemoForm;
