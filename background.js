if (typeof browser !== 'undefined') {
  // Firefox (WebExtensions API)
  browser.action.onClicked.addListener(() => {
    browser.tabs.create({ url: "https://www.nytimes.com/games/connections" });
  });
} else if (typeof chrome !== 'undefined') {
  // Chrome (Manifest V3)
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "https://www.nytimes.com/games/connections" });
  });
} else {
  console.error("Browser environment not detected for extension background script.");
}