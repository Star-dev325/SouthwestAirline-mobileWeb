import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AirportCard from 'src/airports/components/airportCard';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

describe('AirportCard', () => {
  let handleMultiSelectRecentSearchStub;
  let onAirportSelectStub;
  let onDeleteRecentAirportSearchStub;

  beforeEach(() => {
    onAirportSelectStub = jest.fn();
    handleMultiSelectRecentSearchStub = jest.fn();
    onDeleteRecentAirportSearchStub = jest.fn();
  });

  describe('airport label display', () => {
    it("should use 'displayName, cityState - code' to displayed as label", () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should use "airportGroupName - airportGroupSelected" to displayed as label', () => {
      const { container } = createComponent({
        airport: getMultiSelectGroup()['Recently Searched'][0],
        handleMultiSelectRecentSearch: handleMultiSelectRecentSearchStub
      });

      expect(container).toMatchSnapshot();
    });

    it('should not use "airportGroupName - airportGroupSelected" to displayed as label when handleMultiSelectRecentSearch is not passed', () => {
      const { container } = createComponent({
        airport: getMultiSelectGroup()['Recently Searched'][0]
      });

      expect(container).toMatchSnapshot();
    });

    it('should not use "airportGroupName - airportGroupSelected" to displayed as label when airportGroupSelected is empty', () => {
      const { container } = createComponent({
        airport: getMultiSelectGroup()['Boston Area Airports'][0]
      });

      expect(container).toMatchSnapshot();
    });

    it('should className italics if airport is international airport', () => {
      const { container } = createComponent({
        disableInternationals: true,
        airport: { ...airport, countryCode: 'BZ' }
      });

      expect(container).toMatchSnapshot();
    });

    it('should return null if airport is empty', () => {
      const { container } = createComponent({
        airport: {}
      });

      expect(container).toBeEmpty();
    });
  });

  describe('when clicked', () => {
    it('should trigger the onAirportSelect callback with the airport', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.flex-auto'));

      expect(onAirportSelectStub).toHaveBeenCalled();
    });

    it('should trigger the handleMultiSelectRecentSearch callback with the airport', () => {
      const { container } = createComponent({
        airport: getMultiSelectGroup()['Recently Searched'][0],
        handleMultiSelectRecentSearch: handleMultiSelectRecentSearchStub
      });

      fireEvent.click(container.querySelector('.flex-auto'));

      expect(handleMultiSelectRecentSearchStub).toHaveBeenCalledWith(getMultiSelectGroup()['Recently Searched'][0]);
    });
  });

  describe('when remove icon clicked', () => {
    it('should trigger the onDeleteRecentAirportSearch callback with the airport', () => {
      const { container } = createComponent({
        onDeleteRecentAirportSearch: onDeleteRecentAirportSearchStub
      });

      fireEvent.click(container.querySelector('.icon_remove'));

      expect(onDeleteRecentAirportSearchStub).toHaveBeenCalledWith(airport);
    });
  });

  function createComponent(props) {
    const defaultProps = {
      airport: props?.airport ?? airport,
      onAirportSelect: onAirportSelectStub
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(<AirportCard {...newProps} />);
  }

  const airport = {
    airportName: 'Akron-Canton',
    airportSearchName: 'Ohio',
    cityName: 'Akron',
    cityState: 'OH',
    code: 'CAK',
    countryCode: 'US',
    displayName: 'Akron-Canton-displayName',
    latitude: '40.9161',
    longitude: '-81.4422',
    marketingCarriers: ['WN'],
    shortDisplayName: 'Akron'
  };
});
