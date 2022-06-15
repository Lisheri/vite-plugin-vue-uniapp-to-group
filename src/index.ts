import { IAppTypes } from './toutiaoPluginTypes';
import { unique } from './tools';
const UniappToGroup = (options: any) => {
  let packages = {};
  let app: IAppTypes = {};
  const name: string = 'vite-plugin-vue-uniapp-to-group';
  if (options.package) {
    packages = options.package;
  }
  if (options.app) {
    app = options.app;
  }

  return {
    name,
    generateBundle(code: any, bundle: any) {
      let packageFlag = true;
      for (const name of Object.keys(bundle)) {
        if (!Object.keys(app).length && !Object.keys(packages).length) {
          break;
        }
        // * 集成pages
        if (name === 'app.json') {
          const appJson = JSON.parse(bundle[name].source);
          if (app.pages) {
            appJson.pages = unique(appJson.pages.concat(app.pages));
          }
          if (Object.keys(app.fallbackPluginPages!).length) {
            const obj = appJson.fallbackPluginPages || {};
            appJson.fallbackPluginPages = Object.assign(obj, app.fallbackPluginPages);
          }
          bundle[name].source = JSON.stringify(appJson);
        }
        if (name === 'package.json') {
          packageFlag = false;
          let packageJson = JSON.parse(bundle[name].source);
          packageJson = Object.assign(packageJson, packages);
          bundle[name].source = JSON.stringify(packageJson);
        }
      }
      if (Object.keys(packages).length && packageFlag) {
        bundle['package.json'] = {
          source: JSON.stringify(packages),
          fileName: 'package.json',
          type: 'asset',
          name: undefined
        };
      }
    }
  };
};
export default UniappToGroup;
