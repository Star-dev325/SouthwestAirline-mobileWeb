import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';
import SpecialAssistanceForm from 'src/shared/form/components/specialAssistanceForm';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('SpecialAssistanceForm', () => {
  let goBackMock;
  let onChangeMock;
  let onSubmitMock;
  let updateFormDataValueFnMock;

  beforeEach(() => {
    goBackMock = jest.fn();
    onChangeMock = jest.fn();
    onSubmitMock = jest.fn();
    updateFormDataValueFnMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render form components', () => {
    it('should render the correct form fields', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });

    it('should call goBackMock when click CANCEL button', () => {
      const { queryByText } = createPageComponent();
      const cancelButton = queryByText(i18n('SHARED__BUTTON_TEXT__CANCEL'));

      fireEvent.click(cancelButton);

      expect(goBackMock).toHaveBeenCalled();
    });
  });

  describe('prefill behavior', () => {
    it('should prefill when the user has already entered data for this form', () => {
      const { container } = createPageComponent({
        initialFormData: {
          ASSISTANCE_ANIMAL: false,
          BLIND: true,
          COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
          DEAF: false,
          DRY_BATTERIES: null,
          PEANUT_DUST_ALLERGY: true,
          PORTABLE_OXYGEN_CONCENTRATOR: false,
          WET_BATTERIES: '2',
          WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
          WHEELCHAIR_STOWAGE: 'NONE'
        }
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('form submission', () => {
    it('should call onSubmitMock when click SAVE button', () => {
      const { container, queryByText } = createPageComponent();
      const blindCheckbox = queryByText(i18n('SHARED__SPECIAL_ASSISTANCE__AIRPORT_ASSISTANCE_SEGMENT_LABEL'));

      fireEvent.click(blindCheckbox);
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      formId: 'FAKE_FORM_ID',
      goBack: goBackMock,
      initialFormData: DEFAULT_FIELD_VALUES,
      onChange: onChangeMock,
      onSubmit: onSubmitMock,
      updateFormDataValueFn: updateFormDataValueFnMock
    };
    const mergedProps = { ...defaultProps, ...props };

    return createComponent(SpecialAssistanceForm, { props: mergedProps });
  };
});
