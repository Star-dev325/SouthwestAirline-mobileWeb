import { sandbox } from 'sinon';
import dayjs from 'dayjs';
import enrollPersonalInfoFormValidator, {
  ANALYTICS_RR_AGE_TRACKER
} from 'src/shared/form/formValidators/enrollPersonalInfoFormValidator';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('enrollPersonalInfoFormValidator', () => {
  let dobUnder13;
  let dobOver13;
  let raiseSatelliteEventSpy;

  context('dateOfBirth', () => {
    beforeEach(() => {
      dobUnder13 = dayjs().subtract(10, 'year').format('YYYY-MM-DD');
      dobOver13 = dayjs().subtract(13, 'year').format('YYYY-MM-DD');
      raiseSatelliteEventSpy = sinon.spy(AnalyticsEventHelper, 'raiseSatelliteEvent');
    });
    afterEach(() => {
      sinon.restore();
    });

    context('LOYALTY_AGE_VERIFICATION true', () => {
      it('should not pass validation when passenger is under age threshold', () => {
        const mockFormData = { dateOfBirth: dobUnder13 };
        const options = { LOYALTY_AGE_VERIFICATION: true };
        const actualResult = enrollPersonalInfoFormValidator(options)(mockFormData);

        expect(actualResult).to.deep.equal({
          dateOfBirth: {
            msg: 'Thank you for your interest in Rapid Rewards®. We are unable to complete your enrollment online due to age restrictions. Please contact us at 1-800-I-FLY-SWA.',
            type: 'ERROR_HEADER'
          },
          hasSomeFieldsNeedToCorrect: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          }
        });
      });
      it('should fire analytics tracking when passenger is under age threshold', () => {
        const mockFormData = { dateOfBirth: dobUnder13 };
        const options = { LOYALTY_AGE_VERIFICATION: true };

        enrollPersonalInfoFormValidator(options)(mockFormData);
        expect(raiseSatelliteEventSpy).to.be.calledWith(ANALYTICS_RR_AGE_TRACKER);
      });
      it('should pass validation when passenger is over age threshold', () => {
        const mockFormData = { dateOfBirth: dobOver13 };
        const options = { LOYALTY_AGE_VERIFICATION: true };
        const actualResult = enrollPersonalInfoFormValidator(options)(mockFormData);

        expect(actualResult).to.deep.equal({});
      });
    });
  });
  context('LOYALTY_AGE_VERIFICATION false', () => {
    it('should pass validation even if passenger is below age threshold', () => {
      const mockFormData = { dateOfBirth: dobOver13 };
      const options = { LOYALTY_AGE_VERIFICATION: false };
      const actualResult = enrollPersonalInfoFormValidator(options)(mockFormData);

      expect(actualResult).to.deep.equal({});
    });

    it('should not fire analytics tracking when passenger is under age threshold', () => {
      const mockFormData = { dateOfBirth: dobUnder13 };
      const options = { LOYALTY_AGE_VERIFICATION: false };

      enrollPersonalInfoFormValidator(options)(mockFormData);
      expect(raiseSatelliteEventSpy).to.not.be.called;
    });
  });
});
