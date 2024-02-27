import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { BrowserRouter } from 'react-router-dom';
import AirBookingShoppingSearchFormDefaultExport from 'src/airBooking/components/airBookingShoppingSearchForm';

import dayjs from 'dayjs';

jest.mock('src/shared/form/fields/moneyOrPointsSwitchButtonField', () => () => (
  <div>Mocked MoneyOrPointsSwitchButtonField</div>
));

describe('AirBookingShoppingSearchForm', () => {
  const baseSearchRequest = {
    departureDate: '2018-08-10',
    returnDate: '2018-08-17'
  };
  let analyticsTrackViewTabFnStub,
    onDestinationSelectorClickedStub,
    onSubmitStub,
    onUnmountStub,
    onValidationFailedStub,
    updateFormDataValueFnStub,
    updateFormFieldFnStub,
    updateSelectedAirportInfoFnStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
    onValidationFailedStub = jest.fn();
    onUnmountStub = jest.fn();
    updateFormFieldFnStub = jest.fn();
    updateFormDataValueFnStub = jest.fn();
    updateSelectedAirportInfoFnStub = jest.fn();
    analyticsTrackViewTabFnStub = jest.fn();
    onDestinationSelectorClickedStub = jest.fn();
  });

  describe('render', () => {
    it('should render air booking shopping search form', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should pass onDestinationSelectorClicked to destination airport selector', () => {
      const { container } = createComponent({ onDestinationSelectorClicked: onDestinationSelectorClickedStub });
      const leftElement = container.querySelector('i.airport-icon').previousElementSibling;

      fireEvent.click(leftElement.querySelector('.form-field--container'));
      expect(onDestinationSelectorClickedStub).not.toHaveBeenCalled();

      const rightElement = container.querySelector('i.airport-icon').nextElementSibling;

      fireEvent.click(rightElement.querySelector('.form-field--container'));
      expect(onDestinationSelectorClickedStub).toHaveBeenCalled();
    });

    describe('promo code field', () => {
      it('should be disabled when the LFC calendar is checked', () => {
        const { container } = createComponent({
          initialFormData: { useLowFareCalendar: true }
        });

        expect(container).toMatchSnapshot();
      });

      it('should not be disabled when the LFC calendar is not checked', () => {
        const { container } = createComponent({
          initialFormData: { useLowFareCalendar: false }
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('disablePlus & disableMinus', () => {
      it('should enable plus and minus button when passenger count available', () => {
        const { container } = createComponent({
          searchRequest: {
            ...baseSearchRequest,
            numberOfAdults: 7
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should disablePlus when passenger count greater than 8', () => {
        const { container } = createComponent({
          searchRequest: {
            ...baseSearchRequest,
            numberOfAdults: 8
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should disableMinus when passenger count less than 1', () => {
        const { container } = createComponent({
          searchRequest: {
            ...baseSearchRequest,
            numberOfAdults: 1
          }
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('webview', () => {
      it('should not render low fare calendar section', () => {
        const { container } = createComponent({ isWebView: true });

        expect(container).toMatchSnapshot();
      });

      it('should not render Corporate Booking Selection', () => {
        const { container } = createComponent({ isWebView: true, isLoggedIn: true });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('click on tab bar', () => {
    beforeEach(() => {
      updateSelectedAirportInfoFnStub = jest.fn();
      analyticsTrackViewTabFnStub = jest.fn();
      updateFormFieldFnStub = jest.fn();
    });
    it('should update departureAndReturnDate returnDate with three days after departure date when switch oneway to round trip', () => {
      const { container } = createComponent({
        searchRequest: {
          departureDate: '2018-08-10',
          returnDate: '',
          tripType: 'oneWay',
          isRoundTrip: false
        }
      });

      const button = container.querySelectorAll('.nav.nav--justified .nav--item>button.button--link')[0];

      fireEvent.click(button);

      expect(updateFormFieldFnStub).toHaveBeenCalledWith('AIR_BOOKING_SHOPPING_SEARCH_FORM', 'departureAndReturnDate', {
        departureDate: '2018-08-10',
        returnDate: '2018-08-13',
        isDateChanged: false
      });
    });

    it('should update departureAndReturnDate previous returnDate when switch round trip to round trip', () => {
      const { container } = createComponent({
        searchRequest: {
          ...baseSearchRequest
        }
      });

      const button = container.querySelectorAll('.nav.nav--justified .nav--item>button.button--link')[0];

      fireEvent.click(button);

      expect(updateFormFieldFnStub).toHaveBeenCalledWith('AIR_BOOKING_SHOPPING_SEARCH_FORM', 'departureAndReturnDate', {
        ...baseSearchRequest,
        isDateChanged: false
      });
    });

    it('should update departureAndReturnDate with empty returnDate when switch round trip to one way', () => {
      const { container } = createComponent({
        searchRequest: {
          ...baseSearchRequest
        }
      });

      const button = container.querySelectorAll('.nav.nav--justified .nav--item>button.button--link')[1];

      fireEvent.click(button);

      expect(updateFormFieldFnStub).toHaveBeenCalledWith('AIR_BOOKING_SHOPPING_SEARCH_FORM', 'departureAndReturnDate', {
        departureDate: '2018-08-10',
        returnDate: '',
        isDateChanged: false
      });
    });
  });

  describe('when form submit', () => {
    it('should call onSubmit when data is valid', () => {
      const { container } = createComponent({
        initialFormData: {
          origin: 'ABL',
          destination: 'DAL'
        }
      });

      fireEvent.click(container.querySelector('.book-flight-form button[type="submit"]'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        departureAndReturnDate: {
          ...baseSearchRequest,
          isDateChanged: false
        },
        tripType: 'roundTrip',
        numberOfAdults: 1,
        promoCode: '',
        origin: 'ABL',
        destination: 'DAL',
        useLowFareCalendar: ''
      });
    });
  });

  describe('when CorporateBookingSelection', () => {
    describe('when logged in', () => {
      it('should render', () => {
        const { container } = createComponent({ isLoggedIn: true });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when not logged in', () => {
      it('should not render', () => {
        const { container } = createComponent({ isLoggedIn: false });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when without lap child', () => {
      it('should render', () => {
        const { container } = createComponent({
          isLoggedIn: true,
          searchRequest: {
            departureDate: '2018-08-10',
            returnDate: '2018-08-13',
            numberOfLapInfants: 0
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should render when searchRequest does not contain numberOfLapInfants value', () => {
        const { container } = createComponent({
          isLoggedIn: true,
          searchRequest: {
            departureDate: '2018-08-10',
            returnDate: '2018-08-13'
          }
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when airBookingShoppingSearchForm', () => {
      const formData = { numberOfAdults: 1 };

      describe('when MWEB_HOMEPAGE_REDESIGN is true', () => {
        it('should render air booking shopping with className homepage-redesign', () => {
          const { container } = createComponent({ MWEB_HOMEPAGE_REDESIGN: true, formData });

          expect(container).toMatchSnapshot();
        });
      });

      describe('when MWEB_HOMEPAGE_REDESIGN is false', () => {
        it('should render air booking shopping with className book-flight-form', () => {
          const { container } = createComponent({ MWEB_HOMEPAGE_REDESIGN: false, formData });

          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  describe('multiSelectGroup', () => {
    it('should pass multiSelectGroup', () => {
      const formData = { numberOfAdults: 1 };
      const { container } = createComponent(
        {
          multiSelectGroup: { isSelected: true, origin: ['BOS', 'BST'] },
          formData
        },
        true
      );

      expect(container).toMatchSnapshot();
    });

    it('should call updateFormDataValueFn with form id and multiselect destination', () => {
      createComponent({ 
        multiSelectGroup: { isSelected: true, destination: ['BOS', 'BST'] }
      });

      expect(updateFormDataValueFnStub).toHaveBeenCalledWith(
        "AIR_BOOKING_SHOPPING_SEARCH_FORM", {
          "destination": "BOS,BST"
        });
    });

    it('should call updateFormDataValueFn with form id and multiselect origin', () => {
      createComponent({ 
        multiSelectGroup: { isSelected: true, origin: ['BOS', 'BST'] }
      });

      expect(updateFormDataValueFnStub).toHaveBeenCalledWith(
        "AIR_BOOKING_SHOPPING_SEARCH_FORM", {
          "origin": "BOS,BST"
        });
    });

    it('should not call updateFormDataValueFn if not muliselectgroup', () => {
      createComponent({ 
        multiSelectGroup: { isSelected: false }
      });

      expect(updateFormDataValueFnStub).not.toHaveBeenCalled();
    });
  });

  describe('passengerCountValue being passed from props', () => {
    const formData = { numberOfAdults: 1 };

    it('should return adultsPlusChildrenCount as 1 if adultCount or lapChildCount is undefined', () => {
      const { container } = createComponent({ passengerCountValue: {}, formData }, true);

      expect(container).toMatchSnapshot();
    });

    it('should return adultsPlusChildrenCount as 2 if 1 adult and 1 lap child are selected', () => {
      const { container } = createComponent(
        { passengerCountValue: { adultCount: 1, lapChildCount: 1 }, formData },
        true
      );

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      allAirports: [],
      analyticsTrackViewTabFn: analyticsTrackViewTabFnStub,
      calendarScheduleMessage: 'test calendar schedule message',
      corporateBookingSwitchInfo: { label: 'SWABIZ' },
      formId: 'AIR_BOOKING_SHOPPING_SEARCH_FORM',
      isMultipleAirportsEnabled: false,
      isLoggedIn: false,
      isWebView: false,
      lastBookableDate: dayjs.utc('2018-12-31'),
      multiSelectGroup: {},
      MWEB_HOMEPAGE_REDESIGN: false,
      onSubmit: onSubmitStub,
      onUnmount: onUnmountStub,
      onValidationFailed: onValidationFailedStub,
      recentlySearched: [],
      searchRequest: {
        ...baseSearchRequest,
        currencyType: 'USD',
        isRoundTrip: true,
        numberOfAdults: 1,
        promoCode: '',
        tripType: 'roundTrip'
      },
      toggles: {},
      updateFormDataValueFn: updateFormDataValueFnStub,
      updateFormFieldFn: updateFormFieldFnStub,
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnStub,
      passengerCountValue: {
        adultCount: 1,
        lapChildCount: 0,
        valueUpdated: false
      }
    };

    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <BrowserRouter>
        <Provider store={createMockedFormStore()}>
          <AirBookingShoppingSearchFormDefaultExport {...newProps} />
        </Provider>
      </BrowserRouter>
    );
  };
});
