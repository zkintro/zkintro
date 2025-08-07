# ZKIntro

An Introduction to Zero Knowledge Proofs And Their Applications

See [zkintro.com](https://zkintro.com)

## Structure

```
.
├── content/          # Markdown content and assets
│   ├── assets/      # Images and other static assets
│   ├── en/          # English content
│   ├── pt-br/       # Portuguese (Brazilian) content
│   ├── es/          # Spanish content
│   ├── zh-tw/       # Traditional Chinese (Taiwan) content
|   └── it/          # Italian content
└── site/            # Next.js frontend
```

## Quick Start

See [site/README.md](site/README.md) for frontend setup and development.

## Build

Requires:
- just (build system)
- pandoc (for PDF generation)
- xelatex (for PDF generation)
- node.js (for web build)

```bash
# Build all formats (web + PDF)
just build

# Build web only
just build-web

# Build PDF only
just build-pdf

# Development
just dev

# Clean build artifacts
just clean
```

PDFs will be generated in the `output/pdf` directory.

### PDFs
We generate one PDF per article for each locale:

* `just build-pdfs-en` – builds English PDFs
* `just build-pdfs-es` – builds Spanish PDFs
* `just build-pdfs-zh-tw` – builds Traditional‑Chinese PDFs

All files are written to `output/pdf/`.

## Translation

The site supports locale-aware routing:

* `/` or `/en` – English
* `/pt-br` – Português do Brasil
* `/es` – Español
* `/zh-tw` – 繁體中文
* `/it` – Italian

### Add a new language
1. Create `content/<locale>/` and add Markdown files with the **same filenames** as English.
2. Add the locale code to **lib/locale.js (LOCALES array)** and create wrapper routes under `pages/<locale>/` (see `pages/pt-br/`).
3. Add entry to **components/LocaleMenu.js**.

> Tip: Use relative paths like `../assets/<file>.png`.

Missing translations simply don't appear in that locale's index. A future `just check-translations` task will flag gaps.

## EPUB (TODO)

EPUB generation is planned. See `just build-epub` for status.
