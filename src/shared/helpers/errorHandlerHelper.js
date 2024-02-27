import BrowserObject from 'src/shared/helpers/browserObject';

const { history } = BrowserObject;

export const goBackErrorHandler = () => history.back();
