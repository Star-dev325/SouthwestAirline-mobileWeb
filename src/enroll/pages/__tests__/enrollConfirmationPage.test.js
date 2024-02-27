import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { EnrollConfirmationPage } from 'src/enroll/pages/enrollConfirmationPage';
import i18n from '@swa-ui/locale';

describe('EnrollConfirmationPage', () => {
  it('should render welcome message', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render welcome message', () => {
    const { container } = createComponent();

    expect(container.querySelector('.enroll-confirmation-page')).not.toBeNull();
    expect(container.querySelector('.message--text').textContent).toEqual(`${i18n('ENROLL_WELCOME')}, Fred!`);
  });

  it('should render congratulations text', () => {
    const { container } = createComponent();

    expect(container.querySelector('.congratulation-text').textContent).toEqual(
      `${i18n('ENROLL_CONGRATULATION_TEXT_1')}®${i18n('ENROLL_CONGRATULATION_TEXT_2')}`
    );
  });

  it('should render full name and account number', () => {
    const { container } = createComponent();

    expect(container.querySelector('.enroll-confirmation-page--cards-user-info .username').textContent).toEqual(
      'Fred Flintstone'
    );
    expect(container.querySelector('.enroll-confirmation-page--cards-user-info .account-number').textContent).toEqual(
      '601005646'
    );
  });

  const createComponent = () => {
    const mockStore = createMockedFormStore();
    const noop = () => {};
    const defaultProps = {
      push: noop,
      personalInfo: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      },
      accountNumber: '601005646'
    };

    return render(
      <Provider store={mockStore}>
        <EnrollConfirmationPage {...defaultProps} />
      </Provider>
    );
  };
});
