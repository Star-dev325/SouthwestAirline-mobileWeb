import BrowserObject from 'src/shared/helpers/browserObject';

const { location } = BrowserObject;

export const browserRefreshErrorHandler = () => location.reload();
