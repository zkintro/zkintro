# ZKIntro

An Introduction to Zero Knowledge Proofs And Their Applications

See [zkintro.com](https://zkintro.com)

## Structure

```
.
├── content/          # Markdown content and assets
│   ├── assets/      # Images and other static assets
│   └── en/          # English content
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

## Translation (TODO)

Translation support is planned. See `just check-translations` for status.

## EPUB (TODO)

EPUB generation is planned. See `just build-epub` for status.
