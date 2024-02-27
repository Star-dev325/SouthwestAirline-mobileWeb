// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import WcmOverlayModal from 'src/wcm/components/wcmOverlayModal';
import { retrieveLearnMoreSwabizNotAssociated } from 'src/wcm/actions/wcmActions';
import RouterStore from 'src/shared/stores/routerStore';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import i18n from '@swa-ui/locale';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { OverlayType, Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  goBack: () => void,
  isWebView: boolean,
  learnMoreSwabizContent?: OverlayType,
  push: Push,
  wcmFetchActionFn: () => void
};

export class LearnMoreSwabizNotAssociated extends React.Component<Props> {
  componentDidMount() {
    this.props.wcmFetchActionFn();
    raiseSatelliteEvent('no company id associated');
  }

  _transitionToAirBookingPage = () => {
    const { goBack, push } = this.props;

    RouterStore.getPrevState() ? goBack() : push(getNormalizedRoute({ routeName: 'index' }));
  };

  render() {
    const { learnMoreSwabizContent, isWebView } = this.props;

    return (
      <WcmOverlayModal
        {...{
          overlay: learnMoreSwabizContent,
          onDone: this._transitionToAirBookingPage,
          doneLabel: i18n('AIR_BOOKING__CORPORATE_BOOKING__DONE'),
          isWebView
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView'),
  learnMoreSwabizContent: _.get(state, 'app.wcmContent.learnMoreSwabizNotAssociated.overlay', null)
});

const mapDispatchToProps = {
  wcmFetchActionFn: retrieveLearnMoreSwabizNotAssociated
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('hide-header'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(LearnMoreSwabizNotAssociated);
