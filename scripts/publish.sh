#!/bin/bash

MSG=${1:-"update"}

git add . && \
git commit -m "$MSG" && \
git push && \
hexo clean && \
hexo generate && \
hexo deploy

echo "Done!"
