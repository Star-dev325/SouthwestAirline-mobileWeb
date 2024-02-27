/* eslint-disable no-console */
import { setDataKeyPrefix, setRetrievalFunction, getBootstrapData } from '@swa-ui/bootstrap';
import i18nGlobal from 'src/app/i18n/global';
import * as I18n from '@swa-ui/locale';

export default function (retrievalFunction) {
  setDataKeyPrefix('swa-bootstrap-mobile-web/');

  if (retrievalFunction) {
    setRetrievalFunction(retrievalFunction);
  } else {
    console.warn('Missing commonjs bootstrap modules');
  }
}
export const setUpI18nBootstrap = () => {
  const finalI18n = {
    ...i18nGlobal,
    ...getBootstrapData('swa-bootstrap-mobile-web/i18n-override')
  };

  I18n.setI18nRoot({
    en: Object.freeze(finalI18n)
  });
};
