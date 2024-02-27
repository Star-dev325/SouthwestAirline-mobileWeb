import {
  isDynamicWaiverEligible,
  isWithinDynamicWaiverDateRange,
  isWithinDynamicWaiverAlternativeCities
} from 'src/airChange/helpers/dynamicWaiverHelper';

describe('DynamicWaiverHelper', () => {
  let dynamicWaivers, formData, selectedBounds;

  beforeEach(() => {
    formData = {
      departureAndReturnDate: {
        departureDate: '2018-07-16',
        returnDate: '2018-07-31'
      },
      from: 'ATL',
      to: 'BOS'
    };
    dynamicWaivers = [
      {
        alternativeDepartureCities: ['PDV', 'MHT', 'ATL'],
        alternativeArrivalCities: ['BOS'],
        calculatedStartDate: '2018-07-16',
        calculatedEndDate: '2018-07-31',
        flightType: 'DEPARTURE'
      },
      {
        alternativeDepartureCities: ['BOS'],
        alternativeArrivalCities: ['ABI', 'PDV', 'MHT', 'ATL'],
        calculatedStartDate: '2018-07-16',
        calculatedEndDate: '2018-08-03',
        flightType: 'RETURN'
      }
    ];
    selectedBounds = {
      firstbound: true,
      secondbound: true
    };
  });

  context('isDynamicWaiverEligible', () => {
    it('should return true when the selected station and date are protected under dynamic waiver', () => {
      expect(isDynamicWaiverEligible(dynamicWaivers, formData, selectedBounds)).to.be.true;
    });

    it('should return false when the selected station is not under dynamic waiver protection', () => {
      formData.from = 'DAL';
      dynamicWaivers[0].alternativeDepartureCities = ['AUS', 'HOU'];
      expect(isDynamicWaiverEligible(dynamicWaivers, formData, selectedBounds)).to.be.false;
    });

    it('should return false when the selected date is not under dynamic waiver protection', () => {
      formData.departureAndReturnDate = {
        departureDate: '2018-07-15',
        returnDate: '2018-07-31'
      };
      expect(isDynamicWaiverEligible(dynamicWaivers, formData, selectedBounds)).to.be.false;
    });
  });

  context('isWithinDynamicWaiverDateRange', () => {
    context('one way', () => {
      it('should return false when user selected departure date is not under dynamic waiver protected', () => {
        selectedBounds = {
          firstbound: true
        };
        dynamicWaivers.pop();
        formData.departureAndReturnDate = {
          departureDate: '2018-07-15',
          returnDate: '2018-07-31'
        };
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return true when user selected departure date is under dynamic waiver protected', () => {
        selectedBounds = {
          firstbound: true
        };
        dynamicWaivers.pop();
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });
    });

    context('round trip', () => {
      it('should return false when user change departure date is not protected under dynamic waiver', () => {
        formData.departureAndReturnDate = {
          departureDate: '2018-07-15',
          returnDate: '2018-07-31'
        };
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return false when user change returning date is not protected under dynamic waiver', () => {
        formData.departureAndReturnDate = {
          departureDate: '2018-07-16',
          returnDate: '2018-08-05'
        };
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return true when user selected inbound and date and stations are under dynamic waiver protected', () => {
        selectedBounds.firstbound = false;
        formData.from = 'BOS';
        formData.to = 'ATL';
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });

      it('should return true when user selected outbound and date and stations are under dynamic waiver protected', () => {
        selectedBounds.secondbound = false;
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });

      it('should return true when the selected trip date is protected under dynamic waiver', () => {
        expect(isWithinDynamicWaiverDateRange(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });
    });
  });

  context('isWithinDynamicWaiverAlternativeCities', () => {
    context('one way', () => {
      it('should return false when user selected departure station is not under dynamic waiver protected', () => {
        selectedBounds = {
          firstbound: true
        };
        dynamicWaivers.pop();
        formData.from = 'DAL';
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return true when user selected departure station is under dynamic waiver protected', () => {
        selectedBounds = {
          firstbound: true
        };
        dynamicWaivers.pop();
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });
    });

    context('round trip', () => {
      it('should return false when user change departure station is not protected under dynamic waiver', () => {
        formData.from = 'DAL';
        dynamicWaivers[0].alternativeDepartureCities = ['AUS', 'HOU'];
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return true when alternativeDepartureCities is empty array', () => {
        formData.from = 'DAL';
        dynamicWaivers[0].alternativeDepartureCities = [];
        dynamicWaivers[1].alternativeArrivalCities = [];
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });

      it('should return true when alternativeArrivalCities is empty array', () => {
        formData.to = 'DAL';
        dynamicWaivers[0].alternativeArrivalCities = [];
        dynamicWaivers[1].alternativeDepartureCities = [];
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });

      it('should return false when user change returning station is not protected under dynamic waiver', () => {
        formData.to = 'DAL';
        dynamicWaivers[1].alternativeArrivalCities = ['AUS', 'HOU'];
        expect(isDynamicWaiverEligible(dynamicWaivers, formData, selectedBounds)).to.be.false;
      });

      it('should return true when station is under dynamic waiver protect', () => {
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });

      it('should only return result based on inbound selection if out bound is partially flown ', () => {
        dynamicWaivers.pop();
        expect(isWithinDynamicWaiverAlternativeCities(dynamicWaivers, formData, selectedBounds)).to.be.true;
      });
    });
  });
});
