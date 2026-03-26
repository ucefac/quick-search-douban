// 默认搜索 URL
const DEFAULT_SEARCH_URL = "https://www.douban.com/search?q=";

// 创建上下文菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchSelection",
    title: "豆瓣快搜：'%s'",
    contexts: ["selection"]
  });
});

// 处理菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchSelection") {
    chrome.storage.sync.get({
      enabled: true,
      searchUrl: DEFAULT_SEARCH_URL
    }, (items) => {
      if (items.enabled) {
        const searchUrl = items.searchUrl + encodeURIComponent(info.selectionText);
        chrome.tabs.create({ url: searchUrl });
      }
    });
  }
});

// 监听设置更新
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SETTINGS_UPDATED') {
    // 重新创建上下文菜单以反映启用/禁用状态
    chrome.contextMenus.removeAll(() => {
      if (message.settings.enabled) {
        chrome.contextMenus.create({
          id: "searchSelection",
          title: "豆瓣快搜：'%s'",
          contexts: ["selection"]
        });
      }
    });
    sendResponse({ success: true });
  }
  return true;
});
