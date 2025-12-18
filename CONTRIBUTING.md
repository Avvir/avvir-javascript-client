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

```
$ VERSION=v...
$ git tag $VERSION
$ git push origin $VERSION
$ npm login
$ npm version --no-git-tag-version $VERSION
$ npm publish
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
