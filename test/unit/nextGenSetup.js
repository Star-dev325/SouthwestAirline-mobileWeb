require("@babel/register")({
  ignore: [/node_modules\/(?!jose\/|@?swa-).*/]
});
  
require("ignore-styles");
