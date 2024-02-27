jest.mock('branch-sdk', () => ({ data: jest.fn(() => {}) }));
jest.mock('src/chase/actions/chaseActions', () => ({ createChaseSession: jest.fn() }));
jest.mock('src/shared/helpers/browserObject', () => ({ location: { origin: 'http://local.swacorp.com' } }));

import '@testing-library/jest-dom/extend-expect';
import branch from 'branch-sdk';
import { createChaseSession } from 'src/chase/actions/chaseActions';
import { render } from '@testing-library/react';
import React from 'react';
import { ChaseOfferEmailPage } from 'src/branch/pages/chaseOfferEmailPage';
import waitFor from 'test/unit/helpers/waitFor';

describe('ChaseOfferEmailPage', () => {
  const mockChaseSessionId = 'MOCK_SESSION_ID';
  const mockCell = 'MOCK_CELL';
  const mockRapidRewardsNumber = 'MOCK_RAPID_REWARDS_NUMBER';
  const mockSpid = 'MOCK_SPID';
  const mockTargetUrl = 'MOCK_TARGET_URL';
  const mockBaseDataParsed = {
    CELL: mockCell,
    encryptedRapidRewardsNumber: mockRapidRewardsNumber,
    isChaseCombo: 'false',
    SPID: mockSpid,
    targetUrl: mockTargetUrl
  };
  const REF = 'MWEB';
  const noop = () => {};
  let createChaseSessionStub;
  let openStub;
  let pushStub;

  beforeEach(() => {
    branch.data = jest.fn(noop);
    openStub = jest.spyOn(window, 'open').mockImplementation(noop);
    pushStub = jest.fn();
    createChaseSessionStub = createChaseSession.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  describe('when branch', () => {
    describe('returns valid data', () => {
      describe('when isChaseCombo is false', () => {
        it('should create Chase session and open Chase email offer target url with params', (done) => {
          const expectedMockTargetUrlWithParams =
            'MOCK_TARGET_URL?CELL=MOCK_CELL&chaseSessionId=MOCK_SESSION_ID&returnToURL=http%3A%2F%2Flocal.swacorp.com&REF=MWEB&SPID=MOCK_SPID';

          branch.data.mockImplementationOnce((callback) => {
            callback(null, {
              data_parsed: {
                ...mockBaseDataParsed
              }
            });
          });
          createChaseSessionStub.mockImplementationOnce(() => Promise.resolve(mockChaseSessionId));

          createComponent();

          waitFor.untilAssertPass(() => {
            expect(createChaseSessionStub).toHaveBeenCalledWith(
              'http://local.swacorp.com',
              false,
              mockRapidRewardsNumber
            );
            expect(openStub).toHaveBeenCalledWith(expectedMockTargetUrlWithParams, '_self');
          }, done);
        });
      });

      describe('when isChaseCombo is true', () => {
        it('should create Chase session and push to Chase offer apply page', (done) => {
          const expectedQuery = {
            CELL: mockCell,
            REF,
            SPID: mockSpid,
            chaseSessionId: mockChaseSessionId,
            isChaseCombo: 'true',
            isMwebBranchLink: 'true',
            returnToURL: 'http://local.swacorp.com'
          };

          branch.data.mockImplementationOnce((callback) => {
            callback(null, {
              data_parsed: {
                ...mockBaseDataParsed,
                isChaseCombo: 'true'
              }
            });
          });
          createChaseSessionStub.mockImplementationOnce(() => Promise.resolve(mockChaseSessionId));

          createComponent();

          waitFor.untilAssertPass(() => {
            expect(createChaseSessionStub).toHaveBeenCalledWith(
              'http://local.swacorp.com',
              false,
              mockRapidRewardsNumber
            );
            expect(pushStub).toHaveBeenCalledWith('/chase/offer/apply', null, expectedQuery);
            expect(openStub).not.toHaveBeenCalled();
          }, done);
        });
      });
    });

    describe('returns invalid or missing data', () => {
      describe('when missing SPID, CELL, and isChaseCombo', () => {
        it('should use default values', (done) => {
          branch.data.mockImplementationOnce((callback) => {
            callback(null, {
              data_parsed: {
                encryptedRapidRewardsNumber: mockRapidRewardsNumber,
                targetUrl: mockTargetUrl
              }
            });
          });
          createChaseSessionStub.mockImplementationOnce(() => Promise.resolve(mockChaseSessionId));

          createComponent();

          waitFor.untilAssertPass(() => {
            expect(createChaseSessionStub).toHaveBeenCalledWith(
              'http://local.swacorp.com',
              false,
              mockRapidRewardsNumber
            );
            expect(pushStub).not.toHaveBeenCalled();
            expect(openStub).toHaveBeenCalledWith(
              'MOCK_TARGET_URL?chaseSessionId=MOCK_SESSION_ID&returnToURL=http%3A%2F%2Flocal.swacorp.com&REF=MWEB',
              '_self'
            );
          }, done);
        });
      });

      describe('when isChaseCombo is false', () => {
        describe('when encryptedRapidRewardsNumber is missing', () => {
          it('should push to the homepage', (done) => {
            branch.data.mockImplementationOnce((callback) => {
              callback(null, {
                data_parsed: {
                  CELL: mockCell,
                  isChaseCombo: 'false',
                  SPID: mockSpid,
                  targetUrl: mockTargetUrl
                }
              });
            });

            createComponent();

            waitFor.untilAssertPass(() => {
              expect(createChaseSessionStub).not.toHaveBeenCalled();
              expect(openStub).not.toHaveBeenCalled();
              expect(pushStub).toHaveBeenCalledWith('/');
            }, done);
          });
        });

        describe('when targetUrl is missing', () => {
          it('should push to the homepage', (done) => {
            branch.data.mockImplementationOnce((callback) => {
              callback(null, {
                data_parsed: {
                  encryptedRapidRewardsNumber: mockRapidRewardsNumber,
                  CELL: mockCell,
                  isChaseCombo: 'false',
                  SPID: mockSpid
                }
              });
            });

            createComponent();

            waitFor.untilAssertPass(() => {
              expect(createChaseSessionStub).not.toHaveBeenCalled();
              expect(openStub).not.toHaveBeenCalled();
              expect(pushStub).toHaveBeenCalledWith('/');
            }, done);
          });
        });
      });
    });

    describe('returns empty data', () => {
      describe('when isChaseCombo is false', () => {
        it('should push to the homepage', (done) => {
          branch.data.mockImplementationOnce((callback) => {
            callback(null, {});
          });

          createComponent();

          waitFor.untilAssertPass(() => {
            expect(createChaseSessionStub).not.toHaveBeenCalled();
            expect(openStub).not.toHaveBeenCalled();
            expect(pushStub).toHaveBeenCalledWith('/');
          }, done);
        });
      });
    });

    describe('returns data callback with null/undefined', () => {
      it('should push to the homepage', (done) => {
        branch.data.mockImplementationOnce((callback) => {
          callback(null, undefined);
        });

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).not.toHaveBeenCalled();
          expect(openStub).not.toHaveBeenCalled();
          expect(pushStub).toHaveBeenCalledWith('/');
        }, done);
      });
    });

    describe('returns data callback with null/null', () => {
      it('should push to the homepage', (done) => {
        branch.data.mockImplementationOnce((callback) => {
          callback(null, null);
        });

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).not.toHaveBeenCalled();
          expect(openStub).not.toHaveBeenCalled();
          expect(pushStub).toHaveBeenCalledWith('/');
        }, done);
      });
    });

    describe('returns an error (undefined or times out)', () => {
      it('should push to the homepage', (done) => {
        branch.data.mockImplementationOnce(() => {
          throw new Error();
        });

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).not.toHaveBeenCalled();
          expect(openStub).not.toHaveBeenCalled();
          expect(pushStub).toHaveBeenCalledWith('/');
        }, done);
      });
    });

    describe('callback returns an error', () => {
      it('should push to the homepage', (done) => {
        branch.data.mockImplementationOnce((callback) => {
          callback(new Error(), null);
        });

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).not.toHaveBeenCalled();
          expect(openStub).not.toHaveBeenCalled();
          expect(pushStub).toHaveBeenCalledWith('/');
        }, done);
      });
    });
  });

  describe('when gateway returns any error', () => {
    describe(`with a location header`, () => {
      it('should open the same window with that value', (done) => {
        const mockError = {
          getResponseHeader: jest.fn(() => 'https://mockurl.com/'),
          responseJSON: {
            code: '400123456'
          }
        };

        branch.data.mockImplementationOnce((callback) => {
          callback(null, {
            data_parsed: {
              ...mockBaseDataParsed
            }
          });
        });
        createChaseSessionStub.mockImplementationOnce(() => Promise.reject(mockError));

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).toHaveBeenCalledWith(
            'http://local.swacorp.com',
            false,
            mockRapidRewardsNumber
          );
          expect(openStub).toHaveBeenCalledWith('https://mockurl.com/', '_self');
          expect(pushStub).not.toHaveBeenCalled();
          expect(mockError.getResponseHeader).toHaveBeenCalled;
        }, done);
      });
    });

    describe('without a location header', () => {
      it('should push to homepage', (done) => {
        const mockError = {
          getResponseHeader: jest.fn(() => null),
          responseJSON: {
            code: '400123456'
          }
        };

        branch.data.mockImplementationOnce((callback) => {
          callback(null, {
            data_parsed: {
              ...mockBaseDataParsed
            }
          });
        });
        createChaseSessionStub.mockImplementationOnce(() => Promise.reject(mockError));

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(createChaseSessionStub).toHaveBeenCalledWith(
            'http://local.swacorp.com',
            false,
            mockRapidRewardsNumber
          );
          expect(openStub).not.toHaveBeenCalled();
          expect(pushStub).toHaveBeenCalledWith('/');
          expect(mockError.getResponseHeader).toHaveBeenCalled;
        }, done);
      });

      describe('with undefined', () => {
        it('should push to homepage', (done) => {
          branch.data.mockImplementationOnce((callback) => {
            callback(null, {
              data_parsed: {
                ...mockBaseDataParsed
              }
            });
          });
          createChaseSessionStub.mockImplementationOnce(() => Promise.reject());

          createComponent();

          waitFor.untilAssertPass(() => {
            expect(createChaseSessionStub).toHaveBeenCalledWith(
              'http://local.swacorp.com',
              false,
              mockRapidRewardsNumber
            );
            expect(openStub).not.toHaveBeenCalled();
            expect(pushStub).toHaveBeenCalledWith('/');
          }, done);
        });
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      createChaseSessionFn: createChaseSessionStub,
      isLoggedIn: false,
      push: pushStub
    };

    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(<ChaseOfferEmailPage {...finalProps} />);
  };
});
