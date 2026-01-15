# YouTube Focus Mode Extension

A Chrome extension designed to help you stay focused by replacing the algorithmic feed on the YouTube homepage with a clean, distraction-free interface.

## Features

- **Blocks the Feed**: Hides the endless scroll of recommendations on the homepage.
- **Search Focused**: Provides a prominent search bar to find exactly what you need.
- **Quick Links**: Easy access to your History, Playlists, and Watch Later.
- **Distraction Awareness**: Gentle reminder text to keep you on track.
- **Visuals**: Designed to match the YouTube aesthetic with support for Dark Mode.

## Installation

1. **Clone or Download** this repository to a folder on your computer.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Toggle **Developer mode** in the top right corner.
4. Click **Load unpacked** in the top left.
5. Select the folder containing this extension's files (the folder with `manifest.json`).

## Usage

- Navigate to [YouTube.com](https://www.youtube.com).
- You will see the "Focus Mode" overlay instead of the usual video feed.
- Use the search bar or quick links to navigate.
- Other pages (video pages, search results, channel pages) are unaffected.

## Files

- `manifest.json`: Extension configuration.
- `content.js`: Main logic to detect the homepage and inject the UI.
- `styles.css`: Styling for the focus overlay and cards.
- `icon.png`: Extension icon.
