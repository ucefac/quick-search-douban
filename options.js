// 保存选项
function saveOptions() {
  const searchUrl = document.getElementById('searchUrl').value;
  chrome.storage.sync.set({
    searchUrl: searchUrl
  }, () => {
    const status = document.getElementById('status');
    status.textContent = '设置已保存';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
}

// 恢复选项
function restoreOptions() {
  chrome.storage.sync.get({
    searchUrl: 'https://www.douban.com/search?q='
  }, (items) => {
    document.getElementById('searchUrl').value = items.searchUrl;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
