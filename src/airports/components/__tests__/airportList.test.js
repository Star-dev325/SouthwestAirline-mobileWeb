jest.mock('src/airports/actions/airportsActions', () => ({
  clearMultiSelectGroupFormId: jest.fn().mockReturnValue({ type: 'test' }),
  deleteFromRecentAirportSearch: jest.fn().mockReturnValue({ type: 'test' }),
  updateMultiSelectGroup: jest.fn().mockReturnValue({ type: 'test' }),
  updateRecentAirportSearch: jest.fn().mockReturnValue({ type: 'test' })
}));
jest.mock('src/shared/actions/dialogActions', () => ({
  showDialog: jest.fn().mockReturnValue({ type: 'show dialog' })
}));
jest.mock('src/shared/helpers/deviceInfo', () => ({
  os: {
    name: 'iOS'
  }
}));
jest.mock('src/shared/actions/formDataActions', () => ({
  clearFormDataById: jest.fn().mockReturnValue({ type: 'clear form' }),
  updateFormDataValue: jest.fn().mockImplementation((formId, fieldValues) => ({
    formId,
    fieldValues,
    type: 'UPDATE_FORM_DATA_VALUE',
    url: '/pathname?search'
  })),
  updateFormFieldDataValue: jest.fn().mockReturnValue({ type: 'form field' })
}));
jest.mock('src/shared/actions/sharedActions', () => ({
  ...jest.requireActual('src/shared/actions/sharedActions'),
  showErrorPopUp: jest.fn().mockReturnValue({ type: 'show error' })
}));

import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import Q from 'q';
import React from 'react';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import AirportList from 'src/airports/components/airportList';
import { handleViewportResize } from 'src/airports/helpers/airportsHelpers';
import * as LocationServiceActions from 'src/locationServices/actions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM, MULTI_SELECT_GROUP_FORM_DESTINATION } from 'src/shared/constants/formIds';
import BrowserObject from 'src/shared/helpers/browserObject';
import deviceInfo from 'src/shared/helpers/deviceInfo';
import * as SharedActions from 'src/shared/actions/sharedActions';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';

const { window } = BrowserObject;

describe('Airport List Component', () => {
  const getPhoneLocationForWebViewFnStub = jest
    .spyOn(LocationServiceActions, 'getPhoneLocationForWebView')
    .mockResolvedValue({ type: 'location', coords: { latitude: 10, longitude: 10 } });
  const getPhoneLocationFnStub = jest
    .spyOn(LocationServiceActions, 'getPhoneLocation')
    .mockResolvedValue({ type: 'location', coords: { latitude: 10, longitude: 10 } });
  const fetchNearestAirportWithCoordinatesFnStub = jest
    .spyOn(LocationServiceActions, 'fetchNearestAirportWithCoordinates')
    .mockResolvedValue({ type: 'location', nearestSwaAirport: 'DEN' });
  const onAirportSelectStub = jest.fn();
  const onCancelStub = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('normal state', () => {
    it('should not display shadow layer', () => {
      const { container } = createComponent();

      expect(container.querySelector('.options-list--with-shadow')).not.toBeInTheDocument();
    });

    it('should show group header', () => {
      const { container } = createComponent();
      const resultDiv = container.querySelector('.airport-list--results');

      expect(resultDiv).not.toHaveClass('no-header');
    });

    it('should show page header', () => {
      const { container } = createComponent();

      expect(container.querySelector('.action-bar-buttons')).not.toBeNull();
    });

    it('should show page header', () => {
      const showBackButton = true;

      const { container } = createComponent({
        airports: undefined,
        onAirportSelect: () => {},
        showBackButton
      });

      expect(container.querySelector('.icon_keyboard-arrow-left')).toBeInTheDocument();
    });

    it('the container should scrollable', () => {
      const { container } = createComponent();
      const airportDiv = container.querySelector('.airport-list--results');

      expect(airportDiv).not.toHaveClass('overflow-hidden');
    });
  });

  describe('visual viewport', () => {
    it('should utilize the visualViewport resize and scroll methods', () => {
      const event = { target: { height: 320 } };

      window.visualViewport = {
        onresize: () => handleViewportResize(event)
      };

      createComponent();
    });
  });

  describe('recent searches', () => {
    beforeEach(() => {
      AirportsActions.updateRecentAirportSearch.mockReturnValueOnce({
        recentlySearched: AIRPORT_LIST.slice(0, 2),
        type: 'recent search'
      });
    });

    it('should display recent searches header when recent searches are available', () => {
      const { container } = createComponent({ dontShowCurrentLocation: true, recentlySearched: RECENT_AIRPORT_LIST });

      expect(
        container.querySelector('.airport-group-container').querySelector('.airport-group-header').textContent
      ).toContain('Recent Searches');
    });

    it('should display 3 recent airport searches', () => {
      const { container } = createComponent({ dontShowCurrentLocation: true, recentlySearched: RECENT_AIRPORT_LIST });
      const firstGroupContainer = container.querySelector('.airport-group-container');

      expect(firstGroupContainer).toMatchSnapshot();
    });

    it('should display a remove icon next to each recent search', () => {
      const { container } = createComponent({ dontShowCurrentLocation: true, recentlySearched: RECENT_AIRPORT_LIST });
      const firstGroupContainer = container.querySelector('.airport-group-container');

      expect(firstGroupContainer.querySelector('[data-qa="recent-search-remove-button"]')).toBeInTheDocument();
    });

    it('should display a remove icon next to each recent search and call the _onDeleteRecentAirportSearch function on click', () => {
      const { container } = createComponent({ dontShowCurrentLocation: true, recentlySearched: RECENT_AIRPORT_LIST });
      const firstGroupContainer = container.querySelector('.airport-group-container');
      const recentSearchDeleteBtn = firstGroupContainer.querySelector('[data-qa="recent-search-remove-button"]');

      expect(recentSearchDeleteBtn).toBeInTheDocument();

      fireEvent.click(recentSearchDeleteBtn);

      expect(AirportsActions.deleteFromRecentAirportSearch).toHaveBeenCalled();
    });
  });

  describe('searching state', () => {
    describe('search bar get input focus', () => {
      beforeEach(() => {
        const { container } = createComponent();
        const searchInput = container.querySelector('input');

        fireEvent.focus(searchInput);
      });

      it('should display shadow layer', () => {
        const { container } = createComponent();
        const shadowDiv = container.querySelector('.airport-list--results_shadow');

        expect(shadowDiv).not.toHaveClass('hide');
      });

      it('should disable scroll behavior', () => {
        const { container } = createComponent();
        const searchInput = container.querySelector('input');

        fireEvent.focus(searchInput);

        expect(container.querySelector('.airport-list')).toHaveClass('options-list--with-shadow');
      });

      it('should show group header', () => {
        const { container } = createComponent();
        const resultDiv = container.querySelector('.airport-list--results');

        expect(resultDiv).not.toHaveClass('no-header');
      });

      it('should not show airport groups when toggle is false', () => {
        const { container } = createComponent({ searchString: 'Area' });

        expect(container).toMatchSnapshot();
      });

      it('should hide page header', () => {
        const { container } = createComponent({
          isMultiSelectGroupEnabled: false,
          searchString: 'Area'
        });

        expect(container.querySelector('.page-header.hidden')).not.toBeNull();
      });

      it('should hide shadow and show page header after user click cancel button', () => {
        const { container } = createComponent();
        const searchInput = container.querySelector('input');

        fireEvent.focus(searchInput);

        fireEvent.click(container.querySelector('.airport-search-bar--cancel'));

        expect(container).not.toHaveClass('options-list--with-shadow');
      });

      it('should not render search bar, current location and alphabet selector when isReaccomCoTerminalEligible is true', () => {
        const { container } = createComponent({ isReaccomCoTerminalEligible: true });

        expect(container).toMatchSnapshot();
      });

      describe('filtering', () => {
        it('should show airports even when some are undefined', () => {
          const { container } = createComponent({
            airports: [
              undefined,
              {
                airportGroupId: 'TEST',
                airportGroupName: 'TestGroup',
                airportGroups: ['CAK', 'ALB'],
                airportName: 'Akron-Canton',
                airportSearchName: 'Ohio',
                cityName: 'Akron',
                cityState: 'OH',
                code: 'CAK',
                countryCode: 'US',
                displayName: 'Akron-Canton',
                latitude: '40.9161',
                longitude: '-81.4422',
                marketingCarriers: ['WN'],
                shortDisplayName: 'Akron'
              }
            ]
          });
          const airportListGroups = container.querySelector('.airport-list-groups');

          expect(airportListGroups).toBeInTheDocument();
          jest.clearAllMocks();
        });
      });

      describe('blur and focus search input again', () => {
        it('should hide and show shadow layer', () => {
          const { container } = createComponent();
          const wrapper = container.querySelector('.airport-list');
          const searchInput = container.querySelector('input');

          fireEvent.blur(searchInput);
          expect(wrapper).not.toHaveClass('options-list--with-shadow');
          fireEvent.focus(searchInput);
          expect(wrapper).toHaveClass('options-list--with-shadow');
        });

        it('should hide and show page header', () => {
          const { container } = createComponent();
          const searchInput = container.querySelector('input');

          expect(container.querySelector('.page-header.hidden')).toBeNull();
          fireEvent.focus(searchInput);
          expect(container.querySelector('.page-header.hidden')).not.toBeNull();
        });
      });
    });

    describe('after typing something', () => {
      describe('find airport', () => {
        beforeEach(() => {
          const { container } = createComponent();
          const searchInput = container.querySelector('input');

          fireEvent.change(searchInput, { target: { value: 'D' } });
          fireEvent.focus(searchInput);
        });

        it('should hide shadow layer', () => {
          const { container } = createComponent();

          expect(container).not.toHaveClass('options-list--with-shadow');
        });

        it('should display group header', (done) => {
          const { container } = createComponent();

          waitFor.untilAssertPass(() => {
            const resultDiv = container.querySelector('.airport-list--results');

            expect(resultDiv).not.toHaveClass('no-header');
          }, done);
        });

        it('should filter the airport', (done) => {
          const { container } = createComponent();

          waitFor.untilAssertPass(() => {
            const airportCards = container.querySelector('.flex');

            expect(airportCards).not.toBeNull();
          }, done);
        });

        it('should clean search field after user clicks cancel button', () => {
          const { container } = createComponent();
          const searchInput = container.querySelector('input');

          fireEvent.change(searchInput, { target: { value: 'D' } });
          fireEvent.focus(searchInput);

          fireEvent.click(container.querySelector('.airport-search-bar--cancel'));

          const resultDiv = container.querySelector('.airport-list--results');

          expect(container.querySelector('input').textContent).toContain('');
          expect(resultDiv).not.toHaveClass('no-header');
        });

        describe('blur and focus search input again', () => {
          it('should always hide shadow layer', () => {
            const { container } = createComponent();
            const searchInput = container.querySelector('input');

            expect(container).not.toHaveClass('options-list--with-shadow');
            fireEvent.blur(searchInput);
            expect(container).not.toHaveClass('options-list--with-shadow');
            fireEvent.focus(searchInput);
            expect(container).not.toHaveClass('options-list--with-shadow');
          });
        });

        describe('invalid airport group', () => {
          it('should still return valid searches', (done) => {
            const AIRPORT_LIST = [
              {
                airportGroupId: 'HOI',
                airportGroupName: 'Houston',
                airportGroups: ['IAH', 'HOU'],
                airportName: 'Houston (Hobby)',
                airportSearchNaem: 'Houston (Hobby), TX - HOU',
                cityName: 'Houston',
                cityState: 'TX',
                code: 'HOU',
                countryCode: 'US',
                displayName: 'Houston (Hobby)'
              },
              {
                airportGroupId: 'DAL',
                airportGroupName: 'Dallas',
                airportGroups: ['DAL'],
                airportName: 'Dallas Love Field',
                airportSearchNaem: 'Dallas Love Field, TX - DAL',
                cityName: 'Dallas',
                cityState: 'TX',
                code: 'DAL',
                countryCode: 'US',
                displayName: 'Dallas (Love Field)'
              }
            ];
            const { container } = createComponent({ allAirports: AIRPORT_LIST });
            const searchInput = container.querySelector('input');

            fireEvent.change(searchInput, { target: { value: 'HOU' } });
            fireEvent.focus(searchInput);

            waitFor.untilAssertPass(() => {
              const airportCards = container.querySelector('.flex');

              expect(airportCards).not.toBeNull();
            }, done);
          });
        });
      });

      describe('MEX search term used', () => {
        it('should display all Mexico, MX, and NM airports', (done) => {
          const { container } = createComponent();
          const searchInput = container.querySelector('input');

          fireEvent.change(searchInput, { target: { value: 'MEX' } });
          fireEvent.focus(searchInput);
          waitFor.untilAssertPass(() => {
            expect(container.querySelectorAll('.flex')).toHaveLength(4);
          }, done);
        });
      });

      describe('no airport find', () => {
        it('should display no result', (done) => {
          const { container } = createComponent();
          const searchInput = container.querySelector('input');

          fireEvent.change(searchInput, { target: { value: 'DAL' } });
          waitFor.untilAssertPass(() => {
            const noResultDiv = container.querySelector('.airport-list--results_empty');

            expect(noResultDiv).not.toHaveClass('hide');
          }, done);
        });
      });
    });
  });

  describe('current location', () => {
    beforeEach(() => {
      jest
        .spyOn(LocationServiceActions, 'getPhoneLocation')
        .mockResolvedValue({ coords: { latitude: 10, longitude: 10 } });
      jest
        .spyOn(LocationServiceActions, 'getPhoneLocationForWebView')
        .mockResolvedValue({ coords: { latitude: 10, longitude: 10 } });
      jest
        .spyOn(LocationServiceActions, 'fetchNearestAirportWithCoordinates')
        .mockResolvedValue({ nearestSwaAirport: 'DEN' });
    });
    it('should show current location when device is android', () => {
      deviceInfo.os.name = 'Android';
      const { container } = createComponent({
        showBackButton: false,
        onAirportSelect: () => {},
        disableInternationals: true
      });

      expect(container.querySelector('[data-qa="airport-list-current-location"]')).toBeInTheDocument();
    });

    it('should show current location when device is ios', () => {
      deviceInfo.os.name = 'iOS';
      const { container } = createComponent({
        showBackButton: false,
        onAirportSelect: () => {},
        disableInternationals: true
      });

      expect(container.querySelector('[data-qa="airport-list-current-location"]')).toBeInTheDocument();
    });

    it('should call onAirportSelected with nearest airport', (done) => {
      const { container } = createComponent({
        showBackButton: false
      });
      const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

      waitFor.untilAssertPass(() => {
        expect(onAirportSelectStub).toHaveBeenCalledWith(AIRPORT_LIST[0], true);
      }, done);

      fireEvent.click(currentLocation);
    });

    it('should call onAirportSelected with nearest airport, but handle the error returned by the getPhoneLocationForWebView call', (done) => {
      jest
        .spyOn(LocationServiceActions, 'getPhoneLocation')
        .mockRejectedValue('mockError');

      const { container } = createComponent({
        showBackButton: false
      });
      const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

      fireEvent.click(currentLocation);

      waitFor.untilAssertPass(() => {
        expect(SharedActions.showErrorPopUp).toHaveBeenCalled();
      }, (done));
    });

    describe('user is searching for an airport', () => {
      it('should hide the current location button', (done) => {
        const { container } = createComponent();
        const searchInput = container.querySelector('input');

        fireEvent.change(searchInput, { target: { value: 'C' } });
        fireEvent.focus(searchInput);
        waitFor.untilAssertPass(() => {
          expect(container.querySelector('[data-qa="airport-list-current-location"]')).not.toBeInTheDocument();
        }, done);
      });
    });

    describe('disable international airports', () => {
      it('should show international popup when nearest airport is not in US', (done) => {
        fetchNearestAirportWithCoordinatesFnStub.mockResolvedValue(Q({ nearestSwaAirport: 'CUN' }));

        const { container } = createComponent({
          showBackButton: false,
          disableInternationals: true
        });
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        waitFor.untilAssertPass(() => {
          expect(DialogActions.showDialog).toHaveBeenCalledWith({
            active: true,
            closeLabel: 'SHARED__BUTTON_TEXT__CANCEL',
            message: 'SHARED__AIRPORT_LIST__INTERNATIONAL_NOT_SUPPORTED',
            name: 'airport-list-international-not-supported',
            title: 'SHARED__AIRPORT_LIST__WE_ARE_WORKING_ON_IT',
            verticalLinks: {
              links: [
                {
                  href: 'http://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb',
                  label: 'SHARED__AIRPORT_LIST__VISIT_SOUTHWEST_DOT_COM'
                },
                {
                  href: 'tel:1-800-435-9792',
                  label: 'SHARED__BUTTON_TEXT__PHONE_I_FLY_SWA'
                }
              ]
            }
          });
        }, done);

        fireEvent.click(currentLocation);
      });
    });

    describe("don't show current location flag", () => {
      const dontShowCurrentLocation = true;

      it('should not show the current location entry', () => {
        const { container } = createComponent({
          showBackButton: false,
          disableInternationals: true,
          dontShowCurrentLocation
        });

        expect(container.querySelector('[data-qa="airport-list-current-location"]')).not.toBeInTheDocument();
      });
    });

    describe('device is not iOS or android', () => {
      beforeEach(() => {
        deviceInfo.os.name = 'Windows';
      });

      it('should not show the current location entry', () => {
        const { container } = createComponent({
          showBackButton: false,
          onAirportSelect: () => {},
          disableInternationals: true
        });

        expect(container.querySelector('[data-qa="airport-list-current-location"]')).not.toBeInTheDocument();
      });
    });

    describe('location fails', () => {
      beforeEach(() => {});
      it('should not override the message when the code is 400307624', () => {
        const deferred = Q.defer();

        fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(deferred.promise);

        deviceInfo.os.name = 'iOS';
        const { container } = createComponent();
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        fireEvent.click(currentLocation);

        deferred.reject({
          responseJSON: {
            code: 400307624,
            message: 'Hmm, we can’t seem to locate a nearby airport that Southwest serves.'
          }
        });
        expect(getPhoneLocationFnStub).toHaveBeenCalled();
      });

      it('should not override the message when the code is 503599340', () => {
        const deferred = Q.defer();

        fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(deferred.promise);

        const { container } = createComponent();
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        fireEvent.click(currentLocation);

        deferred.reject({
          responseJSON: {
            code: 503599340,
            message: 'Sorry! We had a problem finding your location. Please try again.'
          }
        });

        expect(getPhoneLocationFnStub).toHaveBeenCalled();
      });

      it('should show popup with no connection message when there is no connection', () => {
        fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(Q.reject({}));

        const { container } = createComponent();
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        fireEvent.click(currentLocation);

        expect(getPhoneLocationFnStub).toHaveBeenCalled();
      });

      it('should show popup with no connection message when retrieve location failed in flight mode', () => {
        const { container } = createComponent();
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        fireEvent.click(currentLocation);

        expect(getPhoneLocationFnStub).toHaveBeenCalled();
      });
    });

    describe('when inside a web view', () => {
      it('should show web view page header', () => {
        const { container } = createComponent({
          isWebView: true
        });
        const actionBar = container.querySelector('div.action-bar');

        expect(actionBar).toHaveClass('action-bar-webview');
      });

      it('should call onAirportSelected with nearest airport', (done) => {
        const { container } = createComponent({
          isWebView: true
        });
        const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

        waitFor.untilAssertPass(() => {
          expect(onAirportSelectStub).toHaveBeenCalledWith(AIRPORT_LIST[0], true);
        }, done);

        fireEvent.click(currentLocation);
      });

      describe('location fails', () => {
        it('should not override the message when the code is 400307624', () => {
          const { container } = createComponent({
            isWebView: true
          });
          const deferred = Q.defer();

          fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(deferred.promise);

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          deferred.reject({
            responseJSON: {
              code: 400307624,
              message: 'Hmm, we can’t seem to locate a nearby airport that Southwest serves.'
            }
          });
          expect(getPhoneLocationForWebViewFnStub).toHaveBeenCalled();
        });

        it('should not override the message when the code is 503599340', () => {
          const { container } = createComponent({
            isWebView: true
          });
          const deferred = Q.defer();

          fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(deferred.promise);

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          deferred.reject({
            responseJSON: {
              code: 503599340,
              message: 'Sorry! We had a problem finding your location. Please try again.'
            }
          });

          expect(getPhoneLocationForWebViewFnStub).toHaveBeenCalled();
        });

        it('should show popup with no connection message when there is no connection', () => {
          const { container } = createComponent({
            isWebView: true
          });

          fetchNearestAirportWithCoordinatesFnStub.mockReturnValueOnce(Q.reject({}));

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          expect(getPhoneLocationForWebViewFnStub).toHaveBeenCalled();
        });

        it('should show popup with no connection message when retrieve location failed in flight mode and isWebView true', () => {
          const { container } = createComponent({
            isWebView: true
          });

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          expect(getPhoneLocationForWebViewFnStub).toHaveBeenCalled();
        });

        it('should show popup with no connection message when retrieve location failed in flight mode and isWebView true and the searchString state value is set', () => {
          const { container } = createComponent({
            isWebView: true,
            searchString: 'DEN'
          });

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          expect(getPhoneLocationForWebViewFnStub).toHaveBeenCalled();
        });

        it('should show popup with no connection message when retrieve location failed in flight mode and isWebView true and the getPhoneLocationForWebView call fails', (done) => {
          jest
            .spyOn(LocationServiceActions, 'getPhoneLocationForWebView')
            .mockRejectedValue('mockError');
          
          const { container } = createComponent({
            isWebView: true
          });

          const currentLocation = container.querySelector('[data-qa="airport-list-current-location"]');

          fireEvent.click(currentLocation);

          waitFor.untilAssertPass(() => {
            expect(SharedActions.showErrorPopUp).toHaveBeenCalled();
          }, (done));
        });
      });
    });
  });

  describe('Alphabet Selector', () => {
    it('should be visible by default', () => {
      const { container } = createComponent({}, { isTyping: false });

      expect(container.querySelector('.alphabet-selector')).not.toBeEmpty();
    });

    it('should not be visible when the user focuses on the search input', () => {
      const { container } = createComponent({}, { isTyping: false });

      fireEvent.focus(container.querySelector('input'));
      expect(container.querySelector('.alphabet-selector')).toBeEmpty();
    });

    it('should be visible when the user blurs the search input', () => {
      const { container } = createComponent({}, { isTyping: false });

      fireEvent.blur(container.querySelector('input'));
      expect(container.querySelector('.alphabet-selector')).not.toBeEmpty();
    });
  });

  describe('multiselectgroups', () => {
    it('should disable multiselectgroups for airbooking', () => {
      const { container } = createComponent();

      expect(container.querySelector('.checkbox-button')).not.toBeInTheDocument();
    });

    it('should enable multiselectgroups for airbooking', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });

      expect(container.querySelector('.checkbox-button')).toBeInTheDocument();
    });

    it('should clear airport codes from multiselectgroups state upon selecting airport', () => {
      const { getByText } = createComponent({
        isMultiSelectGroupEnabled: true
      });

      fireEvent.click(getByText('Akron-Canton, OH - CAK'));

      expect(FormDataActions.clearFormDataById).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_DESTINATION);
      expect(AirportsActions.clearMultiSelectGroupFormId).toHaveBeenCalledWith('destination');
    });

    it('should clear multiselectgroups form data upon unmounting component', () => {
      createComponent({
        isMultiSelectGroupEnabled: true
      });

      expect(FormDataActions.clearFormDataById).toHaveBeenCalledWith(MULTI_SELECT_GROUP_FORM_DESTINATION);
    });

    it('should transition from cancel to done button upon selecting multiselectgroups', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelector('.checkbox-button');

      fireEvent.click(airportGroup);

      expect(container.querySelector('.action-bar-buttons--item').textContent).toContain('Done');
    });

    it('should call updateMultiSelectGroupFn with multiselectgroup codes on done button click', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelector('.checkbox-button');

      fireEvent.click(airportGroup);
      fireEvent.click(container.querySelector('.action-bar-buttons--item').querySelector('button'));

      expect(AirportsActions.updateMultiSelectGroup).toHaveBeenCalledWith(['BOS', 'BDL', 'MHT', 'PVD'], 'destination');
    });

    it('should call updateMultiSelectGroupFn with single airport code on done button click', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelectorAll('.checkbox-button')[1];

      fireEvent.click(airportGroup);
      fireEvent.click(container.querySelector('.action-bar-buttons--item').querySelector('button'));

      expect(AirportsActions.updateMultiSelectGroup).toHaveBeenCalledWith(['BOS'], 'destination');
    });

    it('should call updateFormDataValueFn with form id and multiselectgroup codes on done button click', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from'
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelector('.checkbox-button');

      fireEvent.click(airportGroup);
      fireEvent.click(container.querySelector('.action-bar-buttons--item').querySelector('button'));

      expect(FormDataActions.updateFormDataValue).toHaveBeenCalledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
        origin: 'BOS,BDL,MHT,PVD'
      });
    });

    it('should call updateFormDataValueFn with form id and single airport code on done button click', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from'
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelectorAll('.checkbox-button')[1];

      fireEvent.click(airportGroup);
      fireEvent.click(container.querySelector('.action-bar-buttons--item').querySelector('button'));

      expect(FormDataActions.updateFormDataValue).toHaveBeenCalledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
        origin: 'BOS'
      });
    });

    it('should pass sortByGroups as true upon passing search string ', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        searchString: 'Area'
      });

      expect(container).toMatchSnapshot();
    });

    it('should make multiselectgroups group selected upon airport selector page load', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        multiSelectGroup: {
          destination: ['BOS', 'BDL', 'MHT', 'PVD']
        }
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      expect(container.querySelector('.checkbox-button')).toHaveClass('checkbox-button--row_checked');
    });

    it('should not make multiselectgroups group selected upon airport selector page load', () => {
      const { container } = createComponent({
        airportGroupData: ['BDL', 'MHT', 'PVD'],
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        searchString: 'Area'
      });

      expect(container.querySelector('.checkbox-button')).not.toHaveClass('checkbox-button--row_checked');
    });

    it('should call updateMultiSelectGroupFn upon selecting recent search having multiselectgroups', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        dontShowCurrentLocation: true,
        handleMultiSelectRecentSearch: jest.fn(),
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        recentlySearched: [{ ...getMultiSelectGroup()['Recently Searched'][0], airportGroupSelected: ['BOS', 'BDL'] }]
      });

      fireEvent.click(container.querySelector('.airport-group div'));

      expect(AirportsActions.updateMultiSelectGroup).toHaveBeenCalledWith(['BOS', 'BDL'], 'origin');
    });

    it('should not call updateRecentAirportSearch upon selecting recent search not having multiselectgroups', () => {
      createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        dontShowCurrentLocation: true,
        handleMultiSelectRecentSearch: jest.fn().mockReturnValue({
          ...getMultiSelectGroup()['Recently Searched'][0],
          airportGroupSelected: undefined
        }),
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        recentlySearched: getMultiSelectGroup()['Recently Searched']
      });

      expect(AirportsActions.updateRecentAirportSearch).not.toHaveBeenCalled();
    });

    it('should not call updateRecentAirportSearch upon selecting recent search having multiselectgroups', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        dontShowCurrentLocation: true,
        handleMultiSelectRecentSearch: jest.fn(),
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        recentlySearched: getMultiSelectGroup()['Recently Searched']
      });

      fireEvent.click(container.querySelector('.airport-group').querySelector('div'));

      expect(AirportsActions.updateRecentAirportSearch).not.toHaveBeenCalled();
    });

    it('should call updateRecentAirportSearch with multiselectgroup codes on done button click', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = container.querySelector('input');

      fireEvent.change(searchInput, { target: { value: 'Area' } });
      fireEvent.focus(searchInput);

      const airportGroup = container.querySelector('.checkbox-button');

      fireEvent.click(airportGroup);
      fireEvent.click(container.querySelector('.action-bar-buttons--item button'));

      expect(AirportsActions.updateRecentAirportSearch).toHaveBeenCalledWith(
        getMultiSelectGroup()['Recently Searched'][0]
      );
    });
  });

  const createComponent = (props = {}, passedState = {}) => {
    const defaultProps = {
      allAirports: AIRPORT_LIST,
      children: <div>childElement</div>,
      deleteFromRecentAirportSearchFn: AirportsActions.deleteFromRecentAirportSearch,
      disableInternationals: false,
      dontShowCurrentLocation: false,
      hideSearchBarHeader: false,
      isReaccomCoTerminalEligible: false,
      modalId: 'airportListModalId',
      onAirportSelect: onAirportSelectStub,
      onCancel: onCancelStub,
      recentlySearched: [],
      showBackButton: false,
      title: 'Airport List'
    };
    const mergedProps = { ...defaultProps, ...props };

    const state = {
      app: {
        toggles: mergedProps.toggles,
        webView: {
          isWebView: mergedProps.isWebView
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };

    const mergedState = { ...state, ...passedState };

    return integrationRender({ withDialog: true })(mergedState, AirportList, mergedProps);
  };

  const RECENT_AIRPORT_LIST = [
    {
      airportName: 'Denver',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing',
      cityName: 'Denver',
      cityState: 'CO',
      code: 'DEN',
      countryCode: 'US',
      displayName: 'Denver',
      latitude: '39.8617',
      longitude: '-104.673',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Denver'
    },
    {
      airportName: 'Akron-Canton',
      airportSearchName: 'Ohio',
      cityName: 'Akron',
      cityState: 'OH',
      code: 'CAK',
      countryCode: 'US',
      displayName: 'Akron-Canton',
      latitude: '40.9161',
      longitude: '-81.4422',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Akron'
    },
    {
      airportName: 'Albany',
      airportSearchName: 'New York',
      cityName: 'Albany',
      cityState: 'NY',
      code: 'ALB',
      countryCode: 'US',
      displayName: 'Albany',
      latitude: '42.7483',
      longitude: '-73.8017',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albany'
    }
  ];

  const AIRPORT_LIST = [
    {
      airportName: 'Denver',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing',
      cityName: 'Denver',
      cityState: 'CO',
      code: 'DEN',
      countryCode: 'US',
      displayName: 'Denver',
      latitude: '39.8617',
      longitude: '-104.673',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Denver'
    },
    {
      airportName: 'Akron-Canton',
      airportSearchName: 'Ohio',
      cityName: 'Akron',
      cityState: 'OH',
      code: 'CAK',
      countryCode: 'US',
      displayName: 'Akron-Canton',
      latitude: '40.9161',
      longitude: '-81.4422',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Akron'
    },
    {
      airportName: 'Albany',
      airportSearchName: 'New York',
      cityName: 'Albany',
      cityState: 'NY',
      code: 'ALB',
      countryCode: 'US',
      displayName: 'Albany',
      latitude: '42.7483',
      longitude: '-73.8017',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albany'
    },
    {
      airportName: 'Aruba',
      airportSearchName: '',
      cityName: 'Aruba',
      cityState: 'Aruba',
      code: 'AUA',
      countryCode: 'AW',
      displayName: 'Aruba',
      latitude: '12.5014',
      longitude: '-70.0152',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Aruba'
    },
    {
      airportName: 'Albuquerque',
      airportSearchName: 'Albuquerque',
      cityName: 'Albuquerque',
      cityState: 'NM',
      code: 'ABQ',
      countryCode: 'US',
      displayName: 'Albuquerque',
      latitude: '123.456',
      longitude: '-123.456',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albuquerque'
    },
    {
      airportName: 'Cabo San Lucas/Los Cabos',
      airportSearchName: 'Cabo San Lucas/Los Cabos',
      cityName: 'Cabo San Lucas/Los Cabos',
      cityState: 'MX',
      code: 'SJD',
      countryCode: 'MX',
      displayName: 'Cabo San Lucas/Los Cabos',
      latitude: '123.456',
      longitude: '-123.456',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Cabo San Lucas/Los Cabos'
    },
    {
      airportName: 'Cancun',
      airportSearchName: 'Cancun',
      cityName: 'Cancun',
      cityState: 'Mexico',
      code: 'CUN',
      countryCode: 'MX',
      displayName: 'Cancun',
      latitude: '123.456',
      longitude: '-123.456',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Cancun'
    },
    {
      airportName: 'Mexico City',
      airportSearchName: 'Mexico City',
      cityName: 'Mexico City',
      cityState: 'Mexico',
      code: 'MEX',
      countryCode: 'MX',
      displayName: 'Mexico City',
      latitude: '123.456',
      longitude: '-123.456',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Mexico City'
    }
  ];
});
