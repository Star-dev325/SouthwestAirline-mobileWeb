import { render } from '@testing-library/react';
import React from 'react';
import BoardingPassBarcode from 'src/checkIn/components/boardingPassBarcode';

describe('BoardingPassBarcode', () => {
  describe('render boarding pass with assets', () => {
    it('should not display reservation assets if none of the flags("hasAList","hasAListPreferred","hasTsaPreCheck" and "showAirportLanes") are passed', () => {
      const { container } = createComponent({
        barcodeString: 'barcodeString'
      });

      expect(container.querySelectorAll('.mbp-barcode-reservation-assets--icon').length).toBe(0);
    });

    it('should display reservation assets if the flags("hasAList","hasAListPreferred","hasTsaPreCheck" and "showAirportLanes") are passed', () => {
      const { container } = createComponent({
        hasAList: true,
        hasAListPreferred: true,
        hasTsaPreCheck: true,
        showAirportLanes: true
      });

      expect(container.querySelectorAll('.mbp-barcode-reservation-assets--icon').length).toBe(4);
    });

    it('should display lap infant icon if isInfant is true', () => {
      const { container } = createComponent({
        barcodeString: 'barcodeString',
        isInfant: true
      });

      expect(container.querySelectorAll('.mbp-barcode-lap-infant').length).toBe(1);
    });

    it('should not display lap infant icon if isInfant is false', () => {
      const { container } = createComponent({
        barcodeString: 'barcodeString',
        isInfant: false
      });

      expect(container.querySelectorAll('.mbp-barcode-lap-infant').length).toBe(0);
    });
  });

  const createComponent = (props = {}) => render(<BoardingPassBarcode {...props} />);
});
