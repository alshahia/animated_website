#!/usr/bin/env bash
# bin/lint-design.sh — advisory lint for am-design mockups
#
# Flags inline hex colors and emoji outside :root / [data-theme] blocks in HTML files.
# Advisory only — does NOT fail CI. Run after bin/check.sh.
#
# Usage:
#   bash bin/lint-design.sh [path]
#
# Default path: examples/
#
# Exit codes:
#   0 — no violations found
#   1 — violations found (still passes CI; informational only)
#   2 — error (path not found, etc.)

set -euo pipefail

PATH_TO_CHECK="${1:-examples/}"

if [[ ! -d "$PATH_TO_CHECK" ]]; then
  echo "ERROR: path not found: $PATH_TO_CHECK" >&2
  exit 2
fi

mapfile -t HTML_FILES < <(find "$PATH_TO_CHECK" -type f -name '*.html' 2>/dev/null || true)

if [[ ${#HTML_FILES[@]} -eq 0 ]]; then
  echo "No HTML files found under $PATH_TO_CHECK"
  exit 0
fi

VIOLATIONS=0

echo "Linting ${#HTML_FILES[@]} HTML files under $PATH_TO_CHECK ..."
echo

# Check 1: inline hex outside :root { ... } or [data-theme] { ... } blocks.
# Block scope tracked via brace depth across the whole file (single awk pass).
# Hex inside any such block is treated as a token-system declaration and skipped.
# Note: ~20 advisory findings on agents_manager/design/resources/mockup-templates/
# are intentional (brand-book palette swatches + window-chrome mockup colors +
# mockup annotation note highlights). The brand-book IS the token source; the
# chrome is decorative. Tokenizing them would defeat the purpose of those
# mockups. False-positive exclusions below cover SVG attributes, comments,
# table-data `#xxxx` values (e.g. order numbers), and currentColor.
for file in "${HTML_FILES[@]}"; do
  awk -v file="$file" '
    BEGIN { in_token = 0; depth = 0 }
    {
      line = $0
      opens = gsub(/[{]/, "x", line)
      closes = gsub(/[}]/, "x", line)
      opened_now = (match($0, /:root[[:space:]]*[{]|[[]data-theme[^{]*[{]/) > 0) ? 1 : 0
      was_in_token = in_token
      depth += opens - closes
      if (opened_now) { in_token = 1; if (depth < 1) depth = 1 }
      if (in_token && depth <= 0) { in_token = 0; depth = 0 }
      if (was_in_token || opened_now) next
      if ($0 ~ /#[0-9a-fA-F]{3,6}/ \
          && $0 !~ /var\(--/ \
          && $0 !~ /fill="none"/ \
          && $0 !~ /stroke="none"/ \
          && $0 !~ /<!--/ \
          && $0 !~ /fill="currentColor"/ \
          && $0 !~ /stroke="currentColor"/ \
          && $0 !~ /<td>/ \
          && $0 !~ /<th>/) {
        print "  [HEX] " file ":" NR " -- inline hex outside token system"
        print "         " $0
      }
    }
  ' "$file"
done | tee /tmp/lint-design-hex.out >/dev/null
HEX_COUNT=$(grep -c '^\s*\[HEX\]' /tmp/lint-design-hex.out || true)
VIOLATIONS=$((VIOLATIONS + HEX_COUNT))

# Check 2: emoji in UI markup (decorative).
# Common emoji ranges; skip if inside Arabic Quran text with Quran glyphs.
EMOJI_PATTERN=$'\xF0\x9F[\x8C-\x9F][\x80-\xBF]|\xE2[\x98-\x9C][\x80-\xBF]'
for file in "${HTML_FILES[@]}"; do
  EMOJI_HITS=$(grep -nP "$EMOJI_PATTERN" "$file" 2>/dev/null \
    | grep -vE '<!--' \
    || true)
  if [[ -n "$EMOJI_HITS" ]]; then
    while IFS= read -r hit; do
      line_num=$(echo "$hit" | cut -d: -f1)
      context=$(sed -n "${line_num}p" "$file" 2>/dev/null || true)
      if echo "$context" | grep -qE 'class="ar-q"|class="[^"]*ar-q'; then
        continue
      fi
      echo "  [EMOJI] $file:$line_num -- emoji in UI (use SVG instead)"
      echo "           $hit"
      VIOLATIONS=$((VIOLATIONS + 1))
    done <<< "$EMOJI_HITS"
  fi
done

echo
if [[ $VIOLATIONS -eq 0 ]]; then
  echo "OK: ${#HTML_FILES[@]} HTML files passed lint."
  exit 0
else
  echo "FOUND: $VIOLATIONS violation(s) in ${#HTML_FILES[@]} files."
  echo "(Advisory only — does not fail CI. Review and decide per case.)"
  exit 1
fi