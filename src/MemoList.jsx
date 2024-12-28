import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MemoList({ memos, onDelete, onEdit, onApply }) {
  function handleEdit(index, memo) {
    const newTitle = prompt('Edit Title', memo.title);
    if (newTitle === null) return;
    const newContent = prompt('Edit Content', memo.content);
    if (newContent === null) return;
    onEdit(index, newTitle, newContent);
  }

  return (
    <div>
      {memos.map((memo, index) => (
        <div
          key={index}
          // border: 1px, padding: 0.5rem, margin-bottom: 0.5rem
          className="border border-gray-300 p-2 mb-2"
        >
          <h2 className="text-lg font-bold mb-1">{memo.title}</h2>
          <div className="w-full min-h-[100px] border border-gray-300 p-4 rounded bg-gray-100 whitespace-pre-wrap">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {memo.content}
            </ReactMarkdown>
          </div>
          {/* ボタン群 */}
          <button
            onClick={() => handleEdit(index, memo)}
            className="
              border border-gray-300 bg-gray-100
              px-3 py-1 rounded mr-2
              cursor-pointer transition-colors
              hover:bg-gray-200
            "
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            className="
              border border-gray-300 bg-gray-100
              px-3 py-1 rounded mr-2
              cursor-pointer transition-colors
              hover:bg-gray-200
            "
          >
            Delete
          </button>
          <button
            onClick={() => onApply(memo)}
            className="
              border border-gray-300 bg-gray-100
              px-3 py-1 rounded
              cursor-pointer transition-colors
              hover:bg-gray-200
            "
          >
            Insert
          </button>
        </div>
      ))}
    </div>
  );
}

export default MemoList;
