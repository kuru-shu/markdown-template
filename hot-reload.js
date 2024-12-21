const source = new EventSource('http://localhost:35730/livereload');
source.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);
  if (data && data.command === 'reload') {
    chrome.runtime.reload();
  }
});
