#!/usr/bin/env bash

set -e

echo "Watching files '**/*.yaml' for changes"

npx onchange --initial '**/*.{js,json,md,yaml}' -- \
    npx prettier \
        --write \
        --print-width 80 \
        --prose-wrap always \
        '**/*.{js,json,md,yaml}'