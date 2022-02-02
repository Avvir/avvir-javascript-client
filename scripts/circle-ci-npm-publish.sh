#!/usr/bin/env sh

if [[ "${CIRCLE_TAG}" =~ v[0-9]+(\.[0-9]+)* ]]; then
  npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN
  npm --no-git-tag-version version ${CIRCLE_TAG}
  npm publish
else
  echo "Skipping publish, env var CIRCLE_TAG doesn't match."
fi
