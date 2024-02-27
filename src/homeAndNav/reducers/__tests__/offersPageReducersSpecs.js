import { sandbox } from 'sinon';
import offersPageReducer from 'src/homeAndNav/reducers/offersPageReducers';
import * as wcmTransformer from 'src/wcm/transformers/wcmTransformer';
import HomeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';

const {
  HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS,
  HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS,
  HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA
} = HomeAndNavActionTypes;

const sinon = sandbox.create();

describe('OffersPageReducers', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('placements', () => {
    let toDynamicPlacementStub;

    beforeEach(() => {
      toDynamicPlacementStub = sinon.stub(wcmTransformer, 'toDynamicPlacement');
    });

    it('should return initial default state', () => {
      const state = offersPageReducer(undefined, {});

      expect(state.placements).to.deep.equal([]);
      expect(toDynamicPlacementStub).to.have.not.been.called;
    });

    it('should set placements to existing state for undefined action', () => {
      const placements = ['placement'];
      const state = offersPageReducer({ placements }, undefined);

      expect(state.placements).to.deep.equal(placements);
      expect(toDynamicPlacementStub).to.have.not.been.called;
    });

    it(`should handle ${HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS}`, () => {
      const dynamicPlacement1 = 'dynamicPlacement1';
      const dynamicPlacement2 = 'dynamicPlacement2';
      const dynamicPlacement3 = 'dynamicPlacement3';

      const offer1 = {};
      const offer3 = {};
      const offer8 = {};

      const response = { results: { offer8, offer1, offer3 } };

      toDynamicPlacementStub.onFirstCall().returns(dynamicPlacement1);
      toDynamicPlacementStub.onSecondCall().returns(dynamicPlacement2);
      toDynamicPlacementStub.onThirdCall().returns(dynamicPlacement3);

      const action = { type: HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS, response };
      const state = offersPageReducer(undefined, action);

      expect(toDynamicPlacementStub.callCount).to.equal(3);
      expect(toDynamicPlacementStub.getCall(0).args[0]).to.deep.equal(response, offer1);
      expect(toDynamicPlacementStub.getCall(1).args[0]).to.deep.equal(response, offer3);
      expect(toDynamicPlacementStub.getCall(2).args[0]).to.deep.equal(response, offer8);

      expect(state.placements).to.have.length(3);
      expect(state.placements).to.deep.equal([dynamicPlacement1, dynamicPlacement2, dynamicPlacement3]);
    });

    it(`should handle ${HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS} with empty response`, () => {
      const response = {};
      const existingState = { placements: ['placement1', 'placement2', 'placement3'] };

      const action = { type: HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS, response };
      const state = offersPageReducer(existingState, action);

      expect(state.placements).to.deep.equal([]);
    });

    it(`should handle ${HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS}`, () => {
      const dynamicPlacement1 = 'dynamicPlacement1';
      const dynamicPlacement2 = 'dynamicPlacement2';
      const dynamicPlacement3 = 'dynamicPlacement3';

      const offer1 = {};
      const invalidKeyoffer2 = {};
      const offer3 = {};
      const offer4InvalidKey = {};
      const offer8 = {};

      const response = { results: { offer8, offer1, offer3, invalidKeyoffer2, offer4InvalidKey, undefined: {} } };

      toDynamicPlacementStub.onFirstCall().returns(dynamicPlacement1);
      toDynamicPlacementStub.onSecondCall().returns(dynamicPlacement2);
      toDynamicPlacementStub.onThirdCall().returns(dynamicPlacement3);

      const action = { type: HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS, response };
      const state = offersPageReducer(undefined, action);

      expect(toDynamicPlacementStub.callCount).to.equal(3);
      expect(toDynamicPlacementStub.getCall(0).args[0]).to.deep.equal(response, offer1);
      expect(toDynamicPlacementStub.getCall(1).args[0]).to.deep.equal(response, offer3);
      expect(toDynamicPlacementStub.getCall(2).args[0]).to.deep.equal(response, offer8);

      expect(state.placements).to.deep.equal([dynamicPlacement1, dynamicPlacement2, dynamicPlacement3]);
    });
  });

  context('templateData', () => {
    it('should return initial default state', () => {
      const state = offersPageReducer(undefined, {});

      expect(state.templateData).to.deep.equal({});
    });

    it('should set placements to existing state for undefined action', () => {
      const templateData = { key: 'value' };
      const state = offersPageReducer({ templateData }, undefined);

      expect(state.templateData).to.deep.equal(templateData);
    });

    it(`should handle ${HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA}`, () => {
      const templateData = { key: 'value' };

      const action = { type: HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA, templateData };
      const state = offersPageReducer(undefined, action);

      expect(state.templateData).to.deep.equal(templateData);
    });

    it(`should handle ${HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA} with null templateData`, () => {
      const action = { type: HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA, templateData: null };
      const state = offersPageReducer(undefined, action);

      expect(state.templateData).to.deep.equal({});
    });
  });
});
