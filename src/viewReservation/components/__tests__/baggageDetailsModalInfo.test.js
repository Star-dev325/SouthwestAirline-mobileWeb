import { render } from '@testing-library/react';
import React from 'react';
import BaggageDetailsModalInfo from 'src/viewReservation/components/baggageDetailsModalInfo';
import { getModifyBaggageDetailsMockData } from 'test/builders/model/reservationDetailBuilder';

describe('BaggageDetailsModalInfo', () => {
  it('should render the component correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const {
      modalDetails: { infoList }
    } = getModifyBaggageDetailsMockData();
    const defaultProps = { modalInfo: infoList[0] };
    const finalProps = { ...defaultProps, ...props };

    return render(<BaggageDetailsModalInfo {...finalProps} />);
  };
});
