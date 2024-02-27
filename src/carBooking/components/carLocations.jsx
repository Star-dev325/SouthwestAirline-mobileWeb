// @flow
import React from 'react';
import _ from 'lodash';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import AlphabetSelector from 'src/shared/components/alphabetSelector';
import { getAlphabet, scrollToHeader } from 'src/shared/helpers/alphabetSelectorHelper';
import cx from 'classnames';
import SearchBar from 'src/airports/components/searchBar';
import i18n from '@swa-ui/locale';
import type { CarLocationResponseType } from 'src/carBooking/flow-typed/carBooking.types';
import type { ElementRef, HeaderRefsType } from 'src/shared/flow-typed/shared.types';

type Props = {
  title: string,
  onAirportSelect: (CarLocationResponseType) => void,
  carLocations: Array<CarLocationResponseType>,
  onCancel: () => void,
  isWebView?: boolean
};

type State = {
  airports: Array<CarLocationResponseType>,
  filteredAirports: Array<CarLocationResponseType>,
  showShadow: boolean,
  showGroupHeader: boolean,
  showPageHeader: boolean,
  headerRefs: HeaderRefsType
};

class CarLocations extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      airports: [],
      filteredAirports: [],
      showShadow: false,
      showGroupHeader: true,
      showPageHeader: true,
      headerRefs: {}
    };
  }

  componentDidMount() {
    const { carLocations } = this.props;

    this.setState({
      airports: carLocations,
      filteredAirports: carLocations
    });
  }

  arePrevAndNextPropsLocationsSame = (
    prevLocations: Array<CarLocationResponseType>,
    nextLocations: Array<CarLocationResponseType>
  ) =>
    prevLocations.length === nextLocations.length &&
    prevLocations.filter((location, index) => location?.airport?.code === nextLocations[index].airport?.code).length ===
      prevLocations.length;

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { carLocations } = nextProps;

    if (!this.arePrevAndNextPropsLocationsSame(this.props.carLocations, carLocations)) {
      this.setState({
        airports: carLocations,
        filteredAirports: carLocations
      });
    }
  }

  _onAirportSelect = (airport: CarLocationResponseType) => {
    const { onAirportSelect } = this.props;

    onAirportSelect(airport);
  };

  _setHeaderRef = (header: string) => (ref: ElementRef) => {
    _.set(this.state.headerRefs, header, ref);
  };

  _displayAirportGroup = (group: *, id: number) => (
    <div className="airport-group-container" key={id}>
      <div className="airport-group-header" ref={this._setHeaderRef(group[0])}>
        {group[0]}
      </div>
      <ul className="airport-group">
        {_.map(group[1], (airport, index: number) => (
          <li key={index} onClick={this._onAirportSelect.bind(this, airport)}>
            {airport.airport.airportName}
          </li>
        ))}
      </ul>
    </div>
  );

  _groupAndSortAirports = (airports: Array<CarLocationResponseType>) => {
    const groupedList = _.groupBy(airports, (a) => a.airport.airportName.charAt(0).toUpperCase());

    return _.sortBy(_.toPairs(groupedList), '[0]');
  };

  _onSearchFocus = (searchString: string) => {
    this.setState({
      showShadow: !searchString,
      showPageHeader: false
    });
  };

  _onSearchBlur = (searchString: string) => {
    this.setState({
      showShadow: false,
      showPageHeader: !searchString
    });
  };

  _onSearchCancel = () => {
    this.setState({
      filteredAirports: this.state.airports,
      showShadow: false,
      showPageHeader: true,
      showGroupHeader: true
    });
  };

  _onSearchChange = (searchString: string) => {
    this.setState({
      filteredAirports: this._filterAirports(searchString),
      showShadow: !searchString,
      showGroupHeader: !searchString
    });
  };

  _filterAirports = (searchString: string) =>
    _.filter(this.state.airports, (airport) => {
      const result = airport.airport.airportName;

      if (searchString.toLowerCase() === 'mex' && (airport.state === 'NM' || airport.state === 'MX')) {
        return true;
      }

      return _.includes(result.toLowerCase(), searchString.toLowerCase());
    });

  _disableScroll = (e: Event) => {
    e.preventDefault();
  };

  render() {
    const { showShadow, filteredAirports, showGroupHeader, showPageHeader, headerRefs } = this.state;
    const { isWebView } = this.props;
    const sortedAirportGroups = this._groupAndSortAirports(filteredAirports);
    const airportGroupHeaders = _.map(sortedAirportGroups, '[0]');

    return (
      <div className={cx('airport-list', { 'options-list--with-shadow': showShadow })}>
        <PageHeaderWithButtons
          ref="pageHeader"
          hidden={!showPageHeader}
          title={this.props.title}
          rightButtons={
            isWebView ? [] : [{ name: i18n('CAR_BOOKING__CANCEL'), className: 'cancel', onClick: this.props.onCancel }]
          }
        />
        <SearchBar
          onFocus={this._onSearchFocus}
          onBlur={this._onSearchBlur}
          onChange={this._onSearchChange}
          onCancel={this._onSearchCancel}
        />
        <div
          className={cx('airport-list--results options-list--results', { 'no-header': !showGroupHeader })}
          ref="results"
        >
          {_.map(sortedAirportGroups, this._displayAirportGroup)}
          <AlphabetSelector
            shouldShow={showGroupHeader && !showShadow}
            alphabet={getAlphabet(airportGroupHeaders)}
            scrollTo={scrollToHeader(headerRefs)}
          />
          <div
            className="airport-list--results_shadow options-list--results_shadow"
            onTouchMove={this._disableScroll}
          />
          <div className={cx('airport-list--results_empty', { hide: filteredAirports.length })}>
            {i18n('CAR_BOOKING__NO_RESULTS')}
          </div>
        </div>
      </div>
    );
  }
}

export default CarLocations;
