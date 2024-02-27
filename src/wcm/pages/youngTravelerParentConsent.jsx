// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import RouterStore from 'src/shared/stores/routerStore';
import { retrieveYoungTravelerParentConsent } from 'src/wcm/actions/wcmActions';
import WcmOverlayModal from 'src/wcm/components/wcmOverlayModal';
import { defaultYoungTravelerParentConsent } from 'src/wcm/constants/wcmFallbackConstants';

import type { OverlayType, Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  goBack: () => void,
  isWebView: boolean,
  overlay?: OverlayType,
  push: Push,
  retrieveYoungTravelerParentConsentFn: () => void
};

export const YoungTravelerParentConsent = ({
  goBack,
  isWebView,
  overlay,
  push,
  retrieveYoungTravelerParentConsentFn
}: Props) => {
  useEffect(() => {
    retrieveYoungTravelerParentConsentFn();
  }, []);
  
  const transitionToAirBookingPage = () => {
    RouterStore.getPrevState() ? goBack() : push(getNormalizedRoute({ routeName: 'index' }));
  };

  return (
    <WcmOverlayModal
      {...{
        doneLabel: i18n('AIR_BOOKING__CORPORATE_BOOKING__DONE'),
        isWebView,
        onDone: transitionToAirBookingPage,
        overlay
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isWebView: get(state, 'app.webView.isWebView'),
  overlay: get(state, 'app.wcmContent.youngTravelerParentConsent.overlay', defaultYoungTravelerParentConsent)
});

const mapDispatchToProps = {
  retrieveYoungTravelerParentConsentFn: retrieveYoungTravelerParentConsent
};

const enhancers = flowRight(
  withConnectedReactRouter,
  withBodyClass('hide-header'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(YoungTravelerParentConsent);
