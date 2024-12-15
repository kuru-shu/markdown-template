const welcomePage = './welcome.html';
const mainPage = './main.html';

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: mainPage });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// chrome.tabs.onActivated.addListener(async ({ tabId }) => {
//   const { path } = await chrome.sidePanel.getOptions({ tabId });
//   if (path === welcomePage) {
//     chrome.sidePanel.setOptions({ path: mainPage });
//   }
// });
