import { history } from 'src/appHistory';
import BrowserObject from 'src/shared/helpers/browserObject';
import { mergeQuery, combineUri, getQueryStringParameterByKey } from 'src/shared/helpers/urlHelper';
import { addEventListenerOnce } from 'src/shared/helpers/eventHelpers';
import Q from 'q';

const { location } = BrowserObject;

export const showFullScreenModal = (id) => {
  if (getQueryStringParameterByKey('_modal') !== id) {
    return Q(history.push(combineUri(location.pathname, mergeQuery({ _modal: id }, location.search))));
  } else {
    return Q();
  }
};

export const hideFullScreenModal = (id) => {
  if (getQueryStringParameterByKey('_modal') === id) {
    const deferred = Q.defer();

    addEventListenerOnce(window, 'popstate', () => {
      deferred.resolve();
    });
    history.goBack();

    return deferred.promise;
  } else {
    return Q();
  }
};

export const hideModalAndUpdateFormField = (id, fieldName, fieldValue, onChange) => {
  hideFullScreenModal(id);
  onChange(fieldName, fieldValue);
};

export const getModalId = () => getQueryStringParameterByKey('_modal');
