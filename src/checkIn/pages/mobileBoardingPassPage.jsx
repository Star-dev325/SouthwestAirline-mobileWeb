// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';

import MobileBoardingPass from 'src/checkIn/components/mobileBoardingPass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { retrieveBoardingPass } from 'src/checkIn/actions/checkInActions';
import DeviceInfo from 'src/shared/helpers/deviceInfo';
import Carousel from 'src/shared/components/carousel';
import * as BoardingPassHelper from 'src/shared/helpers/boardingPassHelper';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import { getHazmatDeclarationKeysFromMobileBoardingPass } from 'src/checkIn/transformers/hazmatFlightsTransfomer';

import type { MobileBoardingPassViewType } from 'src/checkIn/flow-typed/checkIn.types';
import type {
  BoardingPassStyleObjectType,
  PassengerNameRecord,
  Replace,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import { convertBackgroundBrandColorToHexCode } from 'src/shared/helpers/productDefinitionsHelper';

type Props = {
  retrieveBoardingPassFn: (ViewBoardingPass, boolean) => void,
  replace: Replace,
  location: HistoryLocationWithState<PassengerNameRecord>,
  mobileBoardingPasses: ?Array<MobileBoardingPassViewType>,
  viewBoardingPassIssuance: ?ViewBoardingPass,
  viewBoardingPassTravelerIdsSegmentIds?: ViewBoardingPass
};

type State = {
  mbpIndex: number
};

export class MobileBoardingPassPage extends Component<Props, State> {
  componentDidMount() {
    const { viewBoardingPassIssuance, retrieveBoardingPassFn, location, mobileBoardingPasses } = this.props;
    const pnr = location.state;
    const { firstName, lastName, recordLocator } = pnr;
    const flights = mobileBoardingPasses && getHazmatDeclarationKeysFromMobileBoardingPass(mobileBoardingPasses);
    const hasAcceptedHazmatAck = flights && CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations(flights);
    let boardingPassLink;

    if (!viewBoardingPassIssuance || !viewBoardingPassIssuance.body) {
      boardingPassLink = BoardingPassHelper.getBoardingPassFromSession();
    } else {
      boardingPassLink = viewBoardingPassIssuance;
    }

    if (!boardingPassLink) {
      this.props.replace(`/view-reservation/trip-details/${recordLocator}`, null, null, { firstName, lastName });
    } else {
      !mobileBoardingPasses && retrieveBoardingPassFn(boardingPassLink, true);
    }

    if (hasAcceptedHazmatAck) {
      raiseSatelliteEvent('BoardingPass View');
    }
  }

  componentWillUnmount() {
    BoardingPassHelper.removeBoardingPassFromSession();
  }

  _renderBackgroundColor = (style: BoardingPassStyleObjectType) => {
    const { gradientEnd, gradientStart } = style;
    const gradientEndColor = convertBackgroundBrandColorToHexCode(gradientEnd, '#111b40');
    const gradientStartColor = convertBackgroundBrandColorToHexCode(gradientStart, '#304cb2');

    return { gradientEndColor, gradientStartColor };
  };

  render() {
    const { mobileBoardingPasses } = this.props;

    return (
      <div>
        {mobileBoardingPasses && (
          <Carousel dotsInFooterWithArrows continuous={false}>
            {mobileBoardingPasses.map((content, index) => {
              const { gradientEndColor, gradientStartColor } = this._renderBackgroundColor(content?.style);

              return (
                <div
                  className={cx(
                    {
                      'mobile-boarding-pass--paginated': mobileBoardingPasses.length > 1
                    },
                    `mobile-boarding-pass`
                  )}
                  key={index}
                  style={{ background: `linear-gradient(${gradientStartColor}, ${gradientEndColor})` }}
                >
                  <MobileBoardingPass
                    isAndroidDevice={DeviceInfo.os.name === 'Android'}
                    isIOSDevice={DeviceInfo.os.name === 'iOS'}
                    mobileBoardingPass={content}
                  />
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mobileBoardingPasses: _.get(
    state,
    'app.checkIn.checkInViewBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView'
  ),
  viewBoardingPassIssuance: _.get(state, 'app.viewBoardingPass'),
  viewBoardingPassTravelerIdsSegmentIds: _.get(state, 'app.viewBoardingPassTravelerIdsSegmentIds')
});

const mapDispatchToProps = {
  retrieveBoardingPassFn: retrieveBoardingPass
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(MobileBoardingPassPage);
