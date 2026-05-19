# 📝 Markdown Preview PDF Exporter

A modern, responsive Markdown Editor that provides a live preview and allows you to easily export your markdown documents to high-quality PDF files. Built with React and Vite.

## ✨ Features

- **Live Markdown Preview**: See your changes in real-time as you type.
- **Perfect PDF Export**: Export the live preview exactly as it appears into a cleanly formatted, multi-page PDF (powered by `html2pdf.js`).
- **GitHub Flavored Markdown (GFM)**: Full support for tables, task lists, blockquotes, links, and more.
- **Syntax Highlighting**: Beautiful code block highlighting for multiple languages via `highlight.js`.
- **Drag & Drop**: Easily upload local `.md` files by dragging them onto the window.
- **Customizable UI**: Toggle between Light and Dark Mode (preference saved locally).
- **Productivity Tools**: One-click actions to copy markdown, clear editor, or expand preview to fullscreen.
- **Fully Responsive**: Optimized for seamless use on any device size.

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - Frontend UI library
- **[Vite](https://vitejs.dev/)** - Fast build tooling and dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Strict typing for scalable code
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling logic
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - React component for markdown rendering
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** & **[rehype-highlight](https://github.com/rehypejs/rehype-highlight)** - Markdown structural styling
- **[html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)** - Client-side HTML to PDF generation

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or newer recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kh-ub-ayb/md-preview-to-pdf.git
   cd md-preview-to-pdf
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to `http://localhost:5173`.

## 📖 How to Use

1. **Write Markdown:** Use the editor on the left to write standard or GitHub Flavored Markdown.
2. **Upload a File:** Click the **Upload .md** button or simply drag a markdown file anywhere onto the page to load it.
3. **Download PDF:** Click the **Export PDF** button. The app will generate a clean A4 PDF mapping exactly to what you see in the Markdown Preview window.
4. **Layout & Theme:** Use the top toolbar to swap into Dark Mode (🌙) or maximize the preview view to Fullscreen (🖥️).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
