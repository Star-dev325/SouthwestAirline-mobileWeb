// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import Overlay from 'src/wcm/components/overlay';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';

import type { OverlayType } from 'src/shared/flow-typed/shared.types';

type Props = {
  overlay: OverlayType,
  wcmFetchActionFn: () => void,
  showBackButton?: boolean
};

const WcmOverlay = (wcmFetchAction: () => *, nodeName: string) => {
  class WcmOverlayComponent extends React.Component<Props> {
    componentDidMount() {
      this.props.wcmFetchActionFn();
    }

    render() {
      const { overlay, showBackButton } = this.props;
      const { title, body } = overlay;

      return (
        <div>
          {body && (
            <div>
              <PageHeaderWithButtons titleInCenter title={title} showBackButton={showBackButton} />
              <div data-qa="wcm-overlay">
                <Overlay body={body} />
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  WcmOverlayComponent.displayName = `${_.upperFirst(nodeName)}Overlay`;

  const mapStateToProps = (state) => ({
    overlay: _.get(state, `app.wcmContent.${nodeName}.overlay`) || {}
  });

  const mapDispatchToProps = {
    wcmFetchActionFn: wcmFetchAction
  };

  const enhancers = _.flowRight(
    withConnectedReactRouter,
    withHideGlobalHeader,
    withBodyClass('hide-header'),
    connect(mapStateToProps, mapDispatchToProps)
  );

  return enhancers(WcmOverlayComponent);
};

export default WcmOverlay;
