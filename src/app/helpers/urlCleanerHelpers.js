import { history } from 'src/appHistory';
import { getQueryStringParameterByKey, removeQueryByKey } from 'src/shared/helpers/urlHelper';

function urlCleanerHelpers() {
  if (getQueryStringParameterByKey('_modal')) {
    history.replace({
      pathname: history.location.pathname,
      search: removeQueryByKey('_modal', history.location.search)
    });
  }
}

export default urlCleanerHelpers;
