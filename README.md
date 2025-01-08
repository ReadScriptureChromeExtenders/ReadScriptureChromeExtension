# Read Scripture Chrome Extension

Chrome Extension that opens the Read Scripture daily Bible reading in a new tab.

<img src="store/ReadScriptureScreenshot-1280x800.png" width="100%" height="auto" style="max-width:640px" />

## Features

- Daily Bible reading plan
- Beautiful, distraction-free reading experience
- Watch related Bible Project videos
- Works offline with caching
- Modern, responsive design

## Installation

### Quick Install
1. Download the [latest release ZIP file](read-scripture-extension-v3.1.4.zip) from this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Drag and drop the ZIP file into the Chrome extensions page

### ~~From Chrome Web Store~~
1. ~~Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/readscripture-extension/EXTENSION_ID)~~
2. ~~Click "Add to Chrome"~~

### For Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/ReadScriptureChromeExtension.git
cd ReadScriptureChromeExtension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build  # For production
# or
npm run dev    # For development
```

4. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` directory from this project

## Development

### Available Scripts

- `npm run dev` - Build for development
- `npm run watch` - Watch for changes and rebuild
- `npm run build` - Build for production
- `npm run lint` - Check for code issues
- `npm run lint:fix` - Fix code issues
- `npm run format` - Format code with Prettier
- `npm run validate` - Run linting and build

### Project Structure

```
src/
├── scripts/
│   ├── api/          # API interactions
│   ├── components/   # UI components
│   └── utils/        # Utilities and helpers
├── static/
│   ├── css/          # Compiled CSS
│   ├── img/          # Images and icons
│   └── scss/         # SCSS source files
├── background.js     # Extension background script
└── manifest.json     # Extension manifest
```

### Building for Production

1. Update version in `package.json` and `src/manifest.json`
2. Run production build:
```bash
npm run build
```
3. The extension will be built to the `dist` directory
4. Create a ZIP file for the Chrome Web Store:
```bash
cd dist && zip -r ../read-scripture-extension-v[VERSION].zip . && cd ..
```

