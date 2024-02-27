module.exports = {
  numberOfPassengers: 1,
  products: [
    {
      productId:
        'S0xBRVZ8QW1lcmljYS9OZXdfWW9ya3wyMDE2MDgwODA3MDUsMjAxNjA4MDgxMDU1fExHQS1EQUx8V04xOXxLfDU1NDk4fEFEVHw3M1c=',
      bookingCode: 'K',
      totalCents: 55498,
      currencyPriceDetails: {
        baseFareCents: 49942,
        taxCents: 3746,
        discountedBaseFareCents: 49942,
        segmentFees: [
          {
            passengerFacilityChargeCents: 450,
            securityFeeCents: 560,
            segmentFeeCents: 800
          }
        ]
      }
    }
  ],
  priceDifference: {
    amountDueCents: 1550,
    projectedTravelFundsAmountCents: 0,
    refundAmount: {
      refundableAmountCents: 0,
      nonrefundableAmountCents: 0
    },
    actionableRefundAmount: {
      refundableAmountCents: 0,
      nonrefundableAmountCents: 0
    },
    priceChangeType: 'SHORTAGE'
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
    requestedAmountCents: 55500,
    requestedAmountPoints: 0,
    priceTotalAmountCents: 55498,
    priceTotalAmountPoints: 0,
    currencyPriceDetails: {
      baseFareCents: 49942,
      taxCents: 5556,
      discountedBaseFareCents: 49942,
      segmentFees: [
        {
          passengerFacilityChargeCents: 450,
          securityFeeCents: 560,
          segmentFeeCents: 800
        }
      ]
    }
  }
};
