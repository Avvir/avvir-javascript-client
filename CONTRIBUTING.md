# Setup

`git clone git@github.com:Avvir/avvir-javascript-client.git javascript-client`
`yarn install`

In webstorm mocha configuration template:
 - set extra-mocha-options to `--require ./tests/test_utils/mocha_setup.js`
 - set AVVIR_GATEWAY_URL to https://avvir-gateway-acceptance.herokuapp.com
 
 
 # TODO - Chores etc.
 
 - remove overload method from FileInformationApi
 - rename reduce_user_session.ts
 - why doesn't async/await transpile?
 - pretty errors on AuthApi.login()
 - getViewerFloor is still a thing?
 - avvir-only docs ?
    - how to get superadmin credentials 
 - upload file from local data
 - 