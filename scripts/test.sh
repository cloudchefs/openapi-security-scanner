#!/usr/bin/env bash

set -e

npx prettier \
    --list-different \
    --print-width 80 \
    --prose-wrap always \
    '**/*.{json,md,yaml,yml}'

npx standard

npx lerna bootstrap

npx lerna run test \
    --stream