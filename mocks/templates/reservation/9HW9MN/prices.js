module.exports = {
  numberOfPassengers: 1,
  products: [
    {
      productId:
        'U0xBVVBOUk98QW1lcmljYS9OZXdfWW9ya3wyMDE2MDgwOTExNTUsMjAxNjA4MDkxNjQ1fExHQS1NRFcsTURXLURBTHxXTjI5NDcsV04zMjExfFN8MTc0OTh8QURUfDczVyw3M0g=',
      bookingCode: 'S',
      totalCents: 17498,
      currencyPriceDetails: {
        baseFareCents: 14175,
        taxCents: 1063,
        discountedBaseFareCents: 14175,
        segmentFees: [
          {
            passengerFacilityChargeCents: 450,
            securityFeeCents: 560,
            segmentFeeCents: 400
          },
          {
            passengerFacilityChargeCents: 450,
            securityFeeCents: 0,
            segmentFeeCents: 400
          }
        ]
      }
    }
  ],
  priceDifference: {
    amountDueCents: 0,
    projectedTravelFundsAmountCents: 36450,
    refundAmount: {
      refundableAmountCents: 36450,
      nonrefundableAmountCents: 0
    },
    actionableRefundAmount: {
      refundableAmountCents: 0,
      nonrefundableAmountCents: 0
    },
    priceChangeType: 'EVEN_EXCHANGE'
  },
  originalTicket: {
    availableCents: 53948,
    availablePoints: 0
  },
  actionableOriginalTicket: {
    availableCents: 17498,
    availablePoints: 0
  },
  priceSearchTotals: {
    verifyPriceChange: false,
    requestedAmountCents: 17500,
    requestedAmountPoints: 0,
    priceTotalAmountCents: 17498,
    priceTotalAmountPoints: 0,
    currencyPriceDetails: {
      baseFareCents: 14175,
      taxCents: 3323,
      discountedBaseFareCents: 14175,
      segmentFees: [
        {
          passengerFacilityChargeCents: 900,
          securityFeeCents: 560,
          segmentFeeCents: 800
        }
      ]
    }
  }
};
