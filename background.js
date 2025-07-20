chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://www.nytimes.com/games/connections" });
});