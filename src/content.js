chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertMemo') {
    // GitHubのPR編集テキストエリアを探す
    // PR本文編集用のtextareaは以下のようなセレクタで取得できるはずです（変わる可能性あり）
    // 例: name="pull_request[body]" のtextareaを取得
    const textarea = document.querySelector(
      'textarea[name="pull_request[body]"]'
    );
    const element = document.querySelector('.js-previewable-comment-form');
    // 疑似要素:beforeのスタイルを取得
    const beforeStyle = window.getComputedStyle(element, ':before');
    // 疑似要素:afterのスタイルを取得
    const afterStyle = window.getComputedStyle(element, ':after');

    // たとえば:beforeでcontentが特定の値を持つ場合に「編集中」と判定する
    const isEditing =
      beforeStyle.content !== 'none' || afterStyle.content !== 'none';

    if (isEditing && textarea) {
      // 現在の値に追記（改行を挟んで挿入）
      textarea.value = textarea.value
        ? textarea.value + '\n' + message.memo
        : message.memo;
      // textareaに変更イベントを発火させてGitHub側に変更を認識させる
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);

      alert(textarea.value);
      sendResponse({ result: 'success' });
    } else {
      sendResponse({ result: 'error', message: 'Textarea not found' });
    }
    return true; // 非同期応答可能
  }
});
