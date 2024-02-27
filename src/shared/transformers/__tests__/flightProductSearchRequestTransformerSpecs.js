import dayjs from 'dayjs';
import _ from 'lodash';
import { sandbox } from 'sinon';

import {
  transformToAPIRequest,
  transformFromFormDataToSearchRequest,
  transformToNoRoutesErrorDialogOptions
} from 'src/shared/transformers/flightProductSearchRequestTransformer';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('flightProductSearchRequestTransformer', () => {
  context('transformFromFormDataToSearchRequest', () => {
    it('should populate the required fields for a round trip', () => {
      const formData = {
        tripType: 'roundTrip',
        origin: 'ALB',
        destination: 'AUS',
        departureAndReturnDate: {
          departureDate: '2018-08-09',
          returnDate: '2018-08-12',
          isDateChanged: false
        },
        numberOfAdults: 1,
        promoCode: '',
        currencyType: 'USD'
      };

      const searchRequest = transformFromFormDataToSearchRequest(formData);

      expect(searchRequest.returnDate).to.equal('2018-08-12');
    });

    it('should populate the required fields for a round trip', () => {
      const formData = {
        tripType: 'oneWay',
        origin: 'ALB',
        destination: 'AUS',
        departureAndReturnDate: {
          departureDate: '2018-08-09',
          isDateChanged: false
        },
        numberOfAdults: 1,
        promoCode: '',
        currencyType: 'USD'
      };

      const searchRequest = transformFromFormDataToSearchRequest(formData);

      expect(searchRequest.returnDate).to.be.undefined;
    });
  });

  context('transformToAPIRequest', () => {
    it('should populate the required fields for a one way trip', () => {
      const searchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        numberOfAdults: 1
      };

      const apiRequest = transformToAPIRequest(searchRequest);

      expect(apiRequest.query['return-date']).to.not.exist;
    });

    it('should populate the required fields for a round trip', () => {
      const searchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 1
      };

      const apiRequest = transformToAPIRequest(searchRequest);

      expect(apiRequest.query['return-date']).to.deep.equal(searchRequest.returnDate.format('YYYY-MM-DD'));
    });

    context('origin and destination are enabled', () => {
      it('should include empty returnDate', () => {
        const searchRequest = {
          origin: 'origin',
          destination: 'dest',
          departureDate: dayjs('2015-05-13'),
          returnDate: dayjs('2015-05-18'),
          numberOfAdults: 1
        };

        const apiRequest = transformToAPIRequest(searchRequest);

        expect(apiRequest.query['departure-date']).to.equal('2015-05-13');
        expect(apiRequest.query['return-date']).to.equal('2015-05-18');
      });

      it('should not include returnDate', () => {
        const searchRequest = {
          origin: 'origin',
          destination: 'dest',
          returnDate: dayjs('2015-05-18'),
          numberOfAdults: 1
        };

        const apiRequest = transformToAPIRequest(searchRequest);

        expect(apiRequest.query['departure-date']).to.equal('2015-05-18');
      });
    });

    context('no promo code provided', () => {
      it('should omit promo code', () => {
        const searchRequest = {
          origin: 'origin',
          destination: 'dest',
          departureDate: dayjs('2015-05-13'),
          returnDate: dayjs('2015-05-18'),
          numberOfAdults: 1
        };

        const apiRequest = transformToAPIRequest(searchRequest);

        expect(apiRequest['promo-code']).to.not.exist;
      });
    });

    context('numberOfLapInfants provided', () => {
      it('should include numberOfLapInfants in request', () => {
        const searchRequest = {
          origin: 'origin',
          destination: 'dest',
          departureDate: dayjs('2015-05-13'),
          returnDate: dayjs('2015-05-18'),
          numberOfAdults: 1,
          numberOfLapInfants: 1
        };

        const apiRequest = transformToAPIRequest(searchRequest);

        expect(apiRequest.query['number-lap-infant-passengers']).to.eql(1);
      });
    });
  });

  context('transformToNoRoutesErrorDialogOptions', () => {
    it('should return no routes dialog when is no routes error for non hawaii included flight', () => {
      const error = {
        responseJSON: {
          code: 400521204,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      };
      const errorMessages = {
        title: i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE'),
        message: i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE')
      };

      const dialogOptions = transformToNoRoutesErrorDialogOptions(
        error,
        { origin: 'DAL', destination: 'AUS', departureDate: '2019-04-17' },
        errorMessages
      );

      expect(dialogOptions.active).to.equal(true);
      expect(dialogOptions.title).to.equal(i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE'));
      expect(dialogOptions.name).to.equal('no-routes-non-hawaii-error');
      expect(dialogOptions.message).to.equal(i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE'));
      expect(dialogOptions.closeLabel).to.equal('OK');
      expect(dialogOptions.verticalLinks.links[0]).to.deep.include({
        href: 'https://www.southwest.com/air/flight-schedules/?destinationAirportCode=AUS&originationAirportCode=DAL&departureDate=2019-04-17',
        isExternal: true,
        label: 'Learn More'
      });
      expect(dialogOptions.error).to.equal(error);
    });

    it('should close no routes dialog and call error handler when ok clicked', () => {
      const error = {
        responseJSON: {
          code: 400521204,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      };
      const errorMessages = {
        title: i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE'),
        message: i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE')
      };
      const errorHandlerStub = sinon.stub();

      const dialogOptions = transformToNoRoutesErrorDialogOptions(
        error,
        { origin: 'DAL', destination: 'AUS', departureDate: '2019-04-17' },
        errorMessages,
        _.noop,
        errorHandlerStub
      );

      const onClickFunction = dialogOptions.onClose;

      return onClickFunction().then(() => {
        expect(errorHandlerStub).to.have.been.called;
      });
    });

    it('should close no routes dialog and call error handler when learn more clicked', () => {
      const error = {
        responseJSON: {
          code: 400521204,
          message: 'message',
          requestId: 'mkddk90:mweb',
          httpStatusCode: '3008333'
        }
      };
      const errorMessages = {
        title: i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE'),
        message: i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE')
      };
      const errorHandlerStub = sinon.stub();

      const dialogOptions = transformToNoRoutesErrorDialogOptions(
        error,
        { origin: 'DAL', destination: 'AUS', departureDate: '2019-04-17' },
        errorMessages,
        _.noop,
        errorHandlerStub
      );

      const onClickFunction = dialogOptions.verticalLinks.links[0].onClick;

      return onClickFunction().then(() => {
        expect(errorHandlerStub).to.have.been.called;
      });
    });
  });
});
