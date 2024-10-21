# 🎓 CiteClick: Your Scholar Citation Companion 📚

![CiteClick Logo](icon128.png)

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/yourusername/citeclick)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Access to Google Scholar Citations

CiteClick is a browser extension that lets you effortlessly monitor Google Scholar citation counts for multiple researchers. Stay up-to-date with the latest impact of your favorite scholars!

---

## 🌟 Features

- 📊 Real-time citation counts
- 👥 Track multiple researchers
- 🏆 Ranking system for quick comparisons
- 🔄 One-click updates
- 💾 Local storage for offline access

---

## 🛠 Installation

1. Clone this repository or download the ZIP file
2. Open your browser's extension management page
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Firefox: `about:addons`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

---

## 🖱 How to Use

1. Click the CiteClick icon in your browser toolbar
2. View the list of tracked scholars and their citation counts
3. Click "Update Citations" to refresh the data

---

## 🎨 Customization

Want to track different scholars? Edit the `config.js` file:

```javascript
const config = {
  scholarIds: [
    'pufsZewAAAAJ', // Your favorite researcher
    'vAx7VsoAAAAJ', // Another brilliant mind
    // Add more Google Scholar IDs here
  ]
};
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
