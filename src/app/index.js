/**
 * Enable default touch events, styling and animation on all DOM elements in Mobile Safari.
 * See: http://alxgbsn.co.uk/2011/10/17/enable-css-active-pseudo-styles-in-mobile-safari/
 */
document.addEventListener('touchstart', () => {}, false);

// The following two bootstrapSetup lines must go first to ensure i18n is available for the rest of the app
require('src/app/helpers/bootstrapSetup').default(window.require);
require('src/app/helpers/bootstrapSetup').setUpI18nBootstrap();

require('src/shared/helpers/webViewMessageInitializer').default();
require('src/shared/helpers/deviceClassHelper').default(document.body);
require('src/shared/helpers/formInputScrollHelper').default();
require('src/shared/mixins/lodashMixin').default();
require('src/app/helpers/urlCleanerHelpers').default();
require('src/app/bootstrap').default(document.querySelector('#appRoot'));
require('src/polyfills/disableSafariScrolling').default(document);
require('src/app/helpers/dayJsSetup');

import 'src/app/index.scss';
