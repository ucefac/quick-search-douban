// 默认搜索 URL
const DEFAULT_SEARCH_URL = "https://www.douban.com/search?q=";

// 创建上下文菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchSelection",
    title: "豆瓣快搜: %s",
    contexts: ["selection"]
  });
});

// 处理菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchSelection") {
    chrome.storage.sync.get({
      searchUrl: DEFAULT_SEARCH_URL
    }, (items) => {
      const searchUrl = items.searchUrl + encodeURIComponent(info.selectionText);
      chrome.tabs.create({ url: searchUrl });
    });
  }
});
