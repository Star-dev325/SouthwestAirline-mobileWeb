const fs = require('fs');
const getPackageJson = require("@swa-platform/webpack-config/src/getPackageJson");
const mkdirp = require('mkdirp');
const path = require("path");
const routesRender = require('swa-build-scripts/src/routes-renderer');

const packageJson = getPackageJson();

const getRoutes = (options) => {
  let routes = [];

  if (packageJson.routes) {
    // package.json "routes" array
    routes = render(options);
  }

  return routes;
};

const render = (options) => {
  const routes = packageJson.routes;
  const sourceHtml = fs.readFileSync(options.sourceHtmlPath, { encoding: 'UTF-8' });

  routes.forEach((fullRouteName) => {
    const route = routesRender.renderRouteHtml(fullRouteName, sourceHtml, options);

    mkdirp.sync(path.join(options.destination, route.folder));

    fs.writeFileSync(route.destination, route.html);
  });
};

module.exports = getRoutes;
