document.getElementById('save-template').addEventListener('click', () => {
  const template = document.getElementById('markdown-template').value;
  chrome.storage.local.set({ markdownTemplate: template }, () => {
    alert('saved template');
  });
});

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
    alert(markdownTemplate);
    document.getElementById('saved-text').value = markdownTemplate;
  });
});
