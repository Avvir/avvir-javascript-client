#!/usr/bin/env node
const cp = require("child_process");

function toBumpedVersion(version, type) {
  const regEx = /v(\d+)\.(\d+)\.(\d+)/;
  const matches = version.match(regEx);

  if (type === "major") {
    return "v" + (Number.parseInt(matches[1]) + 1) + ".0.0";
  } else if (type === "minor") {
    return "v" + matches[1] + "." + (Number.parseInt(matches[2]) + 1)  + ".0";
  }

  return "v" + matches[1] + "." + matches[2] + "." + (Number.parseInt(matches[3]) + 1);
}

function getCurrentGitTag() {
  return cp.execSync("git describe --tags --abbrev=0")
    .toString()
    .replace("\n", "");
}

function getCurrentRemoteGitTag() {
  return cp.execSync("git describe origin --tags --abbrev=0")
    .toString()
    .replace("\n", "");
}

function setCurrentGitTag(tag) {
  return cp.execSync(`git tag ${tag}`);
}

function pushCurrentGitTag(tag) {
  return cp.execSync(`git push origin ${tag}`);
}

const bumpType = process.argv.length > 2 ? process.argv[2] : "patch";
const newVersion = toBumpedVersion(getCurrentRemoteGitTag(), bumpType);

cp.execSync(`git stash push -m "Stashing changes to publish ${newVersion}"`);
cp.execSync("git checkout master");
cp.execSync("git pull -r");

if (getCurrentGitTag() === newVersion) {
  console.log(`Local tag ${newVersion} exists, skipping creation`);
} else {
  console.log(`Creating git tag: ${newVersion}`);
  setCurrentGitTag(newVersion);
}

console.log(`Pushing git tag: ${newVersion}`);
pushCurrentGitTag(newVersion);
