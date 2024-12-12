document.getElementById('save-template').addEventListener('click', () => {
  const template = document.getElementById('markdown-template').value;
  chrome.storage.sync.set({ markdownTemplate: template }, () => {
    alert('Template saved!');
  });
});

document.getElementById('insert-template').addEventListener('click', () => {
  chrome.storage.sync.get('markdownTemplate', ({ markdownTemplate }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: insertMarkdown,
        args: [markdownTemplate]
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
