# Setup

`git clone git@github.com:Avvir/avvir-javascript-client.git javascript-client`
`yarn install`

In webstorm mocha configuration template:
 - set extra-mocha-options to `--require ./tests/test_utils/mocha_setup.js`
 - set AVVIR_GATEWAY_URL to https://avvir-gateway-acceptance.herokuapp.com