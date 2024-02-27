import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import SinonModule from 'sinon';
import { Dialog } from 'src/shared/components/dialog';
import ButtonPopup from 'src/shared/components/popups/buttonPopup';
import VerticalLinksPopup from 'src/shared/components/popups/verticalLinksPopup';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();
const sinon = SinonModule.sandbox.create();

describe('Dialog', () => {
  let buttonProps, dialog, store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render two AbstractPopup component', () => {
    const wrapper = createComponent({
      dialog: {
        active: false,
        name: 'test-name',
        title: 'test title',
        message: 'test message',
        buttons: [
          {
            label: 'Return home',
            onClick: () => {}
          }
        ]
      }
    });

    expect(wrapper.find('AbstractPopup')).to.have.length(2);
  });

  context('ButtonPopup dialog with one button', () => {
    beforeEach(() => {
      buttonProps = {
        dialog: {
          active: true,
          name: 'test-name',
          title: 'test title',
          message: 'test message',
          buttons: [
            {
              label: 'Return home',
              onClick: () => {}
            }
          ]
        }
      };

      dialog = createComponent(buttonProps);
    });

    it('should create a button popup by default', () => {
      const defaultProps = { dialog: { active: true } };
      const buttonPopup = createComponent(defaultProps).find(ButtonPopup);

      expect(buttonPopup.prop('active')).to.be.true;
    });

    it('should have active props be true', () => {
      const buttonPopup = dialog.find(ButtonPopup);

      expect(buttonPopup.prop('active')).to.be.true;
    });

    it('should display dialog with correct title and message', () => {
      const popupTitle = dialog.find('.popup-title');

      expect(popupTitle).to.have.text('test title');

      const popupBody = dialog.find('.popup-body');

      expect(popupBody).to.have.text('test message');
    });

    it('should show button label', () => {
      const button = dialog.find('.button');

      expect(button).to.have.className('confirm-button');
      expect(button).to.have.text('Return home');
    });
  });

  context('ButtonPopup dialog with two buttons', () => {
    const onConfirmClick = sinon.stub();
    const onCloseClick = sinon.stub();

    beforeEach(() => {
      buttonProps = {
        dialog: {
          active: true,
          name: 'test-name',
          title: 'test title',
          message: 'test message',
          buttons: [
            {
              label: 'Confirm',
              onClick: onConfirmClick
            },
            {
              label: 'Close',
              onClick: onCloseClick
            }
          ]
        }
      };

      dialog = createComponent(buttonProps);
    });

    it('should contain two buttons', () => {
      const popupButtons = dialog.find('.button-popup');

      expect(popupButtons).to.have.lengthOf(2);

      expect(dialog.find('.confirm-button')).to.have.text('Confirm');
      expect(dialog.find('.close-button')).to.have.text('Close');
    });

    it('should invoke callback when click button', () => {
      const confirmButton = dialog.find('.confirm-button');
      const closeButton = dialog.find('.close-button');

      click(confirmButton);
      expect(onConfirmClick).to.have.been.called;

      click(closeButton);
      expect(onCloseClick).to.have.been.called;
    });
  });

  context('VerticalPopup dialog', () => {
    let theVerticalPopup;

    beforeEach(() => {
      const verticalProps = {
        dialog: {
          active: true,
          name: 'test-name',
          title: 'test title',
          message: 'test message',
          contentView: 'some extra content',
          verticalLinks: {
            links: [{ label: 'Some link' }]
          },
          closeLabel: 'Specific close text'
        }
      };

      dialog = createComponent(verticalProps);
      theVerticalPopup = dialog.find(VerticalLinksPopup);
    });

    it('should show verticalLinksPopup', () => {
      expect(theVerticalPopup).to.be.present();
    });

    it('should show each link', () => {
      expect(theVerticalPopup.find('a')).to.contain.text('Some link');
    });

    it('should show custom close label', () => {
      expect(theVerticalPopup.find('button')).to.contain.text('Specific close text');
    });

    it('should show message', () => {
      expect(theVerticalPopup).to.contain.text('test message');
    });

    it('should show contentView', () => {
      expect(dialog).to.contain.text('some extra content');
    });

    it('should contain a data-qa element with name', () => {
      expect(dialog.find('[data-qa="test-name"]')).to.be.present();
    });

    it('should show title', () => {
      expect(dialog).to.contain.text('test title');
    });
  });

  const createComponent = (props) =>
    mount(
      <Provider store={store}>
        <Dialog {...props} />
      </Provider>
    );
});
