# Setup

`git clone git@github.com:Avvir/avvir-javascript-client.git javascript-client`
`yarn install`

In webstorm mocha configuration template:
 - set AVVIR_ENVIRONMENT to acceptance `AVVIR_ENVIRONMENT=acceptance`

For running integration tests you will also need to set these env vars:

AVVIR_SANDBOX_EMAIL
AVVIR_SANDBOX_PASSWORD
AVVIR_SANDBOX_PROJECT_ID

## Committing Changes

After making changes to the code, by adding a semantic labels to your commit message, it allows the publishing 
script to detect which type of release to publish. Use the following labels:
- [Breaking]
- [Fix]
- [Feature]
These labels can be put anywhere within the commit message. 

Example: 
```shell
$ git commit -m "Some breaking change [Breaking]"
$ git commit -m "[Fix] Some patch"
```
## Publishing to NPM

To publish to NPM (assuming you have the permission to create git tags), run the publish script:
```shell
$ ./scripts/publish.js
```

The script will stash any uncommitted changes, switch to the master branch, and push a git tag to the repository.
This will trigger Circle CI to run a job that will publish to the NPM registry if the tests pass.
The version in package.json is intentionally set to 0.0.0 because the version is controlled by the most recent git tag version.

The publish script can automatically detect which version to bump to release to by reading through the commit
log after the latest tag (using [semantic labels](#Committing-Changes)).

To override this behavior, supply either `patch`, `minor`, or `major` argument to the script to force it 
to bump the appropriate version number. 

Example: 
```shell
$ ./scripts/publish.js minor
$ ./scripts/publish.js major
```

## Testing Locally Before Publishing

To publish the library locally (ie. on your machine only), run the following *one time* while in the base directory of this repo:
```shell
yarn link
```


Then, whenever you want to use your local version of this library in another project, run the following in the base directory of the other project:
```shell
yarn link avvir
```

To see any changes made locally in another project you'll need to rebuild this library each time by running:
```shell
yarn build
```


## Troubleshooting

`TypeError: Only absolute URLs are supported`: make sure that your AVVIR_GATEWAY_URL environment variable is set.

# Publishing

```
$ VERSION=v...
$ git tag $VERSION
$ git push origin $VERSION
$ npm login
$ npm version --no-git-tag-version $VERSION
$ npm publish
```
