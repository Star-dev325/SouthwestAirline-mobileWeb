import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import i18n from '@swa-ui/locale';
import { Provider } from 'react-redux';
import ApplyRapidRewardsForm from 'src/airBooking/components/applyRapidRewardsForm';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('ApplyRapidRewardsForm', () => {
  let onSubmitStub;

  beforeEach(() => {
    const noop = () => {};

    onSubmitStub = jest.fn(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const applyRapidRewardsFormComponent = createComponent();

    expect(applyRapidRewardsFormComponent.baseElement).toMatchSnapshot();
  });

  it('should call onSubmit', () => {
    const { container } = createComponent();
    const submitButton = container.querySelector('.apply-points-button');

    fireEvent.click(submitButton);
    expect(onSubmitStub).toHaveBeenCalled();
  });

  it('should display disabled button with Apply Points text when totalPointsApplied is null and radioOption is not selected', () => {
    const { container } = createComponent({
      radioOptionSelected: false,
      totalPointsApplied: null
    });

    expect(container.querySelector('.points-button-disabled').textContent).toEqual(
      i18n('SPLIT_PAY_PAGE__APPLY_POINTS_BUTTON')
    );
  });

  it('should display enabled Apply Points button when totalPointsApplied object is null and radioOption is selected', () => {
    const { container } = createComponent({
      radioOptionSelected: true,
      totalPointsApplied: null
    });

    expect(container.querySelector('.apply-points-button').textContent).toEqual(
      i18n('SPLIT_PAY_PAGE__APPLY_POINTS_BUTTON')
    );
  });

  it('should display Points applied disabled button if response has totalPointsApplied object and radioOption is selected', () => {
    const { container } = createComponent({
      radioOptionSelected: true,
      totalPointsApplied: {
        moneyApplied: '20$',
        pointsApplied: '2000 PTS'
      }
    });

    expect(container.querySelector('.points-button-disabled').textContent).toEqual(
      i18n('SPLIT_PAY_FORM__POINTS_APPLIED_TEXT')
    );
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      isWebView: false,
      onSubmit: onSubmitStub,
      totalPointsApplied: null
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <ApplyRapidRewardsForm {...{ ...defaultProps, ...props }} />
      </Provider>
    );
  };
});
