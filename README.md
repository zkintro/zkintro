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

## PDF Build

Requires:
- pandoc
- xelatex

```bash
# Build all PDFs
./build/scripts/build.sh

# Build specific PDF
./build/scripts/build.sh content/en/01_friendly-introduction-to-zero-knowledge.md
```

PDFs will be generated in the `output/pdf` directory.
