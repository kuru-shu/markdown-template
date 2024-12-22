const mainPage = 'dist/main.html';

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: mainPage });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
