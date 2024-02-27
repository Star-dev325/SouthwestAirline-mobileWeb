import { storiesOf } from '@storybook/react';
import React from 'react';
import CarTypeStrip from 'src/carBooking/components/carTypeStrip';

const carResults = {
  ECONOMY: {
    lowestPrice: 2000,
    isAllVendorUnavailable: false
  },
  COMPACT: {
    lowestPrice: 0,
    isAllVendorUnavailable: true
  },
  MIDSIZE: {
    lowestPrice: 6500,
    isAllVendorUnavailable: false
  },
  FULLSIZE: {
    lowestPrice: 8700,
    isAllVendorUnavailable: false
  },
  PREMIUM: {
    lowestPrice: 0,
    isAllVendorUnavailable: true
  },
  SUV: {
    lowestPrice: 9600,
    isAllVendorUnavailable: false
  },
  LUXURY: {
    lowestPrice: 0,
    isAllVendorUnavailable: true
  },
  MINIVAN: {
    lowestPrice: 7800,
    isAllVendorUnavailable: false
  },
  CONVERTIBLE: {
    lowestPrice: 0,
    isAllVendorUnavailable: true
  },
  VAN: {
    lowestPrice: 0,
    isAllVendorUnavailable: true
  }
};

storiesOf('components/carTypeStrip', module).add('default', () => {
  return <CarTypeStrip carResults={carResults} selectedCarType="MIDSIZE" onCarTypeChanged={() => {}} />;
});
