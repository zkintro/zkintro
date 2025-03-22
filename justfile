# Build all formats
all: build-web build-pdf

# Build web
build-web:
    cd site && npm run build

# Build PDFs
build-pdf:
    pandoc content/en/*.md \
        --pdf-engine=xelatex \
        --template=template.tex \
        -o output/pdf/zkintro.pdf

# Development
dev:
    cd site && npm run dev

# Clean build artifacts
clean:
    rm -rf site/.next
    rm -rf output/pdf

# Check translations
check-translations:
    # TODO: Implement translation checking
    echo "Translation checking not yet implemented"

# Build EPUB
build-epub:
    # TODO: Implement EPUB generation
    echo "EPUB generation not yet implemented" 