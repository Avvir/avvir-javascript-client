
const Avvir = {
  api: {}
};

function importAll(directoryContext, target) {
  directoryContext.keys().forEach(filePath => {
    let moduleExports = directoryContext(filePath);
    if (moduleExports.default && moduleExports.default.name) {
      target[moduleExports.default.name] = moduleExports;
    }
  });
}


importAll(require.context('./source/api', true, /\.ts$/), Avvir.api);
// skip .d.ts files because some use syntax our webpack settings don't support
importAll(require.context('./source', true, /(?<!\.d)\.ts$/), Avvir);

export default Avvir;
