#!/bin/sh
VERSION=$1
echo Publishing as version $VERSION
git tag $VERSION
git push origin $VERSION
npm login
npm version --no-git-tag-version $VERSION
npm publish
