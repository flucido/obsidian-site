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

# Commit and push content changes
cd "$(dirname "$0")"
if git diff --quiet HEAD -- content/ && git ls-files --others --exclude-standard content/ | grep -q .; then
  git add content/
  git commit -m "chore: sync vault content $(date '+%Y-%m-%d %H:%M')"
  git push
  echo "Content pushed."
elif ! git diff --quiet HEAD -- content/; then
  git add content/
  git commit -m "chore: sync vault content $(date '+%Y-%m-%d %H:%M')"
  git push
  echo "Content pushed."
else
  echo "No content changes to push."
fi
