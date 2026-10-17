chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-dropdown-options",
    title: "Copy all dropdown options",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-dropdown-options" && tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "copyDropdown" }, { frameId: info.frameId });
  }
});