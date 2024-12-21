import React, { useEffect, useState } from 'react';
import MemoForm from './MemoForm';
import MemoList from './MemoList';
import Tabs from './Tabs';

function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    loadMemos();
  }, []);

  function loadMemos() {
    chrome.storage.local.get(['memos'], (result) => {
      setMemos(result.memos || []);
    });
  }

  function addMemo(title, content) {
    const newMemos = [...memos, { title, content }];
    chrome.storage.local.set({ memos: newMemos }, () => {
      setMemos(newMemos);
    });
  }

  function deleteMemo(index) {
    const newMemos = [...memos];
    newMemos.splice(index, 1);
    chrome.storage.local.set({ memos: newMemos }, () => {
      setMemos(newMemos);
    });
  }

  function editMemo(index, newTitle, newContent) {
    const newMemos = [...memos];
    newMemos[index] = { title: newTitle, content: newContent };
    chrome.storage.local.set({ memos: newMemos }, () => {
      setMemos(newMemos);
    });
  }

  function applyMemo(index) {
    const memo = memos[index];
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const url = tabs[0].url;
        const prPagePattern = /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+/;
        if (!prPagePattern.test(url)) {
          alert('このページでは無効です');
          return;
        }
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'insertMemo', memo: memo.content },
          (response) => {
            if (chrome.runtime.lastError) {
              alert('Failed to communicate with content script.');
              return;
            }
            if (response && response.result === 'success') {
              console.log('Inserted successfully');
            } else {
              console.log('Failed to insert');
            }
          }
        );
      }
    });
  }

  return (
    <div>
      <h1>Markdown Templates</h1>
      <Tabs
        tabs={[
          { id: 'create', label: 'Create' },
          { id: 'list', label: 'List' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 'create' && <MemoForm onAdd={addMemo} />}
      {activeTab === 'list' && (
        <MemoList
          memos={memos}
          onDelete={deleteMemo}
          onEdit={editMemo}
          onApply={applyMemo}
        />
      )}
    </div>
  );
}

export default App;
