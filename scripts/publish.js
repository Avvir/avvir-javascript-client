#!/usr/bin/env node
const cp = require("child_process");
const readline = require("readline");
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
  return cp.execSync("git tag --list 'v*' --sort=version:refname | tail -1")
    .toString()
    .replace("\n", "");
}
function getLatestGitCommits(tag) {
  let commitRegex = /Author:\s+(?<author>.+?)\nDate:\s+(?<date>.+?)\n\n\s+(?<message>.+)/
  let typeRegex = /\[\s*(?<type>Breaking|Fix|Feature)(\s+Change)?\s*\]\s*(?<message>.+)/i
  return cp.execSync(`git log ${tag}..HEAD`)
    .toString()
    .split(/commit [a-z0-9]+(\s\(.+\))?\n/g)
    .filter(commit => !!commit)
    .map(commit => {
      let { groups } = commit.match(commitRegex);
      let { type, message } = commit.match(typeRegex)?.groups || {type: "unknown", message: groups.message }
      return {
        ...groups,
        message,
        type: type.toLowerCase()
      }
    });
}

function getTagReleaseNotes (tag) {
  const commits = getLatestGitCommits(tag);
  const changes = commits.reduce((changes, commit)=>{
    changes[commit.type].push("- "+commit.message);
    return changes
  }, {
    breaking: [],
    fix: [],
    feat: [],
    unknown: []
  });
  let releaseNotes = "";
  let type = "patch";
  if(changes.breaking.length) {
    type = "major"
    releaseNotes += `Breaking Changes:\n${changes.breaking.join("\n")}`
  }
  if(changes.feat.length) {
    if(type !== "major") type = "minor"
    releaseNotes += `${releaseNotes.length?"\n":""}Features:\n${changes.feat.join("\n")}`
  }
  if(changes.fix.length) {
    releaseNotes += `${releaseNotes.length?"\n":""}Fixes:\n${changes.fix.join("\n")}`
  }
  if(changes.unknown.length) {
    releaseNotes += `${releaseNotes.length?"\n":""}Unclassified:\n${changes.unknown.join("\n")}`
  }
  return {
    type,
    releaseNotes
  };
}
function setCurrentGitTag(tag, message="") {
  return cp.execSync(`git tag -m ${message} ${tag}`);
}

function pushCurrentGitTag(tag) {
  return cp.execSync(`git push origin ${tag}`);
}

async function confirmQuestion(rl, question) {
  const response = await new Promise(resolve => rl.question(`\n${question} (y/n) `, response => {
    resolve(response);
  }));
  return ["y", "yes"].includes(response.toLowerCase())
}
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (await confirmQuestion(rl, "Have you merged your new code into master yet?")) {
    cp.execSync("git fetch --tags");
    const currentTag = getCurrentGitTag();
    const {releaseNotes, type} = getTagReleaseNotes(currentTag);
    const bumpType = process.argv.length > 2 ? process.argv[2] : type;
    const newVersion = toBumpedVersion(currentTag, bumpType);
    const changeLog = `Release ${newVersion}:\n${releaseNotes}`
    let confirmed = await confirmQuestion(rl, `Validate the changelog before publishing: \n\n${changeLog}\n\n\n Is this correct?`)
    if(!confirmed) return rl.close();
    if(type !== bumpType) {
      confirmed = await confirmQuestion(rl, `There are "${type}" changes in this release. Are you sure you want to publish a "${bumpType}" release?`);
      if(!confirmed) return rl.close();
    }
    cp.execSync(`git stash push -m "Stashing changes to publish ${newVersion}"`);
    cp.execSync("git checkout master");
    cp.execSync("git pull -r");

    console.log(`Creating git tag: ${newVersion}`);
    setCurrentGitTag(newVersion, changeLog);

    console.log(`Pushing git tag: ${newVersion}`);
    pushCurrentGitTag(newVersion);
  } else {
    console.log("Publishing to npm requires the new code to already be merged into master");
  }
}

main();