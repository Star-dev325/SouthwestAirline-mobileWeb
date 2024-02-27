module.exports = {
  numberOfPassengers: 2,
  products: [
    {
      productId:
        'VFpON1JOUnxBbWVyaWNhL0NoaWNhZ298MjAxNjA4MjUwNjEwLDIwMTYwODI1MDgyMHxEQUwtTURXfFdONTA0fFR8NTg5OHw1ODk4fDB8QURUfDczVw==',
      bookingCode: 'T',
      totalCents: 5898,
      currencyPriceDetails: {
        baseFareCents: 4175,
        taxCents: 313,
        discountedBaseFareCents: 4175,
        segmentFees: [
          {
            passengerFacilityChargeCents: 450,
            securityFeeCents: 560,
            segmentFeeCents: 400
          }
        ]
      }
    }
  ],
  priceDifference: {
    amountDueCents: 0,
    projectedTravelFundsAmountCents: 70700,
    refundAmount: {
      refundableAmountCents: 12496,
      nonrefundableAmountCents: 58204
    },
    actionableRefundAmount: {
      refundableAmountCents: 10796,
      nonrefundableAmountCents: 58204
    },
    priceChangeType: 'OVERAGE'
  },
  originalTicket: {
    availableCents: 82496,
    availablePoints: 0
  },
  actionableOriginalTicket: {
    availableCents: 80796,
    availablePoints: 0
  },
  priceSearchTotals: {
    verifyPriceChange: false,
    requestedAmountCents: 5900,
    requestedAmountPoints: 0,
    priceTotalAmountCents: 5898,
    priceTotalAmountPoints: 0,
    currencyPriceDetails: {
      baseFareCents: 4175,
      taxCents: 1723,
      discountedBaseFareCents: 4175,
      segmentFees: [
        {
          passengerFacilityChargeCents: 450,
          securityFeeCents: 560,
          segmentFeeCents: 400
        }
      ]
    }
  }
};
