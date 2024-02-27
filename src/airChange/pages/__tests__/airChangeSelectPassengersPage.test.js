jest.mock('src/airChange/actions/airChangeActions', () => ({
  getSplitPnrReservationForChange: jest.fn()
}));
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { getSplitPnrReservationForChange } from 'src/airChange/actions/airChangeActions';
import { airChangeRoutes } from 'src/airChange/constants/airChangeRoutes.js';
import AirChangeSelectPassengersPage from 'src/airChange/pages/airChangeSelectPassengersPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import {
  splitPnrLinkObjWithSelectedIdsAndEmail,
  stateWithAllSelectedIdsFormData,
  stateWithValidEmailFormData
} from 'test/builders/model/selectPassengersPageBuilder';

describe('AirChangeSelectPassengersPage', () => {
  let pushStub;

  describe('render', () => {
    it('should render the page correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render correctly when splitPnrDetails and splitPnrLinkObj values are null', () => {
      const state = {
        app: {
          airChange: {
            changeFlightPage: {
              response: {
                splitPnrDetails: null,
                _links: {
                  splitPnr: null
                }
              }
            }
          }
        }
      };
      const { container } = createComponent({}, state);

      expect(container).toMatchSnapshot();
    });
  });

  describe('On submit', () => {
    let getSplitPnrReservationForChangeFnStub;

    beforeEach(() => {
      getSplitPnrReservationForChangeFnStub = getSplitPnrReservationForChange.mockImplementation(() => ({
        type: 'FAKE-ACTION'
      }));
      pushStub = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call getSplitPnrReservationForChangeFn with link object when passengers selected and email entered', () => {
      const { container } = createComponent();
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(getSplitPnrReservationForChangeFnStub).toHaveBeenCalledWith(splitPnrLinkObjWithSelectedIdsAndEmail);
      expect(pushStub).not.toHaveBeenCalled();
    });

    it('should redirect to the view page when all passengers selected', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent({}, stateWithAllSelectedIdsFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(pushStub).toHaveBeenCalledWith(airChangeRoutes.view.canonicalPath);
    });

    it('should redirect to the view page with searchToken param when all passengers selected and searchToken is present', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent({ query: { searchToken: 'abcde' } }, stateWithAllSelectedIdsFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(pushStub).toHaveBeenCalledWith(`${airChangeRoutes.view.canonicalPath}?searchToken=abcde`);
    });
  });

  const createComponent = (props = {}, state = stateWithValidEmailFormData) => {
    const defaultProps = {
      history: {
        push: pushStub
      }
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={configureMockStore()(state)}>
        <AirChangeSelectPassengersPage {...finalProps} />
      </Provider>
    );
  };
});
