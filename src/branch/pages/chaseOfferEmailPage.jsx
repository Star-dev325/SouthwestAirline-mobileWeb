// @flow
import _ from 'lodash';
import branch from 'branch-sdk';
import { connect } from 'react-redux';
import { createChaseSession } from 'src/chase/actions/chaseActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import { useEffect } from 'react';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';

import type { Push } from 'src/shared/flow-typed/shared.types';

const { location } = BrowserObject;

type Props = {
  createChaseSessionFn: (string, boolean, string) => Promise<*>,
  isLoggedIn: boolean,
  push: Push
};

export const ChaseOfferEmailPage = ({ createChaseSessionFn, isLoggedIn, push }: Props) => {
  useEffect(() => {
    getBranchData()
      .then(_parseBranchData)
      .then(_handleCreateChaseSessionRequest)
      .catch(() => push('/'));
  }, []);

  const getBranchData = () =>
    new Promise((resolve, reject) => branch.data((err, data) => (err ? reject(err) : resolve(data))));

  const _parseBranchData = (data) => {
    if (_.isEmpty(data)) {
      return Promise.reject();
    }

    const {
      data_parsed: {
        CELL: CELL = '',
        encryptedRapidRewardsNumber: encryptedRapidRewardsNumber,
        isChaseCombo: isChaseCombo = 'false',
        SPID: SPID = '',
        targetUrl: targetUrl,
        clk: clk,
        f: f,
        RMID: RMID,
        RR_NUMBER: RR_NUMBER,
        RRID: RRID,
        RSD: RSD,
        src: src
      } = {}
    } = data;

    const shouldGoToApplicationPage = _.toBoolean(isChaseCombo);

    if (_isDataValid(targetUrl, shouldGoToApplicationPage, encryptedRapidRewardsNumber)) {
      return {
        CELL,
        clk,
        encryptedRapidRewardsNumber,
        f,
        isChaseCombo,
        RMID,
        RR_NUMBER,
        RRID,
        RSD,
        shouldGoToApplicationPage,
        SPID,
        src,
        targetUrl
      };
    } else {
      return Promise.reject();
    }
  };

  const _isDataValid = (targetUrl, shouldGoToApplicationPage, encryptedRapidRewardsNumber) =>
    !((_.isEmpty(targetUrl) && !shouldGoToApplicationPage) || _.isEmpty(encryptedRapidRewardsNumber));

  const _handleCreateChaseSessionRequest = ({
    CELL,
    clk,
    encryptedRapidRewardsNumber,
    f,
    isChaseCombo,
    RMID,
    RR_NUMBER,
    RRID,
    RSD,
    shouldGoToApplicationPage,
    SPID,
    src,
    targetUrl
  }) => {
    const returnUrl = `${location.origin}`;

    return createChaseSessionFn(returnUrl, isLoggedIn, encryptedRapidRewardsNumber)
      .then((chaseSessionId) => {
        const query = _.omitIfEmpty({
          CELL,
          chaseSessionId,
          clk,
          f,
          returnToURL: returnUrl,
          REF: 'MWEB',
          RMID,
          RR_NUMBER,
          RRID,
          RSD,
          SPID,
          src
        });

        if (shouldGoToApplicationPage) {
          push('/chase/offer/apply', null, { ...query, isMwebBranchLink: 'true', isChaseCombo: isChaseCombo });
        } else {
          const targetUrlWithQuery = buildPathWithQuery(targetUrl, query);

          window.open(targetUrlWithQuery, '_self');
        }
      })
      .catch((error = {}) => {
        const locationUrl = _.isFunction(error.getResponseHeader) && error.getResponseHeader('location');

        if (locationUrl) {
          window.open(locationUrl, '_self');
        } else {
          return Promise.reject();
        }
      });
  };

  return null;
};

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  createChaseSessionFn: createChaseSession
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ChaseOfferEmailPage);
