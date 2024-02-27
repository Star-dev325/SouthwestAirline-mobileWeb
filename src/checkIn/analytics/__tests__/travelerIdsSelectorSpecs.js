import { hasMultipleBoardingPasses as getTravelerIds } from 'src/checkIn/analytics/travelerIdsSelector';

describe('travelerId selector', () => {
  let multiplePax;
  let expectedMultiPaxResult;
  let singlePax;
  let expectedSinglePaxResult;

  beforeEach(() => {
    multiplePax = {
      app: {
        checkIn: {
          checkInViewBoardingPassPage: {
            mobileBoardingPassViewPage: {
              mobileBoardingPassView: [
                {
                  passenger: {
                    travelerId: '2401DC6E00009715'
                  }
                },
                {
                  passenger: {
                    travelerId: '2401DC6E00009716'
                  }
                },
                {
                  passenger: {
                    travelerId: '2401DC6E00009717'
                  }
                }
              ]
            }
          }
        }
      }
    };

    singlePax = {
      app: {
        checkIn: {
          checkInViewBoardingPassPage: {
            mobileBoardingPassViewPage: {
              mobileBoardingPassView: [
                {
                  passenger: {
                    travelerId: '2401DC6E00009715'
                  }
                }
              ]
            }
          }
        }
      }
    };

    expectedMultiPaxResult = { selectedMultipleTravelers: true };

    expectedSinglePaxResult = { selectedMultipleTravelers: false };
  });
  it('should return true with more than one unique traveler id', () => {
    const result = getTravelerIds(multiplePax, []);

    expect(result).to.deep.equal(expectedMultiPaxResult);
  });

  it('should return false with only one traveler', () => {
    const result = getTravelerIds(singlePax, []);

    expect(result).to.deep.equal(expectedSinglePaxResult);
  });
});
