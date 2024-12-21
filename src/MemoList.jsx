import React from 'react';

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
        <div key={index} style={{border: '1px solid #ccc', padding: '5px', marginBottom: '5px'}}>
          <h2>{memo.title}</h2>
          <p>{memo.content}</p>
          <button onClick={() => handleEdit(index, memo)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
          <button onClick={() => onApply(index)}>Insert</button>
        </div>
      ))}
    </div>
  );
}

export default MemoList;
