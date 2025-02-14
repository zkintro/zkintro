#!/bin/bash

# Ensure output directory exists
mkdir -p output/pdf

# Define input and output files
INPUT="content/en/01_friendly-introduction-to-zero-knowledge.md"
OUTPUT="output/pdf/booklet-intro.pdf"
TEMPLATE="build/templates/booklet.tex"
RESOURCE_PATH="content/assets/"

# Run Pandoc to generate PDF
pandoc "$INPUT" -o "$OUTPUT" \
  --template="$TEMPLATE" \
  --table-of-contents \
  --number-sections \
  --number-offset=1,0,0 \
  --pdf-engine=xelatex \
  --indented-code-classes=javascript \
  --highlight-style=monochrome \
  --resource-path="$RESOURCE_PATH" \
  -V documentclass=report \
  -V papersize=A5 \
  -V classoption=twoside \
  -V author="oskarth"

# Confirm completion
echo "✅ PDF generated: $OUTPUT"
