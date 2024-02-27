import { sandbox } from 'sinon';
import { createComponent } from 'test/unit/helpers/testUtils';
import CheckInAPISVisaForm from 'src/checkIn/components/checkInAPISVisaForm';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();

describe('checkInAPISVisaForm', () => {
  const defaultProps = {
    formId: 'formId',
    initialFormData: {
      country: 'AL',
      expiration: '2018-11-17',
      issuedBy: 'AS',
      number: 'number'
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
      const wrapper = createComponent(CheckInAPISVisaForm, { props: defaultProps });

      const pageHeaderWithButtons = wrapper.find('PageHeaderWithButtons');

      expect(pageHeaderWithButtons.find('.action-bar--container')).to.have.text('Visa');
      expect(pageHeaderWithButtons.find('button').at(0)).to.have.text('Cancel');
      expect(pageHeaderWithButtons.find('button').at(1)).to.have.text('Done');

      expect(wrapper.find('FormInputField').props()).to.contains({
        name: 'number',
        value: 'number',
        placeholder: 'Visa Number'
      });

      expect(wrapper.find('FormNavItemField').at(0).props()).to.contains({
        name: 'country',
        value: 'Albania - AL',
        placeholder: 'Visa Country'
      });

      expect(wrapper.find('FormNavItemField').at(1).props()).to.contains({
        name: 'issuedBy',
        value: 'American Samoa - AS',
        placeholder: 'Country issued by'
      });

      expect(wrapper.find('FormDatePickerField')).to.have.prop('name', 'expiration');
    });
  });

  context('click event', () => {
    it('should call oncancel function when click left button', () => {
      const wrapper = createComponent(CheckInAPISVisaForm, { props: defaultProps });

      click(wrapper.find('button').at(0));

      expect(defaultProps.onCancel).to.have.been.called;
    });
  });
});
