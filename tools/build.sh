#!/bin/bash
# Compile components/*.jsx → build/*.js (voir tools/build.js). À lancer après
# toute modification d'un .jsx, avant de tester ou de committer.
# macOS : moteur JavaScript du système (osascript). Ailleurs : Node (build-node.js).
cd "$(dirname "$0")/.."
if command -v osascript >/dev/null 2>&1; then
  osascript -l JavaScript tools/build.js "$(pwd)"
else
  node tools/build-node.js
fi
