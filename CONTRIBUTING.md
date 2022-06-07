# Setup

`git clone git@github.com:Avvir/avvir-javascript-client.git javascript-client`
`yarn install`

In webstorm mocha configuration template:
 - set extra-mocha-options to `--require ./tests/test_utils/mocha_setup.js`
 - set AVVIR_ENVIRONMENT to acceptance `AVVIR_ENVIRONMENT=acceptance`


## Publishing to NPM

To publish to NPM (assuming you have the permission to create git tags), run the publish script:
```shell
./scripts/publish.js
```

The script will stash any uncommitted changes, switch to the master branch, and push a git tag to the repository.
This will trigger Circle CI to run a job that will publish to the NPM registry if the tests pass.
The version in package.json is intentionally set to 0.0.0 because the version is controlled by the most recent git tag version.

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

## Jetbrains IDE test config
Add the following in the mocha template in the `Extra Mocha options` field
`--require ./scripts/mocha_setup.js`


## Troubleshooting

`TypeError: Only absolute URLs are supported`: make sure that your AVVIR_GATEWAY_URL environment variable is set.


 # TODO - Chores etc.
 
 -[ ] remove overload method from FileInformationApi
 -[ ] rename reduce_user_session.ts
 -[ ] why doesn't async/await transpile?
 -[ ] pretty errors on AuthApi.login()
 -[ ] getViewerFloor is still a thing?
 -[ ] avvir-only docs ?
 -[ ] how to get superadmin credentials
 -[ ] upload file from local data

