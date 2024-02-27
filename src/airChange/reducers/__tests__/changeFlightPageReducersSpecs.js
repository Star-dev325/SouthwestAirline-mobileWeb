import { changeFlightPage as changeFlightPageReducers } from 'src/airChange/reducers/changeFlightPageReducers';

describe('airChangeReducers', () => {
  context('initial', () => {
    it('should return default value', () => {
      const updatedState = changeFlightPageReducers(undefined, { type: '@@Init' });

      expect(updatedState).to.deep.equal({
        pnr: null,
        response: {}
      });
    });
  });

  context('pnr', () => {
    it('should save pnr when SAVE_PNR action be triggered', () => {
      const pnr = {
        confirmationNumber: 'ABD679',
        firstName: 'first name',
        lastName: 'last name'
      };

      const updatedState = changeFlightPageReducers(undefined, {
        type: 'AIR_CHANGE__SAVE_PNR',
        pnr
      });

      expect(updatedState.pnr).to.deep.equal(pnr);
    });

    it('should return default state when action is undefined', () => {
      expect(changeFlightPageReducers().pnr).to.equal(null);
    });
  });

  context('response', () => {
    it('should return response when FETCH_RESERVATION_CHANGEABLE_SUCCESS action be triggered', () => {
      const updatedState = changeFlightPageReducers(undefined, {
        type: 'AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS',
        response: { changeFlightPage: 'some response' }
      });

      expect(updatedState.response).to.deep.equal('some response');
    });

    it('should return response when FETCH_SPLIT_PNR_RESERVATION_SUCCESS action triggered', () => {
      const updatedState = changeFlightPageReducers(undefined, {
        type: 'AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS',
        response: { changeFlightPage: 'with split pnr response' }
      });

      expect(updatedState.response).to.deep.equal('with split pnr response');
    });

    it('should return default state when action is undefined', () => {
      expect(changeFlightPageReducers().response).to.be.empty;
    });
  });
});
