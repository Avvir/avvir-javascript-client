# Setup

`git clone git@github.com:Avvir/avvir-javascript-client.git javascript-client`
`yarn install`

In webstorm mocha configuration template:
 - set extra-mocha-options to `--require ./tests/test_utils/mocha_setup.js`
 - set AVVIR_GATEWAY_URL to https://avvir-gateway-acceptance.herokuapp.com
 
 
 # TODO - Chores etc.
 
 - remove overload method from FileInformationApi
 - create a single entrypoint e.g. `AvvirApi.floors.getFloor(...)`
 - rename reduce_user_session.ts
 - move Api files to a folder
 - find a way to give good type hints on API methods