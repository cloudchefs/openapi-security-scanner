#!/usr/bin/env bash

set -e

echo "Watching files '**/*.yaml' for changes"

npx onchange --initial '**/*.{json,md,yaml,yml}' -- \
    npx prettier \
        --write \
        --print-width 80 \
        --prose-wrap always \
        '**/*.{json,md,yaml,yml}'