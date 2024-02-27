// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  retrieveReservationChangeableWithSearchToken,
  saveSelectedBounds,
  searchForReaccomFlights
} from 'src/airChange/actions/airChangeActions';
import { SELECTION_MODE } from 'src/airChange/constants/airChangeConstants';
import FlightChangeMessageKey from 'src/airChange/constants/flightChangeMessageKey';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';
import { isOpenJawReservation, isReaccomScenario } from 'src/airChange/selectors/airChangeSelectPageSelector';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import BoundSelectForm from 'src/shared/components/boundSelect/boundSelectForm';
import Icon from 'src/shared/components/icon';
import Message from 'src/shared/components/message';
import SubHeader from 'src/shared/components/subHeader';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { AIR_CHANGE_SELECT_FORM } from 'src/shared/constants/formIds';
import { sitePaths } from 'src/shared/constants/siteLinks';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import {
  cloneDeep,
  flowRight,
  get,
  isEmpty
} from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { ChangeFlightPage, ReaccomFlightPage, SelectedBounds } from 'src/airChange/flow-typed/airChange.types';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import type { MessageType, Push } from 'src/shared/flow-typed/shared.types';
import type { FlightRetrieveInfoWithSearchTokenRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

const {
  CHANGE_FEE_DW_MESSAGE,
  CHANGE_DW_SUMMARY,
  CHANGE_DW_DEP_STATIONS,
  CHANGE_DW_DEP_DATE,
  CHANGE_DW_RET_STATIONS,
  CHANGE_DW_RET_DATE,
  CHANGE_FEE_MESSAGE,
  CHANGE_GDS_NOTICE,
  CHANGE_SPLIT_PNR_CONFIRMATION,
  REACCOM_CHANGE_FLIGHT,
  REACCOM_CHANGE_GDS_NOTICE,
  REACCOM_CONTACT_US_TO_CHANGE_FLIGHT,
  REACCOM_CHANGE_FLIGHT_BOTH_ELIGIBLE
} = FlightChangeMessageKey;

const iconMap = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'information'
};
type Props = {
  changeFlightPage?: ChangeFlightPage,
  hideDialogFn: () => void,
  isOpenJaw: boolean,
  isReaccom: boolean,
  push: Push,
  query: {
    searchToken?: string
  },
  retrieveFlightReservationFn: (retrieveReservationInfo: FlightRetrieveInfoWithSearchTokenRequestType, withSeachToken: boolean) => void,
  retrieveReservationChangeableWithSearchTokenFn: (searchToken: string, asyncChainInitiated?: boolean) => void,
  selectedBounds: SelectedBounds,
  saveSelectedBoundsFn: (SelectedBounds) => void,
  showDialogFn: (*) => void,
  reaccomFlightPage?: ReaccomFlightPage,
  retrieveReservationChangeableFn: (Link) => *,
  searchForReaccomFlightsFn: (Link, string) => void,
  viewReservationViewPage: *
};

export const AirChangeSelectPage = (props: Props) => {
  useEffect(() => {
    const {
      changeFlightPage,
      query: {
        searchToken
      } = {},
      retrieveReservationChangeableWithSearchTokenFn
    } = props;

    if (searchToken && isEmpty(changeFlightPage)) {
      retrieveReservationChangeableWithSearchTokenFn(searchToken);
    }
  }, []);

  const _renderDynamicWaiverFlight = (stationsMessage: MessageType, dateMessage: MessageType) => (
    <div className="red p5 bdb bggray1" data-qa="dynamic-waiver-stations">
      <div className="bold py1">{stationsMessage.header}</div>
      {_.chain(stationsMessage.body)
        .split('.')
        .compact()
        .map((station, index) => <div key={index}>{station}</div>)
        .value()}
      <div>{dateMessage.body}</div>
    </div>
  );

  const _renderMessageWithThemeColor = (message: MessageType) => {
    const { icon = 'INFO', primaryThemeColor = 'default', inverseThemeColor = '', header = null } = message;

    return (
      <div className={`flight-change-msg bg-${inverseThemeColor}`}>
        {!_.isEqual(icon, 'NONE') && !_.isEqual(header, null) && (
          <>
            <Message status={iconMap[icon]} className="msg-header">
              <b className={`flight-change-msg--header text-${primaryThemeColor}`}>{header}</b>
            </Message>
            <p className={`flight-change-msg--body text-${primaryThemeColor}`}>{message.body}</p>
          </>
        )}
        {!_.isEqual(icon, 'NONE') && _.isEqual(header, null) && (
          <Message status={iconMap[icon]} className="p0">
            <p className={`flight-change-msg--body text-${primaryThemeColor}`}>{message.body}</p>
          </Message>
        )}
        {_.isEqual(icon, 'NONE') && _.isEqual(header, null) && (
          <p className={`text-${primaryThemeColor}`}>{message.body}</p>
        )}
      </div>
    );
  };

  const _renderFlightChangeMessage = (messages: Array<MessageType>) => {
    const dynamicWaiverSelectFlightTitle = _.find(messages, { key: CHANGE_FEE_DW_MESSAGE });
    const dynamicWaiverSummary = _.find(messages, { key: CHANGE_DW_SUMMARY });
    const dynamicWaiverDepartureStations = _.find(messages, { key: CHANGE_DW_DEP_STATIONS });
    const dynamicWaiverDepartureDate = _.find(messages, { key: CHANGE_DW_DEP_DATE });
    const dynamicWaiverReturnStations = _.find(messages, { key: CHANGE_DW_RET_STATIONS });
    const dynamicWaiverReturnDate = _.find(messages, { key: CHANGE_DW_RET_DATE });
    const reaccomChangeMessage = _.find(messages, { key: REACCOM_CHANGE_FLIGHT });
    const reaccomChangeGDSNoticeMessage = _.find(messages, { key: REACCOM_CHANGE_GDS_NOTICE });
    const reaccomBothBoundsMessage = _.find(messages, { key: REACCOM_CHANGE_FLIGHT_BOTH_ELIGIBLE });
    const changeFeeMessage = _.find(messages, { key: CHANGE_FEE_MESSAGE });
    const changeGDSMessage = _.find(messages, { key: CHANGE_GDS_NOTICE });
    const splitPnrConfirmationMessage = _.find(messages, { key: CHANGE_SPLIT_PNR_CONFIRMATION });

    return (
      <div>
        {dynamicWaiverSummary && (
          <div data-qa="dynamic-waiver-summary" className="red px5 pt5 bggray1">
            <div className="large pb3 flex flex-cross-center">
              <Icon className="py2 pr2" type="travel-alert" />
              <div className="bold" data-qa="title">
                {dynamicWaiverSummary.header}
              </div>
            </div>
            <div data-qa="text">{dynamicWaiverSummary.body}</div>
          </div>
        )}
        {dynamicWaiverDepartureStations &&
          dynamicWaiverDepartureDate &&
          _renderDynamicWaiverFlight(dynamicWaiverDepartureStations, dynamicWaiverDepartureDate)}
        {dynamicWaiverReturnStations &&
          dynamicWaiverReturnDate &&
          _renderDynamicWaiverFlight(dynamicWaiverReturnStations, dynamicWaiverReturnDate)}
        {dynamicWaiverSelectFlightTitle && (
          <div className="flight-change--intro">
            <p data-qa="air-change-select-flights-message">{dynamicWaiverSelectFlightTitle.body}</p>
          </div>
        )}
        {reaccomChangeGDSNoticeMessage &&
          _renderMessageWithThemeColor(reaccomChangeGDSNoticeMessage)}
        {reaccomChangeMessage && _renderMessageWithThemeColor(reaccomChangeMessage)}
        {reaccomBothBoundsMessage && _renderMessageWithThemeColor(reaccomBothBoundsMessage)}
        {changeGDSMessage && _renderMessageWithThemeColor(changeGDSMessage)}
        {splitPnrConfirmationMessage && _renderMessageWithThemeColor(splitPnrConfirmationMessage)}

        {changeFeeMessage && (
          <div className="flight-change--intro">
            <p data-qa="flight-change-fee-message">{changeFeeMessage.body}</p>
          </div>
        )}
      </div>
    );
  };

  const _changeFlight = (selectedBounds: SelectedBounds) => {
    const {
      hideDialogFn,
      isOpenJaw,
      push,
      query: {
        searchToken
      },
      reaccomFlightPage: { _meta: { allowARNKPnrs } = {} } = {},
      saveSelectedBoundsFn,
      showDialogFn
    } = props;

    saveSelectedBoundsFn(selectedBounds);

    const areBothBoundsSelected = selectedBounds.firstbound && selectedBounds.secondbound;
    const queryParams = searchToken ? { searchToken } : {};

    if (isOpenJaw && areBothBoundsSelected && !allowARNKPnrs) {
      showDialogFn({
        title: i18n('SHARED__ERROR_MESSAGES__AIR_CHANGE_OPEN_JAW_BOTH_BOUNDS'),
        closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        verticalLinks: {
          links: [
            {
              label: i18n('LONE_STAR__GO_TO_SW'),
              href: sitePaths.airChangeFullSite,
              onClick: hideDialogFn,
              isExternal: true,
              dataQa: 'goToSWLink'
            }
          ]
        }
      });
    } else {
      if (!isReaccom) {
        push(getNormalizedRoute({ routeName: 'flightShoppingIndex' }));
      } else {
        const { reaccomFlightPage: { boundSelections: reaccomBoundSelections } = {} } = props;
        const isReaccomCoTerminalEligible =
          reaccomBoundSelections && getIsReaccomCoTerminalEligible(reaccomBoundSelections);

        if (isReaccomCoTerminalEligible) {
          push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShoppingIndex' }), {}, queryParams));
        } else {
          const { reaccomFlightPage, searchForReaccomFlightsFn } = props;
          const direction = selectedBounds.firstbound ? OUTBOUND : INBOUND;
          const pushToPath = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShopping' }), {
            direction,
            paxType: PassengerTypes.ADULT
          });
          let reaccomProducts = get(reaccomFlightPage, '_links.reaccomProducts');

          if (!areBothBoundsSelected) {
            const unselectedDirection = direction === OUTBOUND ? INBOUND : OUTBOUND;

            reaccomProducts = _.omit(reaccomProducts, `body.${unselectedDirection}`);
          }
          searchForReaccomFlightsFn(reaccomProducts, pushToPath);
        }
      }
    }
  };

  const _renderChangeBounds = () => {
    const { changeFlightPage, selectedBounds } = props;
    const boundSelections = get(changeFlightPage, 'boundSelections', []);
    const messages = get(changeFlightPage, 'messages', []);
    const selectionMode = get(changeFlightPage, 'selectionMode');
    const dynamicWaivers = get(changeFlightPage, 'dynamicWaivers', []);
    const passengerDetails = get(changeFlightPage, 'passengerDetails');

    return (
      <div className="flight-change">
        <SubHeader title={i18n('AIR_CHANGE__TITLE')} />
        {_renderFlightChangeMessage(messages)}
        <BoundSelectForm
          boundSelections={boundSelections}
          formId={AIR_CHANGE_SELECT_FORM}
          initialFormData={selectedBounds}
          isDynamicWaiver={!isEmpty(dynamicWaivers)}
          name="air-change"
          onSubmit={_changeFlight}
          passengerDetails={passengerDetails}
          selectType="checkbox"
          selectionMode={selectionMode}
        />
      </div>
    );
  };

  const _renderReaccomBounds = () => {
    const { reaccomFlightPage } = props;
    const boundSelections = get(reaccomFlightPage, 'boundSelections', []);
    const selectionMode =
      boundSelections && boundSelections.length > 1 && get(boundSelections, '0.boundFlown')
        ? SELECTION_MODE.SINGLE
        : SELECTION_MODE.ALL;
    const messages = get(reaccomFlightPage, 'messages', []);
    const reaccomContactUsMessage = get(_.find(messages, { key: REACCOM_CONTACT_US_TO_CHANGE_FLIGHT }), 'body');
    const ineligibleBoundMessages = boundSelections.map((bound) =>
      (!bound.boundFlown && !bound.isSelectable && reaccomContactUsMessage ? reaccomContactUsMessage : '')
    );
    const showSwappedBounds =
      isReaccom && ineligibleBoundMessages.length > 1 && ineligibleBoundMessages[0] === reaccomContactUsMessage;
    const isReaccomBlockMultiBoundSelection = isReaccom && get(reaccomFlightPage, '_meta.isBlockMultiBoundSelection');

    return (
      <div className="flight-change">
        <SubHeader title={i18n('AIR_CHANGE__TITLE')} />
        {_renderFlightChangeMessage(messages)}
        <BoundSelectForm
          boundSelections={showSwappedBounds ? _.reverse(cloneDeep(boundSelections)) : boundSelections}
          formId={AIR_CHANGE_SELECT_FORM}
          ineligibleBoundMessages={
            showSwappedBounds ? _.reverse(cloneDeep(ineligibleBoundMessages)) : ineligibleBoundMessages
          }
          isReaccomBlockMultiBoundSelection={isReaccomBlockMultiBoundSelection}
          isDynamicWaiver={false}
          isReaccom={isReaccom}
          name="air-change"
          onSubmit={_changeFlight}
          selectType="checkbox"
          selectionMode={selectionMode}
          showSwappedBounds={showSwappedBounds}
        />
      </div>
    );
  };

  const { isReaccom } = props;

  return isReaccom
    ? _renderReaccomBounds()
    : _renderChangeBounds();
};

const mapStateToProps = (state) => ({
  changeFlightPage: get(state, 'app.airChange.changeFlightPage.response'),
  reaccomFlightPage: get(state, 'app.airChange.reaccomFlightPage.response'),
  selectedBounds: get(state, 'app.airChange.selectedBounds'),
  isOpenJaw: isOpenJawReservation(state),
  isReaccom: isReaccomScenario(state)
});

const mapDispatchToProps = {
  retrieveReservationChangeableWithSearchTokenFn: retrieveReservationChangeableWithSearchToken,
  saveSelectedBoundsFn: saveSelectedBounds,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  searchForReaccomFlightsFn: searchForReaccomFlights
};

const enhancers = flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeSelectPage);
