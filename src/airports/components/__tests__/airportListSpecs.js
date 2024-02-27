import _ from 'lodash';
import proxyquire from 'proxyquire';
import Q from 'q';
import React from 'react';
import sinonModule from 'sinon';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM, MULTI_SELECT_GROUP_FORM_DESTINATION } from 'src/shared/constants/formIds';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';
import { blur, click, enterText, focus } from 'test/unit/helpers/enzymeFormTestUtils';
import { integrationMount } from 'test/unit/helpers/testUtils';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sinonModule.sandbox.create();

describe('Airport List Component', () => {
  let airportList;
  let clearFormDataByIdStub;
  let clearMultiSelectGroupFormIdStub;
  let deleteFromRecentAirportSearchStub;
  let fetchNearestAirportWithCoordinatesFnStub;
  let getPhoneLocationFnStub;
  let getPhoneLocationForWebViewFnStub;
  let onAirportSelectStub;
  let onCancelStub;
  let showDialogFnStub;
  let showErrorPopUpFnStub;
  let updateFormDataValueStub;
  let updateMultiSelectGroupStub;
  let updateRecentAirportSearchStub;

  beforeEach(() => {
    clearFormDataByIdStub = sinon.stub().returns(_.noop);
    clearMultiSelectGroupFormIdStub = sinon.stub().returns(_.noop);
    deleteFromRecentAirportSearchStub = sinon.stub().returns();
    fetchNearestAirportWithCoordinatesFnStub = sinon.stub().returns(Q({ nearestSwaAirport: 'DEN' }));
    getPhoneLocationFnStub = sinon.stub().returns(Q({ coords: { latitude: 10, longitude: 10 } }));
    getPhoneLocationForWebViewFnStub = sinon.stub().returns(Q({ coords: { latitude: 10, longitude: 10 } }));
    onAirportSelectStub = sinon.stub();
    onCancelStub = sinon.stub();
    showDialogFnStub = sinon.stub();
    showErrorPopUpFnStub = sinon.stub();
    updateFormDataValueStub = sinon.stub().callsFake((formId, fieldValues) => ({
      formId,
      fieldValues,
      type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
      url: '/pathname?search'
    }));
    updateMultiSelectGroupStub = sinon.stub().returns(_.noop);
    updateRecentAirportSearchStub = sinon.stub().returns(_.noop);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('normal state', () => {
    beforeEach(() => {
      airportList = createComponent();
    });

    it('should not display shadow layer', () => {
      expect(airportList).to.not.contain.className('options-list--with-shadow');
    });

    it('should show group header', () => {
      const resultDiv = airportList.find('.airport-list--results');

      expect(resultDiv).to.not.contain.className('no-header');
    });

    it('should show page header', () => {
      const pageHeaderWithButtons = airportList.find('PageHeaderWithButtons');

      expect(pageHeaderWithButtons).to.have.prop('hidden', false);
    });

    it('should show page header', () => {
      const showBackButton = true;

      airportList = createComponent({
        airports: undefined,
        showBackButton,
        onAirportSelect: () => {}
      });

      expect(airportList.find('.icon_keyboard-arrow-left')).to.be.present();
    });

    it('the container should scrollable', () => {
      const container = airportList.find('.airport-list--results');

      expect(container).to.not.contain.className('overflow-hidden');
    });
  });

  context('recent searches', () => {
    let groupContainers;
    let firstGroupContainer;

    beforeEach(() => {
      updateRecentAirportSearchStub.returns({ recentlySearched: AIRPORT_LIST.slice(0, 2) });
      airportList = createComponent({ dontShowCurrentLocation: true, recentlySearched: RECENT_AIRPORT_LIST });
      groupContainers = airportList.find('.airport-group-container');
      firstGroupContainer = groupContainers.at(0);
    });

    it('should display recent searches header when recent searches are available', () => {
      expect(firstGroupContainer.find('.airport-group-header')).to.contain.text('Recent Searches');
    });

    it('should display 3 recent airport searches', () => {
      expect(firstGroupContainer.find('AirportCard')).to.have.lengthOf(3);
    });

    it('should display a remove icon next to each recent search', () => {
      expect(firstGroupContainer.find('AirportCard').find('i')).to.exist;
    });
  });

  context('searching state', () => {
    beforeEach(() => {
      airportList = createComponent();
    });

    context('search bar get input focus', () => {
      beforeEach(() => {
        const searchInput = airportList.find('input');

        focus(searchInput);
      });

      it('should display shadow layer', () => {
        const shadowDiv = airportList.find('.airport-list--results_shadow');

        expect(shadowDiv).to.not.contain.className('hide');
      });

      it('should disable scroll behavior', () => {
        const container = airportList.find('.airport-list');

        expect(container).to.contain.className('options-list--with-shadow');
      });

      it('should show group header', () => {
        const resultDiv = airportList.find('.airport-list--results');

        expect(resultDiv).to.not.contain.className('no-header');
      });

      it('should not show airport groups when toggle is false', () => {
        const airportListGroups = airportList.find('AirportListGroups');

        expect(airportListGroups).to.have.prop('sortByGroups', false);
      });

      it('should hide page header', () => {
        const pageHeaderWithButtons = airportList.find('PageHeaderWithButtons');

        expect(pageHeaderWithButtons).to.have.prop('hidden', true);
      });

      it('should hide shadow and show page header after user click cancel button', () => {
        click(airportList.find('.airport-search-bar--cancel'));

        const pageHeaderWithButtons = airportList.find('PageHeaderWithButtons');

        expect(airportList).to.not.contain.className('options-list--with-shadow');
        expect(pageHeaderWithButtons).to.have.prop('hidden', false);
      });

      context('filtering', () => {
        beforeEach(() => {
          airportList = createComponent();
        });

        it('should not filter by groups if the search string is empty', () => {
          const airportListGroups = airportList.find('AirportListGroups');

          expect(airportListGroups).to.have.prop('sortByGroups', false);
        });

        it('should show airports even when some are undefined', () => {
          const instance = createComponent({
            airports: [
              undefined,
              {
                code: 'CAK',
                airportName: 'Akron-Canton',
                displayName: 'Akron-Canton',
                airportGroupName: 'TestGroup',
                airportGroupId: 'TEST',
                airportGroups: ['CAK', 'ALB'],
                cityName: 'Akron',
                shortDisplayName: 'Akron',
                cityState: 'OH',
                marketingCarriers: ['WN'],
                countryCode: 'US',
                latitude: '40.9161',
                longitude: '-81.4422',
                airportSearchName: 'Ohio'
              }
            ]
          });
          const airportListGroups = instance.find('AirportListGroups');

          expect(airportListGroups).to.exist;
          sinon.restore();
        });
      });

      context('blur and focus search input again', () => {
        it('should hide and show shadow layer', () => {
          const wrapper = airportList.find('.airport-list');
          const searchInput = airportList.find('input');

          expect(wrapper).to.contain.className('options-list--with-shadow');
          blur(searchInput);
          expect(wrapper).to.not.contain.className('options-list--with-shadow');
          focus(searchInput);
          expect(wrapper).to.contain.className('options-list--with-shadow');
        });

        it('should never show page header', () => {
          it('should hide and show page header', () => {
            const PageHeaderWithButtons = airportList.find('PageHeaderWithButtons');
            const searchInput = airportList.find('input');

            expect(PageHeaderWithButtons).to.have.prop('hidden', true);
            blur(searchInput);
            expect(PageHeaderWithButtons).to.have.prop('hidden', false);
            focus(searchInput);
            expect(PageHeaderWithButtons).to.have.prop('hidden', true);
          });
        });
      });
    });

    context('after typing something', () => {
      context('find airport', () => {
        beforeEach(() => {
          const searchInput = airportList.find('input');

          enterText(searchInput, 'D');
          focus(searchInput);
        });

        it('should hide shadow layer', () => {
          expect(airportList).to.contain.not.className('.options-list--with-shadow');
        });

        it('should display group header', (done) => {
          waitFor.untilAssertPass(() => {
            const resultDiv = airportList.find('.airport-list--results');

            expect(resultDiv).to.not.contain.className('no-header');
          }, done);
        });

        it('should filter the airport', (done) => {
          waitFor.untilAssertPass(() => {
            const airportCards = airportList.find('AirportCard');

            expect(airportCards).to.have.lengthOf(2);
          }, done);
        });

        it('should clean search field after user clicks cancel button', () => {
          click(airportList.find('.airport-search-bar--cancel'));

          const resultDiv = airportList.find('.airport-list--results');

          expect(airportList.find('input')).to.have.text('');
          expect(resultDiv).to.not.contain.className('no-header');
        });

        context('blur and focus search input again', () => {
          it('should always hide shadow layer', () => {
            const searchInput = airportList.find('input');

            expect(airportList).to.not.contain.className('options-list--with-shadow');
            blur(searchInput);
            expect(airportList).to.not.contain.className('options-list--with-shadow');
            focus(searchInput);
            expect(airportList).to.not.contain.className('options-list--with-shadow');
          });

          it('should never show page header', () => {
            it('should hide page header', () => {
              const PageHeaderWithButtons = airportList.find('PageHeaderWithButtons');
              const searchInput = airportList.find('input');

              expect(PageHeaderWithButtons).to.have.prop('hidden', true);
              blur(searchInput);
              expect(PageHeaderWithButtons).to.have.prop('hidden', true);
              focus(searchInput);
              expect(PageHeaderWithButtons).to.have.prop('hidden', true);
            });
          });
        });

        context('invalid airport group', () => {
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
            const airportList = createComponent({ allAirports: AIRPORT_LIST });
            const searchInput = airportList.find('input');

            enterText(searchInput, 'HOU');
            focus(searchInput);

            waitFor.untilAssertPass(() => {
              const airportCards = airportList.find('AirportCard');

              expect(airportCards).to.have.lengthOf(1);
            }, done);
          });
        });
      });

      context('MEX search term used', () => {
        let airportList;

        beforeEach(() => {
          airportList = createComponent();
          const searchInput = airportList.find('input');

          enterText(searchInput, 'MEX');
          focus(searchInput);
        });

        it('should display all Mexico, MX, and NM airports', (done) => {
          waitFor.untilAssertPass(() => {
            expect(airportList.find('AirportCard')).to.have.lengthOf(4);
          }, done);
        });
      });

      context('no airport find', () => {
        beforeEach(() => {
          const searchInput = airportList.find('input');

          enterText(searchInput, 'DAL');
        });

        it('should display no result', (done) => {
          waitFor.untilAssertPass(() => {
            const noResultDiv = airportList.find('.airport-list--results_empty');

            expect(noResultDiv).to.not.contain.className('hide');
          }, done);
        });
      });
    });
  });

  context('current location', () => {
    beforeEach(() => {});

    it('should show current location when device is android', () => {
      const airportList = createComponent(
        {
          showBackButton: false,
          onAirportSelect: _.noop(),
          disableInternationals: true
        },
        'Android'
      );

      expect(airportList.find('[data-qa="airport-list-current-location"]')).to.be.present();
    });

    it('should show current location when device is ios', () => {
      const airportList = createComponent(
        {
          showBackButton: false,
          onAirportSelect: _.noop(),
          disableInternationals: true
        },
        'iOS'
      );

      expect(airportList.find('[data-qa="airport-list-current-location"]')).to.be.present();
    });

    it('should call onAirportSelected with nearest airport', (done) => {
      const airportList = createComponent({
        showBackButton: false
      });
      const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

      waitFor.untilAssertPass(() => {
        expect(onAirportSelectStub).to.have.been.calledWith(AIRPORT_LIST[0], true);
      }, done);

      click(currentLocation);
    });

    it('should call showErrorPopUp when current location discovery failed', (done) => {
      getPhoneLocationFnStub = sinon.stub().returns(Promise.reject());

      const airportList = createComponent({});
      const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

      click(currentLocation);

      waitFor.untilAssertPass(() => {
        expect(showErrorPopUpFnStub).to.have.been.called;
      }, done);
    });

    context('user is searching for an airport', () => {
      let airportList;

      beforeEach(() => {
        airportList = createComponent();
        const searchInput = airportList.find('input');

        enterText(searchInput, 'C');
        focus(searchInput);
      });

      it('should hide the current location button', (done) => {
        waitFor.untilAssertPass(() => {
          expect(airportList.find('[data-qa="airport-list-current-location"]')).to.not.be.present();
        }, done);
      });
    });

    context('disable international airports', () => {
      it('should show international popup when nearest airport is not in US', (done) => {
        fetchNearestAirportWithCoordinatesFnStub.returns(Q({ nearestSwaAirport: 'CUN' }));

        const airportList = createComponent({
          showBackButton: false,
          disableInternationals: true
        });
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.have.been.calledWith({
            active: true,
            closeLabel: 'Cancel',
            message:
              "Stay tuned! We're working hard to bring international booking to our app and mobile website. Please choose an option below to continue.",
            name: 'airport-list-international-not-supported',
            title: "We're working on it",
            verticalLinks: {
              links: [
                {
                  href: 'http://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb',
                  label: 'Visit Southwest.com'
                },
                {
                  href: 'tel:1-800-435-9792',
                  label: '1-800-I-FLY-SWA'
                }
              ]
            }
          });
        }, done);

        click(currentLocation);
      });
    });

    context("don't show current location flag", () => {
      const dontShowCurrentLocation = true;

      it('should not show the current location entry', () => {
        const airportList = createComponent({
          showBackButton: false,
          disableInternationals: true,
          dontShowCurrentLocation
        });

        expect(airportList.find('[data-qa="airport-list-current-location"]')).to.not.be.present();
      });
    });

    context('device is not iOS or android', () => {
      let osName;

      beforeEach(() => {
        osName = 'Windows';
      });

      it('should not show the current location entry', () => {
        const airportList = createComponent(
          {
            showBackButton: false,
            onAirportSelect: _.noop(),
            disableInternationals: true
          },
          osName
        );

        expect(airportList.find('[data-qa="airport-list-current-location"]')).to.not.be.present();
      });
    });

    context('location fails', () => {
      it('should not override the message when the code is 400307624', () => {
        const deferred = Q.defer();

        fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(deferred.promise);

        const airportList = createComponent();
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        click(currentLocation);

        deferred.reject({
          responseJSON: {
            code: 400307624,
            message: 'Hmm, we can’t seem to locate a nearby airport that Southwest serves.'
          }
        });
        expect(getPhoneLocationFnStub).to.have.been.called;
      });

      it('should not override the message when the code is 503599340', () => {
        const deferred = Q.defer();

        fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(deferred.promise);

        const airportList = createComponent();
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        click(currentLocation);

        deferred.reject({
          responseJSON: {
            code: 503599340,
            message: 'Sorry! We had a problem finding your location. Please try again.'
          }
        });

        expect(getPhoneLocationFnStub).to.have.been.called;
      });

      it('should show popup with no connection message when there is no connection', () => {
        fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(Q.reject({}));

        const airportList = createComponent();
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        click(currentLocation);

        expect(getPhoneLocationFnStub).to.have.been.called;
      });

      it('should show popup with no connection message when retrieve location failed in flight mode', () => {
        const airportList = createComponent();
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        click(currentLocation);

        expect(getPhoneLocationFnStub).to.have.been.called;
      });
    });

    context('when inside a web view', () => {
      beforeEach(() => {
        airportList = createComponent({
          isWebView: true
        });
      });

      it('should show web view page header', () => {
        const actionBar = airportList.find('div.action-bar');

        expect(actionBar).to.contain.className('action-bar-webview');
      });

      it('should call onAirportSelected with nearest airport', (done) => {
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        waitFor.untilAssertPass(() => {
          expect(onAirportSelectStub).to.have.been.calledWith(AIRPORT_LIST[0], true);
        }, done);

        click(currentLocation);
      });

      it('should call showErrorPopUp when current location discovery failed', (done) => {
        getPhoneLocationForWebViewFnStub = sinon.stub().returns(Promise.reject());

        const airportList = createComponent({
          isWebView: true
        });
        const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

        click(currentLocation);

        waitFor.untilAssertPass(() => {
          expect(showErrorPopUpFnStub).to.have.been.called;
        }, done);
      });

      context('location fails', () => {
        it('should not override the message when the code is 400307624', () => {
          const deferred = Q.defer();

          fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(deferred.promise);

          const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

          click(currentLocation);

          deferred.reject({
            responseJSON: {
              code: 400307624,
              message: 'Hmm, we can’t seem to locate a nearby airport that Southwest serves.'
            }
          });
          expect(getPhoneLocationForWebViewFnStub).to.have.been.called;
        });

        it('should not override the message when the code is 503599340', () => {
          const deferred = Q.defer();

          fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(deferred.promise);

          const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

          click(currentLocation);

          deferred.reject({
            responseJSON: {
              code: 503599340,
              message: 'Sorry! We had a problem finding your location. Please try again.'
            }
          });

          expect(getPhoneLocationForWebViewFnStub).to.have.been.called;
        });

        it('should show popup with no connection message when there is no connection', () => {
          fetchNearestAirportWithCoordinatesFnStub.withArgs(10, 10).returns(Q.reject({}));
          airportList = createComponent({ isWebView: true });

          const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

          click(currentLocation);

          expect(getPhoneLocationForWebViewFnStub).to.have.been.called;
        });

        it('should show popup with no connection message when retrieve location failed in flight mode and isWebView true', () => {
          airportList = createComponent({ isWebView: true });

          const currentLocation = airportList.find('[data-qa="airport-list-current-location"]');

          click(currentLocation);

          expect(getPhoneLocationForWebViewFnStub).to.have.been.called;
        });
      });
    });
  });

  context('Alphabet Selector', () => {
    it('should be visible by default', () => {
      const component = createComponent();

      expect(component.find('AirportListGroups')).to.have.prop('showAlphabetSelector', true);
    });

    it('should not be visible when the user focuses on the search input', () => {
      const component = createComponent();

      focus(component.find('input'));
      component.update();
      expect(component.find('AirportListGroups')).to.have.prop('showAlphabetSelector', false);
    });

    it('should be visible when the user blurs the search input', () => {
      const component = createComponent();

      blur(component.find('input'));
      expect(component.find('AirportListGroups')).to.have.prop('showAlphabetSelector', true);
    });
  });

  context('multiselectgroups', () => {
    it('should disable multiselectgroups for airbooking', () => {
      const component = createComponent();

      expect(component.find('AirportListGroups')).to.have.prop('isMultiSelectGroupEnabled', false);
    });

    it('should disable multiselectgroups for airchange', () => {
      const component = createComponent();

      expect(component.find('AirportListGroups')).to.have.prop('isMultiSelectGroupEnabled', false);
    });

    it('should enable multiselectgroups for airbooking', () => {
      const component = createComponent({
        isMultiSelectGroupEnabled: true
      });

      expect(component.find('AirportListGroups')).to.have.prop('isMultiSelectGroupEnabled', true);
    });

    it('should clear airport codes from multiselectgroups state upon selecting airport', () => {
      const component = createComponent({
        isMultiSelectGroupEnabled: true
      });
      const airport = component.find('AirportCard').first().find('div');

      airport.props().onClick();

      expect(clearFormDataByIdStub).to.have.been.calledWith(MULTI_SELECT_GROUP_FORM_DESTINATION);
      expect(clearMultiSelectGroupFormIdStub).to.have.been.calledWith("destination");
    });

    it('should clear multiselectgroups form data upon unmounting component', () => {
      const component = createComponent({
        isMultiSelectGroupEnabled: true
      });
      
      component.unmount();

      expect(clearFormDataByIdStub).to.have.been.calledWith(MULTI_SELECT_GROUP_FORM_DESTINATION);
    });

    it('should transition from cancel to done button upon selecting multiselectgroups', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(0);

      airportGroup.props().onChange(true);

      expect(component.find('.action-bar-buttons--item')).to.have.text('Done');
    });

    it('should call updateMultiSelectGroupFn with multiselectgroup codes on done button click', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(0);

      airportGroup.props().onChange(true);
      click(component.find('.action-bar-buttons--item').first().find('button')); 

      expect(updateMultiSelectGroupStub).to.have.been.calledWith(["BOS", "BDL", "MHT", "PVD"]);
    });

    it('should call updateMultiSelectGroupFn with single airport code on done button click', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(1);

      airportGroup.props().onChange(true);
      click(component.find('.action-bar-buttons--item').first().find('button')); 

      expect(updateMultiSelectGroupStub).to.have.been.calledWith(["BOS"]);
    });

    it('should call updateFormDataValueFn with form id and multiselectgroup codes on done button click', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from'
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(0);

      airportGroup.props().onChange(true);
      click(component.find('.action-bar-buttons--item').first().find('button')); 

      expect(updateFormDataValueStub).to.have.been.calledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
        origin: "BOS,BDL,MHT,PVD"
      });
    });

    it('should call updateFormDataValueFn with form id and single airport code on done button click', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from'
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(1);

      airportGroup.props().onChange(true);
      click(component.find('.action-bar-buttons--item').first().find('button')); 

      expect(updateFormDataValueStub).to.have.been.calledWith(AIR_BOOKING_SHOPPING_SEARCH_FORM, {
        origin: "BOS"
      });
    });

    it('should pass sortByGroups as true upon passing search string ', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        searchString: 'Area'
      });
      const airportListGroups = component.find('AirportListGroups');

      expect(airportListGroups).to.have.prop('sortByGroups').equal(true);
    });

    it('should make multiselectgroups group selected upon airport selector page load', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        multiSelectGroup: {
          destination: ['BOS', 'BDL', 'MHT', 'PVD']
        }
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      expect(component.find('FormCheckboxField').at(0).find('FormCheckboxField')).to.have.prop('value', true);
    });

    it('should not make multiselectgroups group selected upon airport selector page load', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        airportGroupData: ['BDL', 'MHT', 'PVD'],
        searchString: 'Area'
      });

      expect(component.find('FormCheckboxField').at(0).find('FormCheckboxField')).to.have.prop('value', false);
    });

    it('should call updateMultiSelectGroupFn upon selecting recent search having multiselectgroups', () => {
      const component = createComponent({
        dontShowCurrentLocation: true,
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        recentlySearched: [{ ...getMultiSelectGroup()['Recently Searched'][0], airportGroupSelected: ['BOS', 'BDL'] }],
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        handleMultiSelectRecentSearch: sinon.stub()
      });

      click(component.find('.airport-group').at(0).find('div'));

      expect(updateMultiSelectGroupStub).to.have.been.calledWith(["BOS", "BDL"]);
    });

    it('should not call updateRecentAirportSearch upon selecting recent search not having multiselectgroups', () => {
      const component = createComponent({
        dontShowCurrentLocation: true,
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        recentlySearched: getMultiSelectGroup()['Recently Searched'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        handleMultiSelectRecentSearch: sinon.stub()
      });

      const airportCard = component.find('AirportCard').at(0);

      airportCard.props().handleMultiSelectRecentSearch({ ...getMultiSelectGroup()['Recently Searched'][0], airportGroupSelected: undefined });

      expect(updateRecentAirportSearchStub).not.to.have.been.called;
    });

    it('should not call updateRecentAirportSearch upon selecting recent search having multiselectgroups', () => {
      const component = createComponent({
        dontShowCurrentLocation: true,
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        recentlySearched: getMultiSelectGroup()['Recently Searched'],
        isMultiSelectGroupEnabled: true,
        modalId: 'from',
        handleMultiSelectRecentSearch: sinon.stub()
      });

      click(component.find('.airport-group').at(0).find('div'));

      expect(updateRecentAirportSearchStub).not.to.have.been.called;
    });

    it('should call updateRecentAirportSearch with multiselectgroup codes on done button click', () => {
      const component = createComponent({
        allAirports: getMultiSelectGroup()['Boston Area Airports'],
        isMultiSelectGroupEnabled: true
      });
      const searchInput = component.find('input');

      enterText(searchInput, 'Area');
      focus(searchInput);

      const airportGroup = component.find('FormCheckboxField').at(0);

      airportGroup.props().onChange(true);
      click(component.find('.action-bar-buttons--item').first().find('button')); 

      expect(updateRecentAirportSearchStub).to.have.been.calledWith(getMultiSelectGroup()['Recently Searched'][0]);
    });
  });

  const createComponent = (props = {}, osName = 'iOS') => {
    const defaultProps = {
      allAirports: AIRPORT_LIST,
      recentlySearched: [],
      title: 'Airport List',
      disableInternationals: false,
      showBackButton: false,
      dontShowCurrentLocation: false,
      hideSearchBarHeader: false,
      children: <div>childElement</div>,
      modalId: 'airportListModalId',
      onAirportSelect: onAirportSelectStub,
      onCancel: onCancelStub,
      updateFormDataValueFn: updateFormDataValueStub
    };
    const mergedProps = _.merge({}, defaultProps, props);

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

    const AirportList = proxyquire('src/airports/components/airportList', {
      'src/airports/actions/airportsActions': {
        updateRecentAirportSearch: updateRecentAirportSearchStub,
        deleteFromRecentAirportSearch: deleteFromRecentAirportSearchStub,
        updateMultiSelectGroup: updateMultiSelectGroupStub,
        clearMultiSelectGroupFormId: clearMultiSelectGroupFormIdStub
      },
      'src/locationServices/actions': {
        fetchNearestAirportWithCoordinates: fetchNearestAirportWithCoordinatesFnStub,
        getPhoneLocationForWebView: getPhoneLocationForWebViewFnStub,
        getPhoneLocation: getPhoneLocationFnStub
      },
      'src/shared/actions/dialogActions': {
        showDialog: showDialogFnStub
      },
      'src/shared/actions/sharedActions': {
        showErrorPopUp: showErrorPopUpFnStub
      },
      'src/shared/helpers/deviceInfo': {
        default: {
          os: {
            name: osName
          }
        }
      },
      'src/shared/actions/formDataActions': {
        updateFormDataValue: updateFormDataValueStub,
        clearFormDataById: clearFormDataByIdStub
      }
    }).default;

    const wrapper = integrationMount({ withDialog: true })(state, AirportList, mergedProps);

    return wrapper;
  };

  const RECENT_AIRPORT_LIST = [
    {
      code: 'DEN',
      airportName: 'Denver',
      displayName: 'Denver',
      cityName: 'Denver',
      shortDisplayName: 'Denver',
      cityState: 'CO',
      marketingCarriers: ['WN'],

      countryCode: 'US',
      latitude: '39.8617',
      longitude: '-104.673',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing'
    },
    {
      code: 'CAK',
      airportName: 'Akron-Canton',
      displayName: 'Akron-Canton',
      cityName: 'Akron',
      shortDisplayName: 'Akron',
      cityState: 'OH',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '40.9161',
      longitude: '-81.4422',
      airportSearchName: 'Ohio'
    },
    {
      code: 'ALB',
      airportName: 'Albany',
      displayName: 'Albany',
      cityName: 'Albany',
      shortDisplayName: 'Albany',
      cityState: 'NY',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '42.7483',
      longitude: '-73.8017',
      airportSearchName: 'New York'
    }
  ];

  const AIRPORT_LIST = [
    {
      code: 'DEN',
      airportName: 'Denver',
      displayName: 'Denver',
      cityName: 'Denver',
      shortDisplayName: 'Denver',
      cityState: 'CO',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '39.8617',
      longitude: '-104.673',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing'
    },
    {
      code: 'CAK',
      airportName: 'Akron-Canton',
      displayName: 'Akron-Canton',
      cityName: 'Akron',
      shortDisplayName: 'Akron',
      cityState: 'OH',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '40.9161',
      longitude: '-81.4422',
      airportSearchName: 'Ohio'
    },
    {
      code: 'ALB',
      airportName: 'Albany',
      displayName: 'Albany',
      cityName: 'Albany',
      shortDisplayName: 'Albany',
      cityState: 'NY',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '42.7483',
      longitude: '-73.8017',
      airportSearchName: 'New York'
    },
    {
      code: 'AUA',
      airportName: 'Aruba',
      displayName: 'Aruba',
      cityName: 'Aruba',
      shortDisplayName: 'Aruba',
      cityState: 'Aruba',
      marketingCarriers: ['WN'],
      countryCode: 'AW',
      latitude: '12.5014',
      longitude: '-70.0152',
      airportSearchName: ''
    },
    {
      code: 'ABQ',
      airportName: 'Albuquerque',
      displayName: 'Albuquerque',
      cityName: 'Albuquerque',
      shortDisplayName: 'Albuquerque',
      cityState: 'NM',
      marketingCarriers: ['WN'],
      countryCode: 'US',
      latitude: '123.456',
      longitude: '-123.456',
      airportSearchName: 'Albuquerque'
    },
    {
      code: 'SJD',
      airportName: 'Cabo San Lucas/Los Cabos',
      displayName: 'Cabo San Lucas/Los Cabos',
      cityName: 'Cabo San Lucas/Los Cabos',
      shortDisplayName: 'Cabo San Lucas/Los Cabos',
      cityState: 'MX',
      marketingCarriers: ['WN'],
      countryCode: 'MX',
      latitude: '123.456',
      longitude: '-123.456',
      airportSearchName: 'Cabo San Lucas/Los Cabos'
    },
    {
      code: 'CUN',
      airportName: 'Cancun',
      displayName: 'Cancun',
      cityName: 'Cancun',
      shortDisplayName: 'Cancun',
      cityState: 'Mexico',
      marketingCarriers: ['WN'],
      countryCode: 'MX',
      latitude: '123.456',
      longitude: '-123.456',
      airportSearchName: 'Cancun'
    },
    {
      code: 'MEX',
      airportName: 'Mexico City',
      displayName: 'Mexico City',
      cityName: 'Mexico City',
      shortDisplayName: 'Mexico City',
      cityState: 'Mexico',
      marketingCarriers: ['WN'],
      countryCode: 'MX',
      latitude: '123.456',
      longitude: '-123.456',
      airportSearchName: 'Mexico City'
    }
  ];
});
