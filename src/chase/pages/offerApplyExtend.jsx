// @flow

import { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import { getChaseApplicationInfo, createChaseSession } from 'src/chase/actions/chaseActions';
import { showDialog, forceHideDialog } from 'src/shared/actions/dialogActions';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getMcvid } from 'src/airBooking/helpers/amcvCookieHelper';
import SharedConstants from 'src/shared/constants/sharedConstants';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { generateDialogConfigForChaseError } from 'src/shared/transformers/dialogTransformer';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import BrowserObject from 'src/shared/helpers/browserObject';

import type { Push, Replace, ApiErrorType } from 'src/shared/flow-typed/shared.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';
import type { ChaseQueryParameters, ChasePrefillRequestType } from 'src/chase/flow-typed/chase.types';

const { CHASE_SESSION_ID_KEY, CHASE_INSTANT_CREDIT_RETURN_URL_KEY } = StorageKeys;
const { DATA_CHANNEL } = SharedConstants;
const { location: windowLocation } = BrowserObject;

type Props = {
  createChaseSessionFn: (string, boolean) => Promise<*>,
  forceHideDialogFn: () => Promise<*>,
  getChaseApplicationInfoFn: (request: ChasePrefillRequestType) => Promise<*>,
  isLoggedIn: boolean,
  location: HistoryLocation,
  push: Push,
  queryParameters?: ChaseQueryParameters,
  replace: Replace,
  showDialogFn: (options: DialogOptionsType) => void
};

export const OfferApplyExtendPage = ({
  createChaseSessionFn,
  forceHideDialogFn,
  getChaseApplicationInfoFn,
  isLoggedIn,
  location,
  push,
  replace,
  showDialogFn
}: Props) => {
  const {
    CELL = '',
    chaseSessionId = '',
    clk,
    datachannel = DATA_CHANNEL,
    f,
    isChaseCombo,
    isMwebBranchLink = false,
    mcvid = getMcvid(),
    pageId,
    returnToURL = windowLocation.origin,
    RMID,
    RR_NUMBER,
    RRID,
    RSD,
    SPID = '',
    src
  } = transformSearchToQuery(location.search) || {};

  useEffect(() => {
    chaseSessionId ? _handleRequestWithChaseSession(chaseSessionId) : _handleRequestWithoutChaseSession();
  }, []);

  const _handleRequestWithoutChaseSession = () =>
    _getReturnUrl().then((url) => {
      const returnUrl = windowLocation.origin + url;

      return createChaseSessionFn(returnUrl, isLoggedIn)
        .then((sessionId) => _goToChaseApplication(sessionId, returnUrl))
        .catch((error) => _showErrorDialog(error, url));
    });

  const _handleRequestWithChaseSession = (sessionId: string) =>
    _goToChaseApplication(sessionId, returnToURL).catch((error) => {
      if (_.toBoolean(isMwebBranchLink)) {
        _showErrorDialog(error, '/');
      } else {
        replace('/chase/offer/error');
      }
    });

  const _goToChaseApplication = (sessionId: string, returnUrl: string) =>
    getChaseApplicationInfoFn({
      CELL,
      SPID,
      ...LocalStorageCache.getSwaOffersIdentity(),
      chaseSessionId: sessionId,
      returnToURL: returnUrl,
      isComboApp: _.toBoolean(isChaseCombo),
      pageId,
      appendToDAOURL: {
        clk,
        datachannel,
        f,
        mcvid,
        RMID,
        RR_NUMBER,
        RRID,
        RSD,
        src
      }
    }).then((response = {}) => {
      const { href = '/' } = _.find(response.links, { rel: 'DAOCARD-URL' }) || {};

      window.open(href, '_self');
    });

  const _getReturnUrl = () =>
    LocalStorageCache.loadChaseInstantCreditReturnUrl()
      .then((returnUrl) => {
        LocalStorageCache.deleteFromLocalStorage(CHASE_INSTANT_CREDIT_RETURN_URL_KEY);

        return returnUrl;
      })
      .catch(() => '/');

  const _showErrorDialog = (error: ApiErrorType, returnPathOnError: string) => {
    const _onPopupClose = () => {
      forceHideDialogFn().then(() => {
        LocalStorageCache.deleteFromLocalStorage(CHASE_SESSION_ID_KEY);
        push(returnPathOnError);
      });
    };

    showDialogFn(generateDialogConfigForChaseError(error, _onPopupClose));
  };

  return null;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state?.app?.account?.isLoggedIn ?? false
});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  forceHideDialogFn: forceHideDialog,
  createChaseSessionFn: createChaseSession,
  getChaseApplicationInfoFn: getChaseApplicationInfo
};

export default _.flowRight(
  withConnectedReactRouter,
  withBodyClass('hide-header'),
  connect(mapStateToProps, mapDispatchToProps)
)(OfferApplyExtendPage);
