# Copy Dropdown Text (Dropdown Copier)

A lightweight **Manifest V3 Google Chrome Extension** that allows you to right-click on any dropdown menu on a webpage and instantly copy all of its option texts directly to your clipboard.

## ✨ Features

- **Right-Click Context Menu:** Quickly extract options using the `"Copy all dropdown options"` menu item.
- **Broad Compatibility:** 
  - Works seamlessly with standard HTML `<select>` dropdowns (even while closed).
  - Supports custom UI dropdowns (`[role="listbox"]`, `[role="menu"]`, `<ul>`, `<ol>`, `.dropdown-menu`, and `.select-items`).
- **Formatted Output:** Automatically calculates the total number of items on the first line, followed by a clean, comma-separated list of options on the next line.
- **Visual Feedback:** Displays a non-intrusive toast notification on the bottom-right of the screen confirming how many options were copied.
- **Iframe Support:** Works inside nested frames (`all_frames: true`).

---

## 📋 Output Example

When you copy a dropdown list, the text saved to your clipboard is formatted like this:

~~~text
Total items: 4
Option One, Option Two, Option Three, Option Four
~~~

---

## 🚀 Installation (Developer Mode)

1. **Clone the repository:**
   ~~~bash
   git clone https://github.com/linarifux/dropdown-copier.git
   ~~~
2. Open **Google Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the cloned `dropdown-copier` folder.

---

## 💡 How to Use

### Standard HTML Dropdowns (`<select>`)
1. Right-click directly on the dropdown menu.
2. Select **Copy all dropdown options** from the context menu.
3. Paste (`Ctrl+V` or `Cmd+V`) anywhere to see your formatted list.

### Custom UI / Modern Framework Dropdowns (React, MUI, Tailwind, etc.)
Many modern web apps only render dropdown items into the page after the menu is opened:
1. **Left-click** the dropdown first so the list of options becomes visible on screen.
2. **Right-click** directly on any of the visible options in the open list.
3. Select **Copy all dropdown options** from the context menu.

---

## 📁 Project Structure

~~~text
dropdown-copier/
├── manifest.json   # Extension configuration and permissions (Manifest V3)
├── background.js   # Service worker that creates and listens to the context menu
├── content.js      # DOM scraper, clipboard handler, and toast notification UI
└── README.md       # Project documentation
~~~

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).