// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import AirportListGroups from 'src/airports/components/airportListGroups';
import * as AirportsHelpers from 'src/airports/helpers/airportsHelpers';
import {
  fetchNearestAirportWithCoordinates,
  getPhoneLocation,
  getPhoneLocationForWebView
} from 'src/locationServices/actions';
import { showDialog } from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { showErrorPopUp } from 'src/shared/actions/sharedActions';
import Icon from 'src/shared/components/icon';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import SearchBar from 'src/airports/components/searchBar';
import {
  AIR_BOOKING_SHOPPING_SEARCH_FORM,
  MULTI_SELECT_GROUP_FORM_DESTINATION,
  MULTI_SELECT_GROUP_FORM_ORIGIN
} from 'src/shared/constants/formIds';
import { sitePaths } from 'src/shared/constants/siteLinks.js';
import sharedConstants from 'src/shared/constants/sharedConstants.js';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import LocationServicesError from 'src/shared/errors/locationServicesError';
import DeviceInfo from 'src/shared/helpers/deviceInfo';

import type { Node } from 'react';
import type { AirportGroupData, AirportType, MultiSelectGroup } from 'src/shared/flow-typed/shared.types';

const links = [
  {
    label: i18n('SHARED__AIRPORT_LIST__VISIT_SOUTHWEST_DOT_COM'),
    href: sitePaths.airportListFullSite
  },
  {
    label: i18n('SHARED__BUTTON_TEXT__PHONE_I_FLY_SWA'),
    href: sharedConstants.airportListPhoneInfo
  }
];

type Props = {
  airportGroupData?: AirportGroupData,
  allAirports: Array<AirportType>,
  children?: Node,
  clearFormDataByIdFn: (string) => {},
  clearMultiSelectGroupFormIdFn: (string) => void,
  deleteFromRecentAirportSearchFn: (airport: AirportType) => void,
  disableInternationals?: boolean,
  dontShowCurrentLocation?: boolean,
  hideSearchBarHeader?: boolean,
  isMultiSelectGroupEnabled: boolean,
  isReaccomCoTerminalEligible?: boolean,
  isWebView: boolean,
  modalId?: string,
  multiSelectGroup: MultiSelectGroup,
  onAirportSelect: (airport: AirportType, isCurrentLocation: boolean) => void,
  onCancel?: () => void,
  recentlySearched: Array<AirportType>,
  searchString?: string,
  showBackButton?: boolean,
  showDialogFn: (*) => Promise<*>,
  showErrorPopUpFn: (*) => Promise<*>,
  title?: string,
  updateFormDataValueFn: (string, *) => {},
  updateMultiSelectGroupFn: (AirportGroupData, string) => void,
  updateRecentAirportSearchFn: (airport: AirportType) => void
};

type State = {
  isSearching: boolean,
  isTyping: boolean,
  searchString: string,
  formId: string,
  isMultiSelectGroupEnabled: boolean,
  airportGroupData: AirportGroupData,
  showDoneButton: boolean
};

class AirportList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { airportGroupData = [], searchString = '', modalId, isMultiSelectGroupEnabled } = this.props;

    this.state = {
      isSearching: false,
      isTyping: false,
      searchString,
      formId: modalId === 'from' ? MULTI_SELECT_GROUP_FORM_ORIGIN : MULTI_SELECT_GROUP_FORM_DESTINATION,
      isMultiSelectGroupEnabled,
      airportGroupData,
      showDoneButton: !_.isEmpty(airportGroupData)
    };
  }

  static defaultProps = {
    isMultiSelectGroupEnabled: false,
    multiSelectGroup: {}
  };

  componentDidMount() {
    const { allAirports, multiSelectGroup, updateFormDataValueFn } = this.props;
    const { formId, airportGroupData } = this.state;
    const multipleAiportsFormState = multiSelectGroup[this._getMultipleAiportsFormKey()] ?? airportGroupData;
    const sortedMultiSelectGroupFormState = _.sortBy(multipleAiportsFormState);
    const airportData = allAirports.filter((airport) =>
      _.isEqual(_.sortBy(airport.airportGroups), sortedMultiSelectGroupFormState)
    );
    const airportGroupId = _.get(airportData, '[0].airportGroupId');

    this.setState({ airportGroupData: sortedMultiSelectGroupFormState }, () => {
      const formDataValues = {};

      _.forEach(sortedMultiSelectGroupFormState, (element) => {
        formDataValues[element] = true;
      });

      if (airportGroupId) {
        formDataValues[airportGroupId] = true;
      }
      updateFormDataValueFn(formId, formDataValues);
    });

    this._adjustAirportSelectModalHeight();
  }

  componentWillUnmount() {
    this._resetMultiSelectGroup();
  }

  _adjustAirportSelectModalHeight = () => {
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.onresize = (event) => AirportsHelpers.handleViewportResize(event);
      window.visualViewport.onscroll = () => AirportsHelpers.handleViewportScroll();
    }
  };

  _getMultipleAiportsFormKey = () => (this.state.formId === MULTI_SELECT_GROUP_FORM_ORIGIN ? 'origin' : 'destination');

  _resetMultiSelectGroup = (airportSelect: boolean = false) => {
    const { clearFormDataByIdFn, clearMultiSelectGroupFormIdFn } = this.props;
    const { isMultiSelectGroupEnabled, formId } = this.state;

    if (isMultiSelectGroupEnabled) {
      clearFormDataByIdFn(formId);

      if (airportSelect) {
        clearMultiSelectGroupFormIdFn(this._getMultipleAiportsFormKey());
      }
    }
  };

  _onAirportSelect = (airport: AirportType, isCurrentLocation = false) => {
    const { disableInternationals, onAirportSelect, updateRecentAirportSearchFn, showDialogFn } = this.props;

    if (disableInternationals && airport.countryCode !== 'US') {
      showDialogFn({
        active: true,
        name: 'airport-list-international-not-supported',
        title: i18n('SHARED__AIRPORT_LIST__WE_ARE_WORKING_ON_IT'),
        verticalLinks: {
          links
        },
        message: i18n('SHARED__AIRPORT_LIST__INTERNATIONAL_NOT_SUPPORTED'),
        closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL')
      });
    } else {
      if (this.state.searchString.length) {
        onAirportSelect(airport, isCurrentLocation);
        updateRecentAirportSearchFn(airport);
      } else {
        onAirportSelect(airport, isCurrentLocation);
      }
    }
    this._resetMultiSelectGroup(true);
  };

  _setAirportGroupData = (groupData: AirportGroupData) => {
    this.setState({ airportGroupData: groupData, showDoneButton: !_.isEmpty(groupData) });
  };

  _handleMultiSelectRecentSearch = (airport: AirportType) => {
    const { updateFormDataValueFn } = this.props;
    const { airportGroupSelected = [], multiSelectGroup } = airport;
    const formDataValues = {};

    if (airportGroupSelected.length) {
      airportGroupSelected.forEach((element) => (formDataValues[element] = true));

      if (_.isEqual(_.sortBy(airportGroupSelected), _.sortBy(multiSelectGroup))) {
        formDataValues[airport.airportGroupId] = true;
      }
      updateFormDataValueFn(this.state.formId, formDataValues);

      this.setState({ airportGroupData: airportGroupSelected }, () => {
        this._onDone(true);
      });
    }
  };

  _onDone = (isMultiSelectRecentSearch: boolean = false) => {
    const { allAirports, updateMultiSelectGroupFn, updateFormDataValueFn, updateRecentAirportSearchFn, onCancel } =
      this.props;
    const { airportGroupData } = this.state;
    const formDataKey = this._getMultipleAiportsFormKey();
    const airportData = allAirports.filter((airport) => (
      airportGroupData.length > 1
        ? (airport.multiSelectGroup && airport.multiSelectGroup.includes(airportGroupData[0]))
        : (airportGroupData[0] === airport.code)
    ));

    updateFormDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
      [formDataKey]: airportGroupData.length > 1 ? airportData[0].airportGroups.join(',') : airportGroupData[0]
    });
    updateMultiSelectGroupFn(airportGroupData, formDataKey);
    !isMultiSelectRecentSearch &&
      updateRecentAirportSearchFn({ ...airportData[0], airportGroupSelected: airportGroupData });
    onCancel && onCancel();
  };

  _onDeleteRecentAirportSearch = (airport: AirportType) => {
    const { deleteFromRecentAirportSearchFn } = this.props;

    deleteFromRecentAirportSearchFn(airport);
  };

  _onSearchFocus = () => {
    this.setState({
      isSearching: true,
      isTyping: true
    });
  };

  _onSearchBlur = () => {
    const { searchString } = this.state;

    this.setState({
      isSearching: !!searchString,
      isTyping: false
    });
  };

  _onSearchCancel = () => {
    this.setState({
      searchString: '',
      isSearching: false
    });
  };

  _onSearchChange = (searchString: string) => {
    this.setState({
      searchString
    });
  };

  _handlePhoneLocation = (position) => {
    const { allAirports } = this.props;

    const { longitude } = position.coords;
    const { latitude } = position.coords;

    fetchNearestAirportWithCoordinates(longitude, latitude).then((response) => {
      const airportObject = AirportsHelpers.getAirportFromCode(allAirports, response.nearestSwaAirport);

      this._onAirportSelect(airportObject, true);
    });
  };

  _handlePhoneLocationError = () => {
    const { showErrorPopUpFn } = this.props;

    showErrorPopUpFn(new LocationServicesError());
  };

  _clickOnCurrentLocation = () => {
    const { isWebView } = this.props;

    if (isWebView) {
      getPhoneLocationForWebView()
        .then(this._handlePhoneLocation)
        .catch(this._handlePhoneLocationError);
    } else {
      getPhoneLocation()
        .then(this._handlePhoneLocation)
        .catch(this._handlePhoneLocationError);
    }
  };

  _findAirportByCode = (code: string) => {
    const { allAirports } = this.props;

    return _.find(allAirports, ['code', code]);
  };

  _filterAirports = (searchString: string): Array<AirportType> => {
    const { allAirports } = this.props;
    const filteredAirports = _.filter(allAirports, (airport) => {
      let fullAirportName = `${airport.displayName}, ${airport.cityState} - ${airport.code}`;

      if (airport && airport.airportGroupName) {
        fullAirportName += ` - ${airport.airportGroupName}`;
      }

      if (searchString.toLowerCase() === 'mex' && (airport.cityState === 'NM' || airport.cityState === 'MX')) {
        return true;
      }

      return _.includes(fullAirportName.toLowerCase(), searchString.toLowerCase());
    });
    const uniqueFilteredAirports = _.uniqBy(filteredAirports, 'code');
    const groupAirports = [];

    _.forEach(uniqueFilteredAirports, (airport) => {
      _.forEach(airport.airportGroups, (airportCode) => {
        const airportByCode = this._findAirportByCode(airportCode);

        airportByCode && groupAirports.push(airportByCode);
      });
    });

    return _.chain(uniqueFilteredAirports)
      .concat(groupAirports)
      .uniqBy('code')
      .sortBy((airport) => {
        const name = _.get(airport, 'airportName');

        if (name) {
          return name;
        }
      })
      .value();
  };

  _showCurrentLocation = () => {
    const { isWebView } = this.props;

    return (
      <div className="airport-group-container">
        <ul className="airport-group">
          <li data-qa="airport-list-current-location" onClick={this._clickOnCurrentLocation}>
            <div className="flex flex-cross-center">
              <Icon
                className={cx('pblue pr3', { xxlarge: !isWebView }, { xlarge: isWebView })}
                type={cx({ 'current-location': !isWebView }, { 'location-arrow': isWebView })}
              />
              <span>{i18n('SHARED__AIRPORT_LIST__CURRENT_LOCATION')}</span>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  _shouldShowCurrentLocation = () => {
    const { isSearching, searchString } = this.state;
    const { dontShowCurrentLocation, isReaccomCoTerminalEligible } = this.props;
    const isSupportedDevice = _.includes(['iOS', 'Android'], DeviceInfo.os.name);
    const userIsNotSearching = !isSearching || !searchString;

    return userIsNotSearching && !dontShowCurrentLocation && isSupportedDevice && !isReaccomCoTerminalEligible;
  };

  render() {
    const { isSearching, searchString, isTyping } = this.state;
    const {
      clearFormDataByIdFn,
      disableInternationals,
      hideSearchBarHeader,
      isReaccomCoTerminalEligible,
      isWebView,
      onCancel,
      recentlySearched,
      showBackButton,
      title,
      updateFormDataValueFn
    } = this.props;
    const { airportGroupData, formId, isMultiSelectGroupEnabled, showDoneButton } = this.state;
    const filteredAirports: Array<AirportType> = this._filterAirports(searchString);
    const buttons = showBackButton
      ? []
      : showDoneButton
        ? [{ name: 'Done', className: 'cancel', onClick: () => this._onDone() }]
        : [{ name: 'Cancel', className: 'cancel', onClick: onCancel }];
    const userIsNotSearching = !isSearching || !searchString;
    const hideShadow = !isSearching || !!searchString;
    const hidePageHeader = !isMultiSelectGroupEnabled && (isSearching || !!searchString || hideSearchBarHeader);

    return (
      <div
        className={cx('airport-list', {
          'options-list--with-shadow': !hideShadow,
          'airport-list--searching': hidePageHeader
        })}
      >
        <PageHeaderWithButtons
          ref="pageHeader"
          hidden={hidePageHeader}
          title={title}
          rightButtons={buttons}
          showBackButton={showBackButton}
          className={cx({ 'action-bar-webview': isWebView })}
        />
        {!isReaccomCoTerminalEligible && (
          <SearchBar
            onBlur={this._onSearchBlur}
            onCancel={this._onSearchCancel}
            onChange={this._onSearchChange}
            onFocus={this._onSearchFocus}
            showCancel={!isMultiSelectGroupEnabled}
          />)}
        <div className={cx('airport-list--results options-list--results')} ref="results">
          {userIsNotSearching && this.props.children}
          {this._shouldShowCurrentLocation() && this._showCurrentLocation()}
          <AirportListGroups
            airportGroupData={airportGroupData}
            airports={filteredAirports}
            clearFormDataByIdFn={clearFormDataByIdFn}
            disableInternationals={disableInternationals}
            formId={formId}
            handleMultiSelectRecentSearch={this._handleMultiSelectRecentSearch}
            isMultiSelectGroupEnabled={isMultiSelectGroupEnabled}
            isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
            onAirportSelect={this._onAirportSelect}
            onDeleteRecentAirportSearch={this._onDeleteRecentAirportSearch}
            recentAirportSearches={recentlySearched}
            setAirportGroupData={this._setAirportGroupData}
            showAlphabetSelector={!isTyping}
            sortByGroups={searchString !== ''}
            updateFormDataValueFn={updateFormDataValueFn}
          />
          <div
            className="airport-list--results_shadow options-list--results_shadow"
            onTouchMove={(e) => e.preventDefault()}
          />
          <div className={cx('airport-list--results_empty', { hide: filteredAirports.length })}>No Results</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView', false)
});

const mapDispatchToProps = {
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  clearMultiSelectGroupFormIdFn: AirportsActions.clearMultiSelectGroupFormId,
  deleteFromRecentAirportSearchFn: AirportsActions.deleteFromRecentAirportSearch,
  showDialogFn: showDialog,
  showErrorPopUpFn: showErrorPopUp,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  updateMultiSelectGroupFn: AirportsActions.updateMultiSelectGroup,
  updateRecentAirportSearchFn: AirportsActions.updateRecentAirportSearch
};

const enhancers = _.flowRight(withBodyClass('airports-container'), connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirportList);
