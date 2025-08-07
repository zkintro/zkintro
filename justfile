# Build all formats
all: build-web build-pdf

# Prepare content for Astro build
# prepare-content:
#     mkdir -p site-astro/src/content/articles
#     mkdir -p site-astro/public/static/images
#
#     rsync -a --delete content/en/ site-astro/src/content/articles/
#     rsync -a --delete content/assets/ site-astro/public/static/images/
#
#     # Rewrite image paths for site copy only
#     find site-astro/src/content/articles -name '*.md' -exec sed -i '' 's|\.\./assets/|/static/images/|g' {} +

# Set deployment variables from .env
DEPLOY_USER := `grep DEPLOY_USER .env | cut -d= -f2`
DEPLOY_HOST := `grep DEPLOY_HOST .env | cut -d= -f2`
DEPLOY_PATH := `grep DEPLOY_PATH .env | cut -d= -f2`

# Template for PDF builds
TEMPLATE := "build/templates/booklet.tex"

# Build web
# build-web: prepare-content
#     cd site-astro && npm run build
# NextJS:
build-web:
    cd site && npm run build

# Export NextJS site (static build)
export-web:
    @echo "Starting export process..."
    cd site && npm run optimize-export
    @echo "Static site exported and optimized in site/out directory - CSS and styling preserved"

# Deploy the site to the server
deploy-web: export-web
    @echo "[Deploying zkintro.com...]"
    cd site/out && rsync -avz --delete . {{DEPLOY_USER}}@{{DEPLOY_HOST}}:{{DEPLOY_PATH}}
    @echo "[Done]"
    
# Build PDFs
build-pdf:
    pandoc content/en/*.md \
        --pdf-engine=xelatex \
        --template=template.tex \
        -o output/pdf/zkintro.pdf

# English PDF
build-pdf-en:
    mkdir -p output/pdf
    pandoc content/en/*.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-en.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/zkintro.pdf

# Spanish PDF
build-pdf-es:
    mkdir -p output/pdf
    pandoc content/es/*.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-es.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/zkintro-es.pdf

# Traditional-Chinese PDF
build-pdf-zh-tw:
    mkdir -p output/pdf
    pandoc content/zh-tw/*.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-zh-tw.tex \
        --resource-path=content/assets \
        --include-before-body=build/templates/prelude-zh-tw.tex \
        --pdf-engine=xelatex \
        -o output/pdf/zkintro-zh-tw.pdf

# Build PDFs per article for English
build-pdfs-en:
    @echo "Building individual PDFs for EN…"
    @mkdir -p output/pdf
    pandoc content/en/01_friendly-introduction-to-zero-knowledge.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-en.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/01_friendly-introduction-to-zero-knowledge-en.pdf
    pandoc content/en/02_programming-zkps-from-zero-to-hero.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-en.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/02_programming-zkps-from-zero-to-hero-en.pdf
    pandoc content/en/03_understanding-math-behind-zkps.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-en.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/03_understanding-math-behind-zkps-en.pdf

# Build PDFs per article for Spanish
build-pdfs-es:
    @echo "Building individual PDFs for ES…"
    @mkdir -p output/pdf
    pandoc content/es/01_friendly-introduction-to-zero-knowledge.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-es.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/01_friendly-introduction-to-zero-knowledge-es.pdf
    pandoc content/es/02_programming-zkps-from-zero-to-hero.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-es.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/02_programming-zkps-from-zero-to-hero-es.pdf
    pandoc content/es/03_understanding-math-behind-zkps.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-es.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/03_understanding-math-behind-zkps-es.pdf

# Build PDFs per article for Traditional Chinese  
build-pdfs-zh-tw:
    @echo "Building individual PDFs for ZH‑TW…"
    @mkdir -p output/pdf
    pandoc content/zh-tw/01_friendly-introduction-to-zero-knowledge.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-zh-tw.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/01_friendly-introduction-to-zero-knowledge-zh-tw.pdf
    pandoc content/zh-tw/02_programming-zkps-from-zero-to-hero.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-zh-tw.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/02_programming-zkps-from-zero-to-hero-zh-tw.pdf
    pandoc content/zh-tw/03_understanding-the-math-behind-zkps.md \
        --top-level-division=chapter \
        --template=build/templates/booklet-zh-tw.tex \
        --resource-path=content/assets \
        --pdf-engine=xelatex \
        -o output/pdf/03_understanding-the-math-behind-zkps-zh-tw.pdf

# Development
# dev: prepare-content
#     cd site-astro && npm run dev
# NextJS:
dev:
    cd site && npm run dev

# Clean build artifacts
clean:
    rm -rf site/.next
    rm -rf site/out
    rm -rf output/pdf

# Check translations
check-translations:
    # TODO: Implement translation checking
    echo "Translation checking not yet implemented"

# Build EPUB
build-epub:
    # TODO: Implement EPUB generation
    echo "EPUB generation not yet implemented" 