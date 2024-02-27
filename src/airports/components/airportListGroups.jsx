// @flow

import React from 'react';
import _ from 'lodash';
import AirportListGroup from 'src/airports/components/airportListGroup';
import AlphabetSelector from 'src/shared/components/alphabetSelector';
import { getAlphabet, scrollToHeader } from 'src/shared/helpers/alphabetSelectorHelper';
import type { AirportType, ElementRef, HeaderRefsType, AirportGroupData } from 'src/shared/flow-typed/shared.types';

type Props = {
  airportGroupData: AirportGroupData,
  airports: Array<AirportType>,
  clearFormDataByIdFn: (string) => {},
  disableInternationals?: boolean,
  formId: string,
  handleMultiSelectRecentSearch: (airport: AirportType) => void,
  isMultiSelectGroupEnabled: boolean,
  isReaccomCoTerminalEligible?: boolean,
  onAirportSelect: (airport: AirportType) => void,
  onDeleteRecentAirportSearch?: (airport: AirportType) => void,
  recentAirportSearches: Array<AirportType>,
  setAirportGroupData: (groupData: AirportGroupData) => void,
  showAlphabetSelector: boolean,
  sortByGroups?: boolean,
  updateFormDataValueFn: (string, *) => {}
};

const AirportListGroups = ({
  airportGroupData,
  airports,
  clearFormDataByIdFn,
  disableInternationals = false,
  formId,
  handleMultiSelectRecentSearch,
  isMultiSelectGroupEnabled,
  isReaccomCoTerminalEligible,
  onAirportSelect,
  onDeleteRecentAirportSearch,
  recentAirportSearches,
  setAirportGroupData,
  showAlphabetSelector = false,
  sortByGroups = false,
  updateFormDataValueFn
}: Props) => {
  const _groupAndSortAirports = () => {
    const partitionedAirports = sortByGroups ? _.partition(airports, 'airportGroupId') : [airports];
    const sortedAirports = _.map(partitionedAirports, (airportGroup) =>
      _.chain(airportGroup)
        .map()
        .groupBy(
          sortByGroups
            ? (airport) => airport.airportGroupName || airport.airportName.charAt(0).toUpperCase()
            : (airport) => {
              const name = _.get(airport, 'airportName');

              if (name) {
                return name.charAt(0).toUpperCase();
              }
            }
        )
        .toPairs()
        .sortBy('[0]')
        .value()
    );

    return _.flatten(sortedAirports);
  };

  const _setHeaderRef = (header: string) => (ref: ElementRef) => {
    _.set(headerRefs, header, ref);
  };

  const _displayAirportGroup = (group, id: number) => {
    const groupId = _.get(group[1], '[0].airportGroupId', '');

    return (
      <div key={id} ref={_setHeaderRef(group[0])}>
        <AirportListGroup
          airportGroupData={airportGroupData}
          airports={group[1]}
          clearFormDataById={clearFormDataByIdFn}
          disableInternationals={disableInternationals}
          formId={formId}
          group={group[0]}
          groupId={groupId}
          isMultiSelectGroupEnabled={isMultiSelectGroupEnabled}
          isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
          key={id}
          onAirportSelect={onAirportSelect}
          setAirportGroupData={setAirportGroupData}
          updateFormDataValueFn={updateFormDataValueFn}
        />
      </div>
    );
  };

  const _renderRecentAirportSearches = () => {
    const filteredRecentAirportSearches = isMultiSelectGroupEnabled
      ? recentAirportSearches
      : recentAirportSearches &&
        recentAirportSearches.filter(
          (recentSearch) => !recentSearch?.airportGroupSelected || recentSearch?.airportGroupSelected?.length === 1
        );

    return (
      !_.isEmpty(filteredRecentAirportSearches) && (
        <AirportListGroup
          airports={filteredRecentAirportSearches}
          disableInternationals={disableInternationals}
          group="Recent Searches"
          handleMultiSelectRecentSearch={handleMultiSelectRecentSearch}
          key={'recentAirportSearches'}
          onAirportSelect={onAirportSelect}
          onDeleteRecentAirportSearch={onDeleteRecentAirportSearch}
        />
      )
    );
  };

  const headerRefs: HeaderRefsType = {};

  const sortedAirportGroups = _groupAndSortAirports();
  const airportGroupHeaders = _.map(sortedAirportGroups, '[0]');

  return (
    <div className="airport-list-groups">
      {_renderRecentAirportSearches()}
      {_.map(sortedAirportGroups, _displayAirportGroup)}
      {!isReaccomCoTerminalEligible && (
        <AlphabetSelector
          alphabet={getAlphabet(airportGroupHeaders)}
          scrollTo={scrollToHeader(headerRefs)}
          shouldShow={showAlphabetSelector}
        />
      )}
    </div>
  );
};

export default AirportListGroups;
