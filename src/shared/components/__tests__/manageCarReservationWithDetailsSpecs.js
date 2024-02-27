import { sandbox } from 'sinon';
import _ from 'lodash';
import dayjs from 'dayjs';
import Q from 'q';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import waitFor from 'test/unit/helpers/waitFor';
import { integrationMount } from 'test/unit/helpers/testUtils';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';
import ManageCarReservationWithDetails from 'src/shared/components/manageCarReservationWithDetails';

const sinon = sandbox.create();

describe('ManageCarReservationWithDetails', () => {
  let carReservationDetails;
  let hideDialogFnStub, showDialogFnStub;
  let componentProps;
  let carReservation;
  let onCancelCarReservationClickStub;
  let onAddOtherCarClickStub;

  const fakeAsyncAction = (dispatch) => {
    dispatch({ type: 'FAKE_TYPE' });

    return Q();
  };

  beforeEach(() => {
    carReservation = new CarReservationBuilder().build();
    componentProps = {
      carReservation: {
        ...carReservation,
        manageCarReservationDetails: {
          confirmationNumber: '61805258COUNT',
          driver: {
            firstName: 'HX',
            lastName: 'LIN'
          },
          isCancelled: false
        }
      }
    };
    showDialogFnStub = sinon.stub().returns(fakeAsyncAction);
    hideDialogFnStub = sinon.stub();
    onCancelCarReservationClickStub = sinon.stub();
    onAddOtherCarClickStub = sinon.stub();
    carReservationDetails = createWrappedComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('manage button', () => {
    beforeEach(() => {
      const manageButton = carReservationDetails.find('button[data-qa="manageCarReservationButton"]');

      click(manageButton);
    });

    context('cancel car reservation button', () => {
      beforeEach(() => {
        const cancelCarReservationBottomLink = carReservationDetails.find('a[data-qa="cancel-car-reservation"]');

        click(cancelCarReservationBottomLink);
      });

      it('should call showDialogFnStub with parameters needed to popup a VerticalLinksPopup', (done) => {
        waitFor.untilAssertPass(() => {
          expect(showDialogFnStub).to.be.calledWithMatch({
            name: 'car-cancel-confirmation',
            message: `Things come up, and we understand that. So, we'll cancel your reservation - free of charge. Just say the word.`,
            title: 'Please confirm your cancellation'
          });
          expect(showDialogFnStub.args[0][0].closeLabel).to.not.exist;
          expect(showDialogFnStub.args[0][0].verticalLinks).to.exist;
        }, done);
      });
    });

    context('cancel car', () => {
      beforeEach(() => {
        const cancelCarReservationBottomLink = carReservationDetails.find('[data-qa="cancel-car-reservation"]');

        click(cancelCarReservationBottomLink);
      });

      it('should trigger onCancelCarReservationClick callback when user tap cancel car from manager menu', async () => {
        await showDialogFnStub.args[0][0].verticalLinks.links[1].onClick();
        expect(onCancelCarReservationClickStub).have.been.calledWith(componentProps.carReservation);
      });
    });

    context('add new car', () => {
      beforeEach(() => {
        const addOtherCarButton = carReservationDetails.find('[data-qa="add-another-car"]');

        click(addOtherCarButton);
      });

      it('should trigger _addAnotherCar callback when user tap add other car from manager menu', (done) => {
        waitFor.untilAssertPass(() => {
          expect(onAddOtherCarClickStub).have.been.calledWith({
            pickUp: 'DAL',
            pickUpDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
            dropOff: 'DAL',
            dropOffDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
            dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
            isRoundTrip: true
          });
        }, done);
      });
    });
  });

  const createWrappedComponent = () => {
    const defaultProps = {
      onCancelCarReservationClick: onCancelCarReservationClickStub,
      onAddOtherCarClick: onAddOtherCarClickStub,
      showDialogFn: showDialogFnStub,
      hideDialogFn: hideDialogFnStub
    };

    const props = _.merge({}, defaultProps, componentProps);

    return integrationMount({ withDialog: true })({}, ManageCarReservationWithDetails, props);
  };
});
