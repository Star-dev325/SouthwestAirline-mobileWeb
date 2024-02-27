import _ from 'lodash';
import CarBookingSearchFormValidator from 'src/shared/form/formValidators/carBookingSearchFormValidator';
import i18n from '@swa-ui/locale';

describe('CarBookingSearchFormValidator', () => {
  context('dates and times', () => {
    let formData;

    beforeEach(() => {
      formData = {
        departureAndReturnCities: {
          pickUp: 'DAL',
          dropOff: 'DAL'
        },
        departureAndReturnDate: {
          pickUpDate: '2018-12-20',
          dropOffDate: '2018-12-23'
        },
        pickUpTime: '11:30AM',
        dropOffTime: '11:30AM'
      };
    });

    it('should pass form validation when data is valid', () => {
      expect(CarBookingSearchFormValidator()(formData)).to.deep.equal({});
    });

    it('should fail form validation when search is for same date and same time', () => {
      _.set(formData, 'departureAndReturnDate.dropOffDate', formData.departureAndReturnDate.pickUpDate);

      expect(CarBookingSearchFormValidator()(formData)).to.deep.equal({
        pickUpTime: {
          type: 'ERROR_HEADER',
          msg: 'Return time must be after pick up time'
        },
        dropOffTime: {
          type: 'ERROR_HEADER',
          msg: 'Return time must be after pick up time'
        },
        hasSomeFieldsNeedToCorrect: {
          type: 'ERROR_HEADER',
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
        }
      });
    });

    it('should fail form validation when search is for same date and same time and default times', () => {
      _.set(formData, 'departureAndReturnDate.dropOffDate', formData.departureAndReturnDate.pickUpDate);
      _.set(formData, 'departureAndReturnDate.pickUpTime', undefined);
      _.set(formData, 'departureAndReturnDate.dropOffTime', undefined);

      expect(CarBookingSearchFormValidator()(formData)).to.deep.equal({
        pickUpTime: {
          type: 'ERROR_HEADER',
          msg: 'Return time must be after pick up time'
        },
        dropOffTime: {
          type: 'ERROR_HEADER',
          msg: 'Return time must be after pick up time'
        },
        hasSomeFieldsNeedToCorrect: {
          type: 'ERROR_HEADER',
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
        }
      });
    });

    it('should fail form validation when pickUp and dropOff cities are empty', () => {
      _.set(formData, 'departureAndReturnCities.pickUp', undefined);
      _.set(formData, 'departureAndReturnCities.dropOff', undefined);

      expect(CarBookingSearchFormValidator()(formData)).to.deep.equal({
        departureAndReturnCities: {
          type: 'ERROR_HEADER',
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
        },
        hasSomeFieldsNeedToCorrect: {
          type: 'ERROR_HEADER',
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
        }
      });
    });
  });
});
