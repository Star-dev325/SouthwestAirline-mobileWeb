// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import AirChangeShoppingSearchForm from 'src/airChange/components/airChangeShoppingSearchForm';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';
import { isDynamicWaiverEligible } from 'src/airChange/helpers/dynamicWaiverHelper';
import { isOpenJawReservation, isReaccomScenario } from 'src/airChange/selectors/airChangeSelectPageSelector';
import { getReaccomFlightPageResponse } from 'src/airChange/selectors/airChangeShoppingPageSelectors';
import { getInitFormData, getSearchOptions } from 'src/airChange/selectors/airChangeShoppingSearchPageSelectors';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import Container from 'src/shared/components/container';
import Message from 'src/shared/components/message';
import PageHeader from 'src/shared/components/pageHeader';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { AIR_CHANGE_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import {
  convertBackgroundBrandColor,
  convertBrandColor,
  iconTypeMap
} from 'src/shared/helpers/productDefinitionsHelper';
import { generateSearchRequest } from 'src/shared/helpers/shoppingSearchHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type {
  ChangeFlightPage,
  FormDataType,
  ReaccomFlightPage,
  SearchFlightOptions,
  SearchOptionsType,
  SelectedBounds
} from 'src/airChange/flow-typed/airChange.types';
import type { AirportType, Push } from 'src/shared/flow-typed/shared.types';

const { ADULT } = PassengerTypes;

type Props = {
  allAirports: Array<AirportType>,
  changeFlightPageResponse?: ChangeFlightPage,
  clearSelectedProductsFn: (boolean) => void,
  defaultLastBookableDate: string,
  hideDialogFn: () => Promise<*>,
  history: {
    location: {
      pathname: string
    }
  },
  initFormData: FormDataType,
  isOpenJawReservation: boolean,
  isReaccom: boolean,
  loadAirportsFn: () => void,
  loadRecentlySearchedFn: () => void,
  push: Push,
  reaccomFlightPageResponse?: ReaccomFlightPage,
  recentlySearched: Array<AirportType>,
  searchForFlightsFn: (SearchFlightOptions, goToNextPage?: () => void, pathname?: string) => void,
  searchForReaccomFlightsFn: (Link, string) => void,
  searchOptions: SearchOptionsType,
  selectedBounds: SelectedBounds,
  showDialogFn: (*) => void,
  updateSelectedAirportInfoFn: (airportInfo: *) => void,
  updateShouldForbidForwardFn: (boolean) => void
};

export class AirChangeShoppingSearchPage extends React.Component<Props> {
  componentDidMount() {
    const { loadAirportsFn, loadRecentlySearchedFn } = this.props;

    loadAirportsFn();
    loadRecentlySearchedFn();
  }

  _getAirChangeShoppingPageTitle = (selectedBounds: SelectedBounds) => {
    if (_.get(selectedBounds, 'firstbound') && _.get(selectedBounds, 'secondbound')) {
      return i18n('AIR_CHANGE__SHOPPING_PAGE_TITLE__CHANGE');
    } else if (this.props.isOpenJawReservation) {
      return i18n('AIR_CHANGE__SHOPPING_PAGE_TITLE__DEPARTURE');
    } else if (_.get(selectedBounds, 'firstbound')) {
      return i18n('AIR_CHANGE__SHOPPING_PAGE_TITLE__DEPARTURE');
    } else if (_.get(selectedBounds, 'secondbound')) {
      return i18n('AIR_CHANGE__SHOPPING_PAGE_TITLE__RETURN');
    }
  };

  _goToShoppingPage = (formData: FormDataType) => {
    const { ...others } = formData;
    const {
      changeFlightPageResponse: { _links: { changeShopping } = {}, boundSelections: changeBoundSelections } = {},
      clearSelectedProductsFn,
      history: {
        location: { pathname }
      },
      isReaccom = false,
      push,
      searchForFlightsFn,
      selectedBounds,
      updateShouldForbidForwardFn,
      reaccomFlightPageResponse: {
        _links: { reaccomProducts, reaccomProducts: { body: { shareDataToken } = {} } = {} } = {},
        boundSelections: reaccomBoundSelections
      } = {},
      searchForReaccomFlightsFn
    } = this.props;
    const direction = selectedBounds.firstbound ? OUTBOUND : INBOUND;
    const pushToPath = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShopping' }), {
      direction,
      paxType: ADULT
    });

    clearSelectedProductsFn(isReaccom);
    updateShouldForbidForwardFn(false);

    if (isReaccom) {
      const reaccomSearchRequest = generateSearchRequest({
        boundSelections: reaccomBoundSelections,
        changeShoppingLink: reaccomProducts,
        searchRequest: { ...others },
        selectedBounds
      });
      const updatedReaccomSearchRequest = {
        ...reaccomSearchRequest,
        body: {
          ...reaccomSearchRequest.body,
          shareDataToken
        }
      };

      searchForReaccomFlightsFn(updatedReaccomSearchRequest, pushToPath);
    } else {
      searchForFlightsFn(
        {
          boundSelections: changeBoundSelections,
          changeShoppingLink: changeShopping,
          searchRequest: {
            ...others,
            diffs: {}
          },
          selectedBounds
        },
        () => push(pushToPath),
        pathname
      );
    }
  };

  _onClickFindFlight = (formData: FormDataType) => {
    const {
      changeFlightPageResponse: { dynamicWaivers: changeDynamicWaivers = [] } = {},
      hideDialogFn,
      isReaccom,
      reaccomFlightPageResponse: { dynamicWaivers: reaccomDynamicWaivers = [] } = {},
      selectedBounds,
      showDialogFn
    } = this.props;
    const dynamicWaivers = isReaccom ? reaccomDynamicWaivers : changeDynamicWaivers;

    if (!_.isEmpty(dynamicWaivers) && !isDynamicWaiverEligible(dynamicWaivers, formData, selectedBounds)) {
      showDialogFn({
        message: i18n('AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE'),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: hideDialogFn
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                this._goToShoppingPage(formData);
              });
            }
          }
        ]
      });
    } else {
      this._goToShoppingPage(formData);
    }
  };

  render() {
    const {
      allAirports,
      changeFlightPageResponse: { _meta: { hasUnaccompaniedMinor: hasUnaccompaniedMinorForChange } = {} } = {},
      defaultLastBookableDate,
      initFormData,
      isReaccom,
      reaccomFlightPageResponse: {
        _meta: { allowARNKPnrs, hasUnaccompaniedMinor: hasUnaccompaniedMinorForReaccom } = {},
        boundSelections: reaccomBoundSelections = [],
        flightSearchMessage
      } = {},
      recentlySearched,
      searchOptions,
      selectedBounds,
      updateSelectedAirportInfoFn
    } = this.props;
    const hasUnaccompaniedMinor = isReaccom ? hasUnaccompaniedMinorForReaccom : hasUnaccompaniedMinorForChange;
    const lastBookableDate = searchOptions.lastBookableDate
      ? dayjs(searchOptions.lastBookableDate)
      : dayjs(defaultLastBookableDate);
    const earliestBookableDate = searchOptions.earliestBookableDate
      ? dayjs(searchOptions.earliestBookableDate)
      : searchOptions.earliestBookableDate;
    const isReaccomCoTerminalEligible =
      reaccomBoundSelections && getIsReaccomCoTerminalEligible(reaccomBoundSelections);

    const _renderHeaderMessage = ({ body, icon, inverseThemeColor, primaryThemeColor }) => {
      const backgroundColor = convertBackgroundBrandColor(inverseThemeColor, 'bgpdkblue');
      const textColor = convertBrandColor(primaryThemeColor, 'white');
      const classnames = `${backgroundColor} ${textColor}`;

      return (
        <Message className={classnames} status={iconTypeMap[icon]}>
          <div
            className="air-change-shopping-search-page--header-message-body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Message>
      );
    };

    return (
      <div>
        <PageHeader>{this._getAirChangeShoppingPageTitle(this.props.selectedBounds)}</PageHeader>
        {flightSearchMessage && _renderHeaderMessage(flightSearchMessage)}
        <Container>
          <AirChangeShoppingSearchForm
            allAirports={allAirports}
            allowARNKPnrs={allowARNKPnrs}
            earliestBookableDate={earliestBookableDate}
            formId={AIR_CHANGE_SHOPPING_SEARCH_FORM}
            hasUnaccompaniedMinor={hasUnaccompaniedMinor}
            initialFormData={initFormData}
            isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
            isRoundTrip={reaccomBoundSelections.length > 1}
            lastBookableDate={lastBookableDate}
            onSubmit={this._onClickFindFlight}
            recentlySearched={recentlySearched}
            searchOptions={searchOptions}
            selectedBounds={selectedBounds}
            updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allAirports: _.get(state, 'app.airports.allAirports'),
  changeFlightPageResponse: _.get(state, 'app.airChange.changeFlightPage.response'),
  defaultLastBookableDate: state.app.lastBookableDate,
  initFormData: getInitFormData(state),
  isOpenJawReservation: isOpenJawReservation(state),
  isReaccom: isReaccomScenario(state),
  reaccomFlightPageResponse: getReaccomFlightPageResponse(state),
  recentlySearched: _.get(state, 'app.airports.recentlySearched'),
  searchOptions: getSearchOptions(state),
  selectedBounds: state.app.airChange.selectedBounds
});

const mapDispatchToProps = {
  clearSelectedProductsFn: AirChangeActions.clearSelectedProducts,
  hideDialogFn: hideDialog,
  loadAirportsFn: AirportsActions.loadAirports,
  loadRecentlySearchedFn: AirportsActions.loadRecentlySearched,
  searchForFlightsFn: AirChangeActions.searchForFlights,
  searchForReaccomFlightsFn: AirChangeActions.searchForReaccomFlights,
  showDialogFn: showDialog,
  updateSelectedAirportInfoFn: AirportInfoActions.updateSelectedAirportInfo,
  updateShouldForbidForwardFn: AirChangeActions.updateShouldForbidForward
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  withFeatureToggles,
  withBodyClass('air-change-search-flight'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirChangeShoppingSearchPage);
