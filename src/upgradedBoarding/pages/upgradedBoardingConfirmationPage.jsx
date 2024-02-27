// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import ConfirmationDetails from 'src/shared/components/confirmationDetails';
import ConfirmationMessage from 'src/shared/components/confirmationMessage';
import ContentLink from 'src/shared/components/contentLink';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { sitePaths } from 'src/shared/constants/siteLinks';
import { getUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import i18n from '@swa-ui/locale';
import { exitWebView } from 'src/shared/actions/webViewActions';
import Button from 'src/shared/components/button';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';

import type { Push } from 'src/shared/flow-typed/shared.types';
import type { UpgradedBoardingConfirmationPageResponseType } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

type Props = {
  isWebView: boolean,
  exitWebViewFn: () => void,
  push: Push,
  transitToBoardingPositionFn: () => void,
  getUpgradedBoardingReservationFn: (link: Link) => Promise<*>,
  upgradedBoardingConfirmationPageResponse: UpgradedBoardingConfirmationPageResponseType
};

export const UpgradedBoardingConfirmationPage = ({
  isWebView,
  exitWebViewFn,
  push,
  transitToBoardingPositionFn,
  getUpgradedBoardingReservationFn,
  upgradedBoardingConfirmationPageResponse
}: Props) => {
  const { icon, body } = _.get(upgradedBoardingConfirmationPageResponse, 'title', {});
  const { viewBoardingPositions } = _.get(upgradedBoardingConfirmationPageResponse, '_links', {});
  const upgradedBoardingRecords = _.get(upgradedBoardingConfirmationPageResponse, 'upgradedBoardingRecords', []);

  const _navigateToBoardingPassPage = () => {};

  const onClickDone = () => {
    isWebView ? exitWebViewFn() : push('/');
  };

  const _handleOnClickBoardingDetails = () => {
    isWebView
      ? exitWebViewFn()
      : getUpgradedBoardingReservationFn(viewBoardingPositions).then(() => transitToBoardingPositionFn());
  };

  const renderBoardingDetailsButton = () => {
    const { labelText } = viewBoardingPositions;

    return (
      <div className="ub-confirmation--boarding-details-button">
        <Button color="yellow" size="larger" fluid data-qa="boarding-details" onClick={_handleOnClickBoardingDetails}>
          {labelText}
        </Button>
      </div>
    );
  };

  return (
    <div className="ub-confirmation">
      <PageHeaderWithButtons
        title={i18n('UB_CONFIRMATION_PAGE_TITLE')}
        rightButtons={[{ name: 'Done', onClick: onClickDone }]}
      />
      <ConfirmationMessage icon={icon} body={body} />
      {viewBoardingPositions && renderBoardingDetailsButton()}
      <div className="ub-confirmation--section">
        <div className="ub-confirmation--details">
          <ConfirmationDetails
            flights={upgradedBoardingRecords}
            onViewBoardingPassButtonClickCb={_navigateToBoardingPassPage}
            UPGRADED_BOARDING={false}
          />
        </div>
        <ContentLink className={'ub-confirmation--link-details'} href={sitePaths.mobileBoardingPassFAQSite}>
          {i18n('UB_MOBILE_BOARDING_PASS_FAQ')}
        </ContentLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView'),
  upgradedBoardingConfirmationPageResponse: _.get(
    state,
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingPurchaseResponse.upgradedBoardingConfirmationPage',
    {}
  )
});

const mapDispatchToProps = {
  exitWebViewFn: exitWebView,
  transitToBoardingPositionFn: CheckInActions.transitToBoardingPosition,
  getUpgradedBoardingReservationFn: getUpgradedBoardingReservation
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('upgraded-boarding-confirmation-page')
);

export default enhancers(UpgradedBoardingConfirmationPage);
