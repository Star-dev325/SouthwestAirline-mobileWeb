import { resumeAfterLogin, searchRequest } from 'src/airUpgrade/reducers/upgradeSelectBoundsReducer';
import upgradedFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';

const { AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN, AIR_UPGRADE__SEARCH_REQUEST } = upgradedFareActionTypes;

describe('upgradeSelectBoundsReducer', () => {
  const actionResumeAfterLogin = { type: AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN, shouldResume: true };
  const actionSearchRequest = {
    type: AIR_UPGRADE__SEARCH_REQUEST,
    searchRequest: {
      from: 'MCO',
      to: 'DAL',
      boundType: 'DEPARTING'
    }
  };

  describe('when state is true', () => {
    it('should return true for ResumeAfterLogin with action', () => {
      expect(resumeAfterLogin(true, actionResumeAfterLogin)).toEqual(true);
    });

    it('should return true for SearchRequest with action', () => {
      const expectedResult = {
        boundType: 'DEPARTING',
        from: 'MCO',
        to: 'DAL'
      };

      expect(searchRequest(true, actionSearchRequest)).toEqual(expectedResult);
    });

    describe('when action is undefined', () => {
      it(' should return true for resumeAfterLogin', () => {
        expect(resumeAfterLogin(true, undefined)).toEqual(true);
      });

      it('should return true for searchRequest', () => {
        expect(searchRequest(true, undefined)).toEqual(true);
      });
    });

    describe('when action type is undefined', () => {
      const action = { type: undefined };

      it(' should return true for resumeAfterLogin', () => {
        expect(resumeAfterLogin(true, action)).toEqual(true);
      });

      it('should return true for searchRequest', () => {
        expect(searchRequest(true, action)).toEqual(true);
      });
    });

    describe('when action is empty', () => {
      it(' should return false for resumeAfterLogin', () => {
        expect(resumeAfterLogin(true, {})).toEqual(true);
      });

      it('should return false for searchRequest', () => {
        expect(searchRequest(true, {})).toEqual(true);
      });
    });
  });

  describe('when state is false', () => {
    it('should return true for ResumeAfterLogin with action', () => {
      expect(resumeAfterLogin(false, actionResumeAfterLogin)).toEqual(true);
    });

    it('should return true for SearchRequest with action', () => {
      const expectedResult = {
        boundType: 'DEPARTING',
        from: 'MCO',
        to: 'DAL'
      };

      expect(searchRequest(false, actionSearchRequest)).toEqual(expectedResult);
    });

    describe('when action is undefined', () => {
      it(' should return false for resumeAfterLogin', () => {
        expect(resumeAfterLogin(false, undefined)).toEqual(false);
      });

      it('should return false for searchRequest', () => {
        expect(searchRequest(false, undefined)).toEqual(false);
      });
    });

    describe('when action type is undefined', () => {
      const action = { type: undefined };

      it(' should return false for resumeAfterLogin', () => {
        expect(resumeAfterLogin(false, action)).toEqual(false);
      });

      it('should return false for searchRequest', () => {
        expect(searchRequest(false, action)).toEqual(false);
      });
    });

    describe('when action is empty', () => {
      it(' should return false for resumeAfterLogin', () => {
        expect(resumeAfterLogin(false, {})).toEqual(false);
      });

      it('should return false for searchRequest', () => {
        expect(searchRequest(false, {})).toEqual(false);
      });
    });
  });

  describe('when both state and action are empty', () => {
    it(' should return empty object for resumeAfterLogin', () => {
      expect(resumeAfterLogin({}, {})).toEqual({});
    });

    it('should return empty object for searchRequest', () => {
      expect(searchRequest({}, {})).toEqual({});
    });
  });

  describe('when state is empty with correct action', () => {
    it(' should return true for resumeAfterLogin', () => {
      expect(resumeAfterLogin({}, actionResumeAfterLogin)).toEqual(true);
    });

    it('should return false for searchRequest', () => {
      const expectedResult = {
        boundType: 'DEPARTING',
        from: 'MCO',
        to: 'DAL'
      };

      expect(searchRequest({}, actionSearchRequest)).toEqual(expectedResult);
    });
  });
});
