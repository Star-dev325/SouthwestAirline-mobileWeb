import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as CarCancelActions from 'src/carCancel/actions/carCancelActions';
import { CarCancelConfirmationPage } from 'src/carCancel/pages/carCancelConfirmationPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Car cancel confirmation page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page correctly', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should call retrieveAndCancelCarReservationWithSearchToken if the searchToken is present and the carCancelInfo object is empty', () => {
    const retrieveAndCancelCarReservationWithSearchTokenMock = jest.spyOn(CarCancelActions, 'retrieveAndCancelCarReservationWithSearchToken');
     
    const props = {
      carCancelInfo: {},
      query: {
        searchToken: '123abc'
      },
      retrieveAndCancelCarReservationWithSearchTokenFn: retrieveAndCancelCarReservationWithSearchTokenMock
    };

    createComponent(props);

    expect(retrieveAndCancelCarReservationWithSearchTokenMock).toHaveBeenCalledWith('123abc');
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };
    const defaultProps = {
      carCancelInfo: {
        confirmationNumber: '61805258COUNT',
        driver: {
          firstName: 'HX',
          lastName: 'LIN'
        },
        vendorImage: '/content/mkt/images/car_vendors/National_Logo_results.png',
        pickUpTime: '2016-05-07T11:30',
        cityName: 'Abilene',
        cityState: 'TX'
      }
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <BrowserRouter>
          <CarCancelConfirmationPage {...finalProps} />
        </BrowserRouter>
      </Provider>
    );
  };
});
