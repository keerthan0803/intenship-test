#!/usr/bin/env bash
set -e

# Simple Render build script: produce a 'public' folder containing site files
rm -rf public
mkdir -p public/assets

# If your main page is home.html, copy it to public/index.html
if [ -f "home.html" ]; then
  cp home.html public/index.html
fi

# Copy CSS and assets
if [ -f "style.css" ]; then
  cp style.css public/
fi
if [ -d "assets" ]; then
  cp -R assets public/
fi

# Copy any other top-level HTML files (optional)
for f in *.html; do
  if [ "$f" != "home.html" ]; then
    cp "$f" public/ || true
  fi
done

ls -la public
