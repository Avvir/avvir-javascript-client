import AvvirApi from "./source/avvir_api";
import _ from 'underscore';

const Avvir = {
  api: AvvirApi
};

function importAll(directoryContext, target) {
  directoryContext.keys().forEach(filePath => {

    let moduleExports = directoryContext(filePath);
    _.forEach(moduleExports, (moduleExport, exportName) => {
      // if (exportName !== 'default') {
        target[exportName] = moduleExport;
      // }
    })
    if (moduleExports.default && moduleExports.default.name) {
      target[moduleExports.default.name] = moduleExports.default;
    }
  });
}


// skip .d.ts files because some use syntax our webpack settings don't support
importAll(require.context('./source', true, /(?<!\.d)\.ts$/), Avvir);

export default Avvir;
