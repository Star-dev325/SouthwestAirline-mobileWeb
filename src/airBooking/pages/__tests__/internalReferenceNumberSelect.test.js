import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { InternalReferenceNumberSelect as InternalReferenceNumberSelectClass } from 'src/airBooking/pages/internalReferenceNumberSelect';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';

describe('internalReferenceNumberSelect', () => {
  let goBackStub;
  let pushStub;
  let updateSelectedIrnFnStub;

  beforeEach(() => {
    goBackStub = jest.fn();
    pushStub = jest.fn();
    updateSelectedIrnFnStub = jest.fn();
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  it('should have correct props for SearchableList', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should normalize items correctly', () => {
    const irnInfo = {
      companyInternalReferenceNumbers: [{ name: 'companyIrn', description: 'Company Description' }],
      travelerInternalReferenceNumbers: [{ name: 'travelerIrn', description: 'Traveler Description' }]
    };

    const { getByText } = createComponent({ irnInfo });

    expect(getByText('travelerIrn - Traveler Description')).toBeInTheDocument();
  });

  it('should fire the analytics satellite event with select irn', () => {
    const instance = React.createRef();
    const irnInfo = {
      companyInternalReferenceNumbers: [{ name: 'companyIrn', description: 'Company Description' }],
      travelerInternalReferenceNumbers: [{ name: 'travelerIrn', description: 'Traveler Description' }]
    };

    createComponent({ irnInfo, ref: instance });

    instance.current.componentDidMount();

    expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('select irn');
  });

  it('should show only irn name if description is missing', () => {
    const irnInfo = {
      companyInternalReferenceNumbers: [{ name: 'companyIrn' }],
      travelerInternalReferenceNumbers: [{ name: 'travelerIrn' }]
    };
    const { container, getByText } = createComponent({ irnInfo });

    expect(container.querySelectorAll('.list-group').length).toEqual(2);
    expect(getByText('companyIrn')).toBeInTheDocument();
  });

  it('should call updateSelectedIrnFn and goBack function if an irn is selected', () => {
    const instance = React.createRef();
    const selectedIrn = { value: 'selectedIrn' };

    createComponent({ ref: instance });

    instance.current._handleIrnSelection(selectedIrn);

    expect(updateSelectedIrnFnStub).toHaveBeenCalledWith(selectedIrn.value);
    expect(goBackStub).toHaveBeenCalled();
  });

  it('should call pushStub function upon calling _getAlternateNavItemLinkProps', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });

    instance.current._getAlternateNavItemLinkProps().onClick();

    expect(pushStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      goBack: goBackStub,
      push: pushStub,
      updateSelectedIrnFn: updateSelectedIrnFnStub,
      irnInfo: {
        irnRequired: false,
        alternateIrnAllowed: true
      }
    };
    const pageProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <InternalReferenceNumberSelectClass {...pageProps} />
      </Provider>
    );
  };
});
