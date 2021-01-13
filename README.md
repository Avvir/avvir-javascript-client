# avvir-javascript-client


# Usage

configure environment:

`AVVIR_GATEWAY_URL=https://avvir-gateway-production.herokuapp.com`

configure credentials:
```javascript
async ()=>{
  let user = await AvvirApi.auth.login(username, password);
  
}
```
`let user = { // TODO }`