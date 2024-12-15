document.getElementById('insert-template').addEventListener('click', () => {
  chrome.storage.local.get('markdownTemplate', ({ markdownTemplate }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: insertMarkdown,
        args: [markdownTemplate],
      });
    });
  });
});

function insertMarkdown(template) {
  const textarea = document.querySelector('[name="pull_request[body]"]');
  if (textarea) {
    textarea.value = template;
  } else {
    alert('No textarea found on this page!');
  }
}

document.getElementById('show-template').addEventListener('click', () => {
  chrome.storage.local.get('markdownTemplate', ({ markdownTemplate }) => {
    document.getElementById('saved-text').value = markdownTemplate;
  });
});

document.addEventListener('DOMContentLoaded', init);

function init() {
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addMemo);

  loadMemos();
}

function loadMemos() {
  chrome.storage.local.get(['memos'], (result) => {
    const memos = result.memos || [];
    renderMemos(memos);
  });
}

function renderMemos(memos) {
  const container = document.getElementById('listContainer');
  container.innerHTML = '';

  memos.forEach((memo, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const title = document.createElement('h2');
    title.textContent = memo.title;

    const content = document.createElement('p');
    content.textContent = memo.content;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editMemo(index, memo));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteMemo(index));

    div.appendChild(title);
    div.appendChild(content);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    container.appendChild(div);
  });
}

function addMemo() {
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === '' || content === '') {
    alert('Title and content are required.');
    return;
  }

  chrome.storage.local.get(['memos'], (result) => {
    const memos = result.memos || [];
    memos.push({title, content});

    chrome.storage.local.set({memos}, () => {
      titleInput.value = '';
      contentInput.value = '';
      loadMemos();
    });
  });
}

function deleteMemo(index) {
  chrome.storage.local.get(['memos'], (result) => {
    const memos = result.memos || [];
    memos.splice(index, 1);
    chrome.storage.local.set({memos}, loadMemos);
  });
}

function editMemo(index, memo) {
  // 簡易な編集機能の例
  const newTitle = prompt('Edit Title', memo.title);
  if (newTitle === null) return;
  const newContent = prompt('Edit Content', memo.content);
  if (newContent === null) return;

  chrome.storage.local.get(['memos'], (result) => {
    const memos = result.memos || [];
    memos[index].title = newTitle;
    memos[index].content = newContent;
    chrome.storage.local.set({memos}, loadMemos);
  });
}
