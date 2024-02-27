import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { default as applyLodashMixin } from 'src/shared/mixins/lodashMixin';
import '../src/app/index.scss';

import { setI18nRoot } from '@swa-ui/locale';
import i18nGlobal from '../src/app/i18n/global';
import bootstrapSetup from 'src/app/helpers/bootstrapSetup';
import 'src/app/helpers/dayJsSetup';

setI18nRoot({
  en: Object.freeze({
    ...i18nGlobal
  })
});
applyLodashMixin();
addDecorator(withKnobs);

bootstrapSetup(window.require);

function importAll(requireContextModule) {
  requireContextModule.keys().forEach(requireContextModule);
}

function loadStories() {
  importAll(require.context('./stories', true, /.*Story\.js/));
}

configure(loadStories, module);
