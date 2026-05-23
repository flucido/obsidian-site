#!/bin/bash
# Sync vault content into the obsidian-site repo's content/ directory.
# Run from the obsidian-site project root.
# Usage: ./sync.sh [vault-path]
#   vault-path: path to Obsidian vault (default: ~/workspace)

VAULT="${1:-$HOME/workspace}"
CONTENT_DIR="$(dirname "$0")/content"

if [ ! -d "$VAULT/.obsidian" ]; then
  echo "Error: $VAULT does not appear to be an Obsidian vault (no .obsidian folder)"
  exit 1
fi

echo "Syncing from $VAULT → $CONTENT_DIR"

DIRS=("Daily" "Work" "Research" "leads" "Ops" "People" "MEMORY.md")

for dir in "${DIRS[@]}"; do
  SRC="$VAULT/$dir"
  DST="$CONTENT_DIR/$dir"

  if [ -f "$SRC" ]; then
    # Single file
    mkdir -p "$(dirname "$DST")"
    cp "$SRC" "$DST"
    echo "  copied: $dir"
  elif [ -d "$SRC" ]; then
    mkdir -p "$DST"
    cp -r "$SRC"/* "$DST/"
    echo "  synced: $dir/"
  else
    echo "  skipped: $dir (not found)"
  fi
done

echo "Sync complete."
