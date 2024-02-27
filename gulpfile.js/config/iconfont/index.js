const gulp = require('gulp');
const path = require('path');

module.exports = {
  src: `${gulp.config('root.src')}/svgs/*.svg`,
  dest: `${gulp.config('root.dist')}/fonts`,
  options: {
    formats: ['ttf', 'eot', 'woff', 'woff2'],
    tpls: [
      {
        src: path.join(__dirname, './templates/global-icons.scss.ejs'),
        dest: `${gulp.config('root.src')}/shared/styles/__generated/globalIcons.scss`
      },
      {
        src: path.join(__dirname, './templates/util-icons.scss.ejs'),
        dest: `${gulp.config('root.src')}/shared/styles/__generated/utilIcons.scss`
      }
    ],

    fontName: 'iconfont',
    normalize: true,
    fixedWidth: true,
    fontHeight: 576,
    descent: (576 / 12) * 2,
    centerHorizontally: true,
    fontShortName: 'icon',
    bem: true
  }
};
