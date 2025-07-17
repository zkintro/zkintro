# ZKIntro

An Introduction to Zero Knowledge Proofs And Their Applications

See [zkintro.com](https://zkintro.com)

## Structure

```
.
├── content/          # Markdown content and assets
│   ├── assets/      # Images and other static assets
│   └── en/          # English content
│   └── pt-br/       # Portuguese (Brazilian) content
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

## Translation

The site supports locale-aware routing:

* `/` or `/en` – English
* `/pt-br` – Brazilian Portuguese

### Add a new language
1. Create `content/<locale>/` and add Markdown files with the **same filenames** as English.
2. Add the locale code in `site/next.config.js → i18n.locales`.
3. Run `just build-web` – images are auto-copied from `content/assets/` to `site/public/assets/`.

> Tip: Use absolute image paths in Markdown: `/assets/<file>.png`.

Missing translations simply don't appear in that locale's index. A future `just check-translations` task will flag gaps.

## EPUB (TODO)

EPUB generation is planned. See `just build-epub` for status.
