const Avvir = require("../dist/avvir_api.node");

const username = "avvir-sandbox@example.com";
const password = "Peanut rung dismi$$al";
Avvir.api.auth.login(username, password).then((user)=>{
  let projectId = '-MGtQvxl_SIBzRqIyg1_';
  let photoAreaId = 553;
  let photoLocationId = 513148;
  let photoLocation3d = new Avvir.ApiPhotoLocation3d({
    id: null,
    position: {x: 2, y: 1, z: 1},
    orientation: {a: 1, b: .4, c: .3, d: .2}
  });
  Avvir.api.photos.updatePhotoLocationPositionAndOrientation(
    {projectId, photoAreaId, photoLocationId},
    photoLocation3d,
    user).then(console.log)
})