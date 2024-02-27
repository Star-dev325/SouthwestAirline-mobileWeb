import { sandbox } from 'sinon';
import { createComponent } from 'test/unit/helpers/testUtils';
import CheckInAPISPermanentResidentCardForm from 'src/checkIn/components/checkInAPISPermanentResidentCardForm';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('checkInAPISPermanentResidentCardPage', () => {
  const defaultProps = {
    formId: 'formId',
    initialFormData: {
      type: 'RESIDENT_ALIEN_CARD',
      number: 'abc-d22-222-222-222',
      issuedBy: 'AS',
      expiration: '2019-11-17'
    }
  };

  beforeEach(() => {
    defaultProps.onSubmit = sinon.stub();
    defaultProps.onCancel = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when Initial the page with empty field', () => {
    beforeEach(() => {});

    it('should have  page header and fields when entering page with value', () => {
      const wrapper = createComponent(CheckInAPISPermanentResidentCardForm, { props: defaultProps });

      const pageHeaderWithButtons = wrapper.find('PageHeaderWithButtons');

      expect(pageHeaderWithButtons.find('.action-bar--container')).to.have.text('Green Card');
      expect(pageHeaderWithButtons.find('button').at(0)).to.have.text('Cancel');
      expect(pageHeaderWithButtons.find('button').at(1)).to.have.text('Done');

      expect(wrapper.find('FormSelectWithPlaceHolderField').props()).to.contains({
        name: 'type',
        value: 'RESIDENT_ALIEN_CARD',
        placeholder: 'Type'
      });

      expect(wrapper.find('FormInputField').at(0).props()).to.contains({
        name: 'number',
        value: 'abc-d22-222-222-222',
        placeholder: 'Number'
      });

      expect(wrapper.find('FormNavItemField').at(0).props()).to.contains({
        name: 'issuedBy',
        value: 'American Samoa - AS',
        placeholder: 'Country issued by:'
      });

      expect(wrapper.find('FormDatePickerField')).to.have.prop('name', 'expiration');
    });

    it('should have the FormSelectWithPlaceHolderField with two type of options', () => {
      const wrapper = createComponent(CheckInAPISPermanentResidentCardForm, { props: defaultProps });

      expect(wrapper.find('FormSelectWithPlaceHolderField').prop('options')).to.be.deep.equals([
        {
          label: i18n('CHECK_IN__PERMANENT_RESIDENT_CARD__RESIDENT_ALIEN_GREEN_CARD_LABEL'),
          value: 'RESIDENT_ALIEN_CARD'
        },
        {
          label: i18n('CHECK_IN__PERMANENT_RESIDENT_CARD__LABEL'),
          value: 'PERMANENT_RESIDENT_CARD'
        }
      ]);
    });
  });

  context('click event', () => {
    it('should call oncancel function when click left button', () => {
      const wrapper = createComponent(CheckInAPISPermanentResidentCardForm, { props: defaultProps });

      click(wrapper.find('button').at(0));

      expect(defaultProps.onCancel).to.have.been.called;
    });
  });
});
