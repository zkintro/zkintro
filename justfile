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

# Build web
# build-web: prepare-content
#     cd site-astro && npm run build
# NextJS:
build-web:
    cd site && npm run build

# Export NextJS site (static build)
export-web:
    # Clean previous build
    rm -rf site/.next site/out
    # Build and export
    cd site && npm run build && npx next export
    echo "Static site exported to site/out directory"

# Deploy the site to the server using env configuration
deploy-web: export-web
    @echo "[Deploying zkintro.com...]"
    cd site && source .env.production.local && cd out && rsync -avz --delete . $$DEPLOY_USER@$$DEPLOY_HOST:$$DEPLOY_PATH
    @echo "[Done]"
    
# Build PDFs
build-pdf:
    pandoc content/en/*.md \
        --pdf-engine=xelatex \
        --template=template.tex \
        -o output/pdf/zkintro.pdf

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