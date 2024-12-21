chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertMemo') {
    const textarea = document.querySelector(
      'textarea[name="pull_request[body]"]'
    );
    const isEditing = !!document.querySelector('.is-comment-editing');

    if (!isEditing) {
      alert('編集中のみ有効です');
    }

    if (isEditing && textarea) {
      textarea.value = message.memo;
      // textareaに変更イベントを発火させてGitHub側に変更を認識させる
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
      sendResponse({ result: 'success' });
    } else {
      sendResponse({ result: 'error', message: 'Textarea not found' });
    }
    return true; // 非同期応答可能
  }
});
