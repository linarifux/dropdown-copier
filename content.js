let lastRightClickedElement = null;

// Track the element the user right-clicks on
document.addEventListener("contextmenu", (event) => {
  lastRightClickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyDropdown" && lastRightClickedElement) {
    const texts = extractDropdownTexts(lastRightClickedElement);
    
    if (texts.length > 0) {
      // Include the total count on the first line, followed by a newline and comma-separated items
      const output = `Total items: ${texts.length}\n` + texts.join(", ");
      copyToClipboard(output);
      showToast(`Copied ${texts.length} options to clipboard!`);
    } else {
      showToast("No dropdown options found on this element.", true);
    }
  }
});

function extractDropdownTexts(el) {
  // 1. Check for standard HTML <select> element
  const select = el.closest("select");
  if (select) {
    return Array.from(select.options)
      .map(opt => opt.text.trim())
      .filter(Boolean);
  }

  // 2. Check for custom dropdowns (ARIA listbox, menu, or ul/ol lists)
  const customMenu = el.closest('[role="listbox"], [role="menu"], ul, ol, .dropdown-menu, .select-items');
  if (customMenu) {
    const items = customMenu.querySelectorAll('[role="option"], [role="menuitem"], li, .dropdown-item');
    if (items.length > 0) {
      return Array.from(items)
        .map(item => item.innerText.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    // Fallback if clipboard API is restricted on the page
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  });
}

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: isError ? "#d9534f" : "#28a745",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    zIndex: "999999",
    fontFamily: "sans-serif",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}