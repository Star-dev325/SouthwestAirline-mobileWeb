import _ from 'lodash';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { shallow } from 'enzyme';
import sinonModule from 'sinon';
import React from 'react';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import proxyquire from 'proxyquire';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('GhostCard', () => {
  let wrapper;
  let onSelectGhostCardStub;
  let showFullScreenModalSpy;
  let hideFullScreenModalSpy;
  let GhostCard;
  let satelliteTrackStub;

  beforeEach(() => {
    onSelectGhostCardStub = sinon.stub();
    showFullScreenModalSpy = sinon.stub(fullScreenModalHelper, 'showFullScreenModal');
    hideFullScreenModalSpy = sinon.stub(fullScreenModalHelper, 'hideFullScreenModal');

    GhostCard = proxyquire('src/shared/components/ghostCard', {
      'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper': {
        showFullScreenModal: showFullScreenModalSpy,
        hideFullScreenModal: hideFullScreenModalSpy
      }
    }).default;
    satelliteTrackStub = sinon.stub(window._satellite, 'track');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when multiple ghost card available and user has selected one', () => {
    it('should render hidden ghost card field', () => {
      wrapper = createComponent({
        selectedCardId: 'First Ghost Card'
      });

      expect(wrapper.find('NavItem').props().children[1].props.name).to.equal('selectedGhostCardId');
      expect(wrapper.find('NavItem').props().children[1].props.hidden).to.be.true;
    });

    it('should show additional info container', () => {
      wrapper = createComponent({
        selectedCardId: 'First Ghost Card'
      });

      expect(wrapper.find('NavItem').props().children[0].props).to.deep.equal({
        additionalInfoMessage: i18n('AIR_BOOKING__CORPORATE_BOOKING__TAP_TO_SELECT_A_DIFFERENT_CARD'),
        creditCard: {
          isExpired: false,
          name: 'First Ghost Card',
          savedCreditCardId: 'First Ghost Card',
          type: 'GHOST_CARD'
        },
        disabled: false,
        fieldClassName: 'saved-credit-cards--item-field',
        name: 'selectedCardId',
        showRadioButton: true
      });
    });

    it('should show full screen modal', () => {
      wrapper = createComponent();
      click(wrapper.find('NavItem'));
      expect(showFullScreenModalSpy).to.have.been.calledWith('GHOST_CARD_MODAL_ID');
    });

    it('should not show full screen modal if in edit mode', () => {
      wrapper = createComponent({ disabled: true });
      click(wrapper.find('NavItem'));
      expect(showFullScreenModalSpy).to.not.have.been.calledWith('GHOST_CARD_MODAL_ID');
    });

    it('should raise satellite event when full screen modal is displayed', () => {
      wrapper = createComponent();
      click(wrapper.find('NavItem'));
      expect(satelliteTrackStub).to.have.been.calledWith('select corporate card');
    });

    it('should call onSelectGhostCard if a ghost card is selected', () => {
      wrapper = createComponent();
      wrapper.find('GhostCardList').getElement().props.onGhostCardSelect({ label: 'First Ghost Card' });
      expect(hideFullScreenModalSpy).to.have.been.calledWith('GHOST_CARD_MODAL_ID');
      expect(onSelectGhostCardStub).to.have.been.calledWith('First Ghost Card');
    });

    it('should hide modal when cancel button is clicked', () => {
      wrapper = createComponent();
      wrapper.find('GhostCardList').getElement().props.onCancel();
      expect(hideFullScreenModalSpy).to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const ghostCards = [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      },
      {
        savedCreditCardId: 'Second Ghost Card',
        type: 'GHOST_CARD',
        name: 'Second Ghost Card',
        isExpired: false
      }
    ];
    const defaultProps = {
      ghostCards,
      onSelectGhostCard: onSelectGhostCardStub,
      selectedCardId: '',
      disabled: false
    };

    return shallow(<GhostCard {..._.merge({}, defaultProps, props)} />);
  };
});
