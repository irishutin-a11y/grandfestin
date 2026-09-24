#!/bin/bash
# Compile components/*.jsx → build/*.js (voir tools/build.js). À lancer après
# toute modification d'un .jsx, avant de tester ou de committer.
cd "$(dirname "$0")/.." && osascript -l JavaScript tools/build.js "$(pwd)"
