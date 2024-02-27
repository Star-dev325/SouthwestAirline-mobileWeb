import {
  transformCarResults,
  filterOutNonSelectedVendors
} from 'src/carBooking/transformers/carShoppingResultsTransformer';

describe('carShoppingResultsTransformer', () => {
  context('transformCarResult', () => {
    it('should contain all of the car sizes', () => {
      const result = transformCarResults([], [], { rapidRewardsPartners: ['Avis'] });

      expect(result).to.have.property('ECONOMY');
      expect(result).to.have.property('COMPACT');
      expect(result).to.have.property('MIDSIZE');
      expect(result).to.have.property('FULLSIZE');
      expect(result).to.have.property('PREMIUM');
      expect(result).to.have.property('MIDSIZE_SUV');
      expect(result).to.have.property('STANDARD_SUV');
      expect(result).to.have.property('FULLSIZE_SUV');
      expect(result).to.have.property('LUXURY');
      expect(result).to.have.property('MINIVAN');
      expect(result).to.have.property('CONVERTIBLE');
      expect(result).to.have.property('FULLSIZE_VAN');
    });

    context('isAllVendorUnavailable', () => {
      it('should return false if vendor have products for special type', () => {
        const economyOne = createCarProduct('ECONOMY', 10, 'Avis');
        const economyTwo = createCarProduct('ECONOMY', 20, 'DOLLAR');
        const apiResponse = {
          carProducts: [economyOne, economyTwo]
        };

        const result = transformCarResults(apiResponse, [], {
          allOthers: ['EZ', 'DOLLAR'],
          rapidRewardsPartners: ['Avis']
        });

        expect(result.ECONOMY.isAllVendorUnavailable).to.be.false;
      });

      it("should return true if vendor doesn't have products for special type", () => {
        const economyOne = createCarProduct('ECONOMY', 10, 'Avis');
        const economyTwo = createCarProduct('ECONOMY', 20, 'DOLLAR');
        const apiResponse = {
          carProducts: [economyOne, economyTwo]
        };

        const result = transformCarResults(apiResponse, [], {
          allOthers: ['EZ', 'DOLLAR'],
          rapidRewardsPartners: ['Avis']
        });

        expect(result.LUXURY.isAllVendorUnavailable).to.be.true;
      });
    });

    context('isRapidRewardsPartner', () => {
      it('should return true if vendor name is in the rapidRewardPartners list', () => {
        const economyOne = createCarProduct('ECONOMY', 0, 'Avis');
        const apiResponse = {
          carProducts: [economyOne]
        };
        const allVendors = { rapidRewardsPartners: ['Avis'] };

        const result = transformCarResults(apiResponse, [], allVendors);

        expect(result.ECONOMY.allVehicles[0].isRapidRewardsPartner).to.be.true;
      });

      it('should return false if vendor name is not in the rapidRewardPartners list', () => {
        const economyOne = createCarProduct('ECONOMY', 0, 'Avis');
        const apiResponse = {
          carProducts: [economyOne]
        };
        const allVendors = { rapidRewardsPartners: ['Hertz'] };

        const result = transformCarResults(apiResponse, [], allVendors);

        expect(result.ECONOMY.allVehicles[0].isRapidRewardsPartner).to.be.false;
      });

      context('sorting', () => {
        it('should put rapid rewards partners on top and sort within partners by price (ascending)', () => {
          const economyOne = createCarProduct('ECONOMY', 10, 'Avis');
          const economyTwo = createCarProduct('ECONOMY', 100, 'Dollar');
          const economyThree = createCarProduct('ECONOMY', 90, 'Hertz');
          const economyFour = createCarProduct('ECONOMY', 6, 'National');
          const apiResponse = {
            carProducts: [economyOne, economyTwo, economyThree, economyFour]
          };
          const allVendors = { rapidRewardsPartners: ['Hertz', 'Dollar'], allOthers: ['National', 'Avis'] };

          const result = transformCarResults(apiResponse, [], allVendors);

          expect(result.ECONOMY.allVehicles[0].vendorName).to.equal('Hertz');
          expect(result.ECONOMY.allVehicles[1].vendorName).to.equal('Dollar');
          expect(result.ECONOMY.allVehicles[2].vendorName).to.equal('National');
          expect(result.ECONOMY.allVehicles[3].vendorName).to.equal('Avis');
        });
      });
    });

    it('should group results by vehicle type', () => {
      const economyOne = createCarProduct('ECONOMY');
      const economyTwo = createCarProduct('ECONOMY');
      const minivan = createCarProduct('MINIVAN');
      const apiResponse = {
        carProducts: [economyOne, minivan, economyTwo]
      };

      const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

      expect(result.ECONOMY.allVehicles).to.have.lengthOf(2);
      expect(result.MINIVAN.allVehicles).to.have.lengthOf(1);
    });

    it('should map vehicle type when given some special types', () => {
      const economy = createCarProduct('ECONOMY');
      const fullsizeSUV = createCarProduct('FULL_SIZE_SUV');
      const van = createCarProduct('VAN');

      const apiResponse = {
        carProducts: [economy, fullsizeSUV, van]
      };

      const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

      expect(result.ECONOMY.allVehicles).to.have.lengthOf(1);
      expect(result.FULLSIZE_SUV.allVehicles).to.have.lengthOf(1);
      expect(result.FULLSIZE_VAN.allVehicles).to.have.lengthOf(1);
    });

    context('lowestPrice', () => {
      it('should take it from rates, if rates exist', () => {
        const rates = [
          {
            cents: 8,
            quantity: 0,
            per: 'DAY'
          }
        ];
        const dailyRateCents = 10;

        const economyOne = createCarProduct('ECONOMY', dailyRateCents, 'Avis', 0, rates);
        const economyTwo = createCarProduct('ECONOMY', 20);
        const apiResponse = {
          carProducts: [economyOne, economyTwo]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        expect(result.ECONOMY.lowestPrice).to.equal(8);
      });

      it("should take it from dailyRateCents, if rates don't exist", () => {
        const economyOne = createCarProduct('ECONOMY', 10);
        const economyTwo = createCarProduct('ECONOMY', 20);
        const apiResponse = {
          carProducts: [economyOne, economyTwo]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        expect(result.ECONOMY.lowestPrice).to.equal(10);
      });

      it("should get real lowest price, if some vendors don't have products", () => {
        const economyOne = createCarProduct('ECONOMY', 10, 'Avis');
        const economyTwo = createCarProduct('ECONOMY', 20, 'DOLLAR');
        const apiResponse = {
          carProducts: [economyOne, economyTwo]
        };

        const result = transformCarResults(apiResponse, [], {
          allOthers: ['EZ', 'DOLLAR'],
          rapidRewardsPartners: ['Avis']
        });

        expect(result.ECONOMY.lowestPrice).to.equal(10);
      });
    });

    context('car products', () => {
      it('should have vendor name', () => {
        const avisCarProduct = createCarProduct('ECONOMY', 10, 'Avis');
        const apiResponse = {
          carProducts: [avisCarProduct]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(1);
        expect(allVehicles[0].vendorName).to.equal('Avis');
      });

      it('should contain the first result from appliedDiscounts because you can apply only one promo code per vendor', () => {
        const economyOne = createCarProduct('ECONOMY', 10, 'Avis');

        economyOne.appliedDiscounts = [
          {
            code: '79315',
            type: 'CORPORATE_RATE'
          }
        ];

        const apiResponse = {
          carProducts: [economyOne]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        const allVehiclesForEconomy = result.ECONOMY.allVehicles;

        expect(allVehiclesForEconomy).to.have.lengthOf(1);
        expect(allVehiclesForEconomy[0].appliedDiscount).to.deep.equal({
          code: '79315',
          type: 'CORPORATE_RATE'
        });
      });

      context('price per day', () => {
        it('should take price per day from rates if daily rate exists', () => {
          const dailyRateCentsWithTaxes = 10;
          const totalCentsWithTaxes = 110;
          const rates = [
            {
              cents: 118186,
              quantity: 0,
              per: 'MONTH'
            },
            {
              cents: 1000,
              quantity: 0,
              per: 'DAY'
            }
          ];
          const avisCarProduct = createCarProduct(
            'ECONOMY',
            dailyRateCentsWithTaxes,
            'Avis',
            totalCentsWithTaxes,
            rates
          );
          const apiResponse = {
            carProducts: [avisCarProduct]
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles).to.have.lengthOf(1);
          expect(allVehicles[0].pricePerDayCents).to.equal(1000);
        });

        it("should use dailyRateCentsWithTaxes if the rates doesn't exist", () => {
          const dailyRateCentsWithTaxes = 10;
          const totalCentsWithTaxes = 110;
          const avisCarProduct = createCarProduct('ECONOMY', dailyRateCentsWithTaxes, '', totalCentsWithTaxes);
          const apiResponse = {
            carProducts: [avisCarProduct]
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles).to.have.lengthOf(1);
          expect(allVehicles[0].pricePerDayCents).to.equal(dailyRateCentsWithTaxes);
        });
      });

      it('should have total price with tax', () => {
        const totalCentsWithTaxes = 186842;
        const avisCarProduct = createCarProduct('ECONOMY', 0, '', totalCentsWithTaxes);
        const apiResponse = {
          carProducts: [avisCarProduct]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(1);
        expect(allVehicles[0].totalCentsWithTaxes).to.equal(totalCentsWithTaxes);
      });

      it('should have productId', () => {
        const avisCarProduct = createCarProduct('ECONOMY', 0, '', 0, [], 'PRODUCT-ID');
        const apiResponse = {
          carProducts: [avisCarProduct]
        };

        const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(1);
        expect(allVehicles[0].productId).to.equal('PRODUCT-ID');
      });

      it('should have object for each vendor', () => {
        const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');
        const apiResponse = {
          carProducts: [avisCarProduct]
        };

        const result = transformCarResults(apiResponse, [], {
          rapidRewardsPartners: ['Avis', 'Hertz', 'Advantage'],
          allOthers: ['Budget', 'Alamo']
        });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(5);
        expect(allVehicles[0].vendorName).to.equal('Avis');
        expect(allVehicles[1].vendorName).to.equal('Hertz');
        expect(allVehicles[2].vendorName).to.equal('Advantage');
        expect(allVehicles[3].vendorName).to.equal('Budget');
        expect(allVehicles[4].vendorName).to.equal('Alamo');
      });

      context('isUnavailable', () => {
        it('should be false if vendor is in apiResponse and list of all vendors', () => {
          const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');
          const apiResponse = {
            carProducts: [avisCarProduct]
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles[0].isUnavailable).to.be.false;
        });

        it('should be true if vendor is not in apiResponse and but in the list of all vendors', () => {
          const apiResponse = {
            carProducts: []
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles[0].isUnavailable).to.be.true;
        });
      });

      context('promoCodeApplied', () => {
        it('should return true if the car product does not have empty applied discounts array', () => {
          const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');

          avisCarProduct.appliedDiscounts = [{}];
          const apiResponse = {
            carProducts: [avisCarProduct]
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles[0].promoCodeApplied).to.be.true;
        });

        it('should return false if the car product has empty applied discounts array', () => {
          const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');

          avisCarProduct.appliedDiscounts = [];
          const apiResponse = {
            carProducts: [avisCarProduct]
          };

          const result = transformCarResults(apiResponse, [], { rapidRewardsPartners: ['Avis'] });

          const { allVehicles } = result.ECONOMY;

          expect(allVehicles[0].promoCodeApplied).to.be.false;
        });
      });
    });

    context('car vendor image', () => {
      it('should contain vendor images', () => {
        const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');
        const apiResponse = {
          carProducts: [avisCarProduct]
        };
        const carVendorImages = [
          {
            vendorName: 'Advantage',
            logoImage: 'imageUrlForAdvantage',
            logoImageAltText: 'Advantage'
          },
          {
            vendorName: 'Avis',
            logoImage: 'imageUrlForAvis',
            logoImageAltText: 'Avis',
            rrIncentiveText: 'Earn up to 600 points'
          }
        ];

        const result = transformCarResults(apiResponse, carVendorImages, { rapidRewardsPartners: ['Avis'] });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(1);
        expect(allVehicles[0].imageUrl).to.equal('imageUrlForAvis');
      });

      it('should contain incentive text', () => {
        const avisCarProduct = createCarProduct('ECONOMY', 0, 'Avis');
        const apiResponse = {
          carProducts: [avisCarProduct]
        };
        const carVendorImages = [
          {
            vendorName: 'Avis',
            logoImage: 'imageUrlForAvis',
            logoImageAltText: 'Avis',
            rrIncentiveText: 'Earn up to 600 points'
          }
        ];

        const result = transformCarResults(apiResponse, carVendorImages, { rapidRewardsPartners: ['Avis'] });

        const { allVehicles } = result.ECONOMY;

        expect(allVehicles).to.have.lengthOf(1);
        expect(allVehicles[0].incentiveText).to.equal('Earn up to 600 points');
      });
    });
  });

  context('filterOutNonSelectedVendors', () => {
    it('should include all vendors if search request has SHOP_ALL for vendors', () => {
      const allCarVendors = [{ vendorId: 'BUDGET' }, { vendorId: 'AVIS' }, { vendorId: 'ZA' }];
      const userSelection = 'Shop all';

      const result = filterOutNonSelectedVendors(userSelection, allCarVendors);

      expect(result).to.have.lengthOf(3);
      expect(result).to.equal(allCarVendors);
    });

    it("should exclude vendors that weren't selected by user when they are passed in as an array", () => {
      const allCarVendors = [{ vendorId: 'BUDGET' }, { vendorId: 'AVIS' }, { vendorId: 'ZA' }];
      const userSelection = [{ vendorId: 'ZA' }];

      const result = filterOutNonSelectedVendors(userSelection, allCarVendors);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.equal({ vendorId: 'ZA' });
    });

    it("should exclude vendors that weren't selected by user when they are passed in as a string", () => {
      const allCarVendors = [{ vendorId: 'BUDGET' }, { vendorId: 'ZA' }, { vendorId: 'AVIS' }];
      const userSelection = 'ZA,AVIS';

      const result = filterOutNonSelectedVendors(userSelection, allCarVendors);

      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.deep.equal({ vendorId: 'ZA' });
      expect(result[1]).to.deep.equal({ vendorId: 'AVIS' });
    });
  });
});

function createCarProduct(vehicleType, dailyRateCents, vendor, totalCentsWithTaxes, rates, productId) {
  productId = productId || 'product-id';
  rates = rates || undefined;
  totalCentsWithTaxes = totalCentsWithTaxes || 10;
  vendor = vendor || 'Avis';
  dailyRateCents = dailyRateCents || 10;
  vehicleType = vehicleType || 'ECONOMY';

  return {
    productId,
    vendor,
    vehicleType,
    price: {
      dailyRateCents,
      totalCentsWithTaxes,
      rates
    }
  };
}
