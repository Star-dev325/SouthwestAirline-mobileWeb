// @flow
import { isMatchPathAndSearchByHistory } from 'src/shared/helpers/interceptorHelpers';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { validateTransferFunds } from 'src/travelFunds/actions/travelFundsActions';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

const { SEARCH_TOKEN_QUERY, TRAVEL_FUNDS_VALIDATE_API_HREF } = TravelFundsConstants;

const transferTravelFundsSearchTokenInterceptor = (interceptorContext: InterceptorContext) => {
  const { history, store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const transferFundWithSearchToken = isMatchPathAndSearchByHistory(
    getNormalizedRoute({ routeName: 'transferFunds' }),
    SEARCH_TOKEN_QUERY
  )({ ...interceptorContext });

  if (transferFundWithSearchToken) {
    const { search: searchParams } = getCurrentRouteState(persistentHistory);
    const { searchToken: fundSearchToken } = transformSearchToQuery(searchParams);

    return fundSearchToken
      ? {
        interceptor() {
          store
            .dispatch(
              validateTransferFunds({
                body: {
                  fundSearchToken
                },
                href: TRAVEL_FUNDS_VALIDATE_API_HREF,
                method: 'POST'
              })
            )
            .then(() => {
              history.replace(getNormalizedRoute({ routeName: 'transferFunds' }));
            })
            .catch(() => {
              history.push(getNormalizedRoute({ routeName: 'transferFunds' }));
            });
        },
        ...interceptorContext
      }
      : {
        interceptor() {},
        ...interceptorContext
      };
  }
};

export default transferTravelFundsSearchTokenInterceptor;
