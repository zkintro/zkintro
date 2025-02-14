#!/bin/bash

# Ensure output directory exists
mkdir -p output/pdf

# Define common variables
TEMPLATE="build/templates/booklet.tex"
RESOURCE_PATH="content/assets/"

# If no arguments are provided, build all Markdown files in content/en
if [ "$#" -eq 0 ]; then
  FILES=(content/en/*.md)
else
  FILES=()
  for arg in "$@"; do
    # Allow the user to pass either a full path or just the file name
    if [ -f "$arg" ]; then
      FILES+=("$arg")
    else
      FILES+=("content/en/$arg")
    fi
  done
fi

# Loop over each file and generate a corresponding PDF
for INPUT in "${FILES[@]}"; do
  # Derive the output PDF name from the input file basename
  BASENAME=$(basename "$INPUT" .md)
  OUTPUT="output/pdf/${BASENAME}.pdf"
  
  echo "Building PDF for: $INPUT"
  
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

  echo "✅ PDF generated: $OUTPUT"
done
