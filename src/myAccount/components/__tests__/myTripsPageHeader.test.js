import { fireEvent } from '@testing-library/react';
import MyTripsPageHeader from 'src/myAccount/components/myTripsPageHeader';
import MyTripType from 'src/myAccount/constants/myTripType';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';

const { PAST_FLIGHTS, SAVED_FLIGHTS, UPCOMING_TRIPS } = MyTripType;

describe('my trips page header', () => {
  let onTripTypeSelectChangeMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('a user selects an option from the dropdown menu', () => {
    onTripTypeSelectChangeMock = jest.fn();

    [PAST_FLIGHTS, SAVED_FLIGHTS, UPCOMING_TRIPS].forEach((option) => {
      it(`transitions to the route for ${option.value} after a moment`, (done) => {
        const { container } = createComponent(MyTripsPageHeader, {
          state: {},
          props: {
            currentView: 'Upcoming Trips',
            onTripTypeSelectChange: onTripTypeSelectChangeMock
          }
        });

        fireEvent.change(container.querySelector('select[data-qa="select-dropdown"]'), {
          target: { value: option.value }
        });

        waitFor.untilAssertPass(() => {
          expect(onTripTypeSelectChangeMock).toHaveBeenCalledWith(option.path);
        }, done);
      });
    });
  });
});
