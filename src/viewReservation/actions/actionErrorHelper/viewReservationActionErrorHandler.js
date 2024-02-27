// @flow

import { goBack, replace } from 'connected-react-router';
import _ from 'lodash';

import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { store } from 'src/shared/redux/createStore';

export const retrieveFlightReservationErrorHandler = () => {
  if (_shouldRedirectViewReservationDetailsPage()) {
    store.dispatch(replace(getNormalizedRoute({ routeName: 'index' })));
  } else {
    store.dispatch(goBack());
  }
};

const _shouldRedirectViewReservationDetailsPage = (): boolean => {
  const { persistentHistory } = store.getState();
  const size = _.size(persistentHistory);
  const firstPageHistory = _.get(persistentHistory, `${size - 1}`) || { pathname: '' };
  const secondPageHistory = _.get(persistentHistory, `${size - 2}`) || { pathname: '' };

  return (
    firstPageHistory.pathname === secondPageHistory.pathname ||
    secondPageHistory.pathname === '/redirect-branch' ||
    size <= 1
  );
};
