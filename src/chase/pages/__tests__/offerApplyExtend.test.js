jest.mock('src/chase/actions/chaseActions', () => ({
  createChaseSession: jest.fn()
}));
jest.mock('src/airBooking/helpers/amcvCookieHelper', () => ({
  getMcvid: jest.fn()
}));
jest.mock('src/shared/actions/dialogActions', () => ({
  forceHideDialog: jest.fn().mockResolvedValue(),
  showDialog: jest.fn().mockReturnValue({ type: 'show dialog' })
}));
jest.mock('src/shared/helpers/browserObject', () => ({ location: { origin: 'http://local.swacorp.com' } }));
jest.mock('src/shared/transformers/dialogTransformer', () => ({
  generateDialogConfigForChaseError: jest.fn()
}));
jest.mock('src/shared/helpers/pathUtils', () => ({
  transformSearchToQuery: jest.fn()
}));
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as Mcvid from 'src/airBooking/helpers/amcvCookieHelper';
import { createChaseSession } from 'src/chase/actions/chaseActions';
import { OfferApplyExtendPage } from 'src/chase/pages/offerApplyExtend';
import { forceHideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { generateDialogConfigForChaseError } from 'src/shared/transformers/dialogTransformer';
import waitFor from 'test/unit/helpers/waitFor';

const { CHASE_SESSION_ID_KEY } = StorageKeys;
const { DATA_CHANNEL } = SharedConstants;

describe('OfferApplyExtendPage', () => {
  const CELL = 'CELL';
  const RMID = 'RMID';
  const RRID = 'RRID';
  const RR_NUMBER = 'RR_NUMBER';
  const RSD = 'RSD';
  const SPID = 'SPID';
  const baseUrl = 'http://local.swacorp.com';
  const chaseSessionId = 'sessions:7EC2B95C55FA4922B690FAC452938A3E';
  const clk = 'clk';
  const datachannel = 'datachannel';
  const f = 'f';
  const isChaseCombo = 'true';
  const isLoggedIn = true;
  const mcvid = 'mcvid';
  const pageId = 'home-mobile-index';
  const returnToURL = '/return/to/url';
  const src = 'src';
  const baseQueryParameters = { CELL, clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, SPID, src };
  const additionalQueryParameters = { returnToURL, pageId, isChaseCombo, isMwebBranchLink: false };

  const originationApplicationIdentifier = 'originationApplicationIdentifier';
  const daoCardUrl = 'daoCardUrl';
  const links = [{ rel: 'DAOCARD-URL', href: daoCardUrl }];
  const applicationInfoResponse = { originationApplicationIdentifier, links };

  const dialogConfig = { dialog: 'config' };

  let getChaseApplicationInfoMock;
  let loadChaseInstantCreditReturnUrlMock;
  let openMock;
  let pushMock;
  let replaceMock;

  beforeEach(() => {
    createChaseSession.mockImplementation(() => {});
    generateDialogConfigForChaseError.mockImplementation(() => {});
    getChaseApplicationInfoMock = jest.fn().mockResolvedValue('MOCK');
    jest.spyOn(Mcvid, 'getMcvid');
    jest.spyOn(LocalStorageCache, 'deleteFromLocalStorage');
    loadChaseInstantCreditReturnUrlMock = jest.fn();
    loadChaseInstantCreditReturnUrlMock = jest.spyOn(LocalStorageCache, 'loadChaseInstantCreditReturnUrl');
    openMock = jest.spyOn(window, 'open').mockImplementation(jest.fn());
    pushMock = jest.fn();
    replaceMock = jest.fn();
    transformSearchToQuery.mockImplementation(() => ({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('offerApplyExtend', () => {
    describe('when chaseSessionId is passed as query param', () => {
      const queryParameters = { ...baseQueryParameters, ...additionalQueryParameters, chaseSessionId };

      it('should handle successful DAO response', (done) => {
        transformSearchToQuery.mockImplementation(() => queryParameters);
        getChaseApplicationInfoMock.mockResolvedValueOnce(applicationInfoResponse);

        createComponent({ queryParameters: { ...queryParameters, ...additionalQueryParameters } });

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).not.toHaveBeenCalled();
          expect(loadChaseInstantCreditReturnUrlMock).not.toHaveBeenCalled();
          expect(createChaseSession).not.toHaveBeenCalled();
          expect(getChaseApplicationInfoMock).toHaveBeenCalledWith({
            SPID,
            CELL,
            chaseSessionId,
            returnToURL,
            isComboApp: true,
            appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
            pageId
          });
          expect(openMock).toHaveBeenCalledWith(daoCardUrl, '_self');
        }, done);
      });

      describe('when isMwebBranchLink is true', () => {
        it('should handle failure DAO response', (done) => {
          const queryParameters = { ...baseQueryParameters, ...additionalQueryParameters, chaseSessionId };

          createChaseSession.mockResolvedValue('');
          generateDialogConfigForChaseError.mockImplementation(() => dialogConfig);
          getChaseApplicationInfoMock.mockRejectedValue('mockError');
          loadChaseInstantCreditReturnUrlMock.mockResolvedValue(returnToURL);
          transformSearchToQuery.mockImplementation(() => ({
            ...queryParameters,
            isMwebBranchLink: true,
            returnToURL
          }));

          createComponent({ queryParameters, returnToURL });

          waitFor.untilAssertPass(() => {
            expect(Mcvid.getMcvid).not.toHaveBeenCalled();
            expect(loadChaseInstantCreditReturnUrlMock).not.toHaveBeenCalled();
            expect(createChaseSession).not.toHaveBeenCalled();
            expect(getChaseApplicationInfoMock).toBeCalledWith({
              SPID,
              CELL,
              chaseSessionId,
              returnToURL,
              isComboApp: true,
              appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
              pageId
            });
            expect(showDialog).toHaveBeenCalledWith(dialogConfig);

            generateDialogConfigForChaseError.mock.calls[0][1]();

            expect(forceHideDialog).toHaveBeenCalled();
            expect(LocalStorageCache.deleteFromLocalStorage).toHaveBeenCalledWith(CHASE_SESSION_ID_KEY);
            expect(pushMock).toHaveBeenCalled();
          }, done);
        });
      });

      describe('when isMwebBranchLink is false', () => {
        it('should handle failure DAO response', (done) => {
          createChaseSession.mockResolvedValue('');
          generateDialogConfigForChaseError.mockImplementation(() => dialogConfig);
          getChaseApplicationInfoMock.mockRejectedValue('mockError');
          loadChaseInstantCreditReturnUrlMock.mockResolvedValue(returnToURL);
          transformSearchToQuery.mockImplementation(() => ({
            ...queryParameters,
            returnToURL: '/offer'
          }));

          createComponent({ queryParameters });

          waitFor.untilAssertPass(() => {
            expect(Mcvid.getMcvid).not.toHaveBeenCalled();
            expect(loadChaseInstantCreditReturnUrlMock).not.toHaveBeenCalled();
            expect(createChaseSession).not.toHaveBeenCalled();
            expect(getChaseApplicationInfoMock).toBeCalledWith({
              SPID,
              CELL,
              chaseSessionId,
              returnToURL: '/offer',
              isComboApp: true,
              appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
              pageId
            });
            expect(replaceMock).toHaveBeenCalledWith('/chase/offer/error');
          }, done);
        });
      });
    });

    describe('when chaseSessionId is not passed as query param', () => {
      const queryParameters = { ...baseQueryParameters, ...additionalQueryParameters };

      beforeEach(() => {
        transformSearchToQuery.mockImplementation(() => ({
          ...queryParameters
        }));
      });

      it('should handle successful DAO response', (done) => {
        createChaseSession.mockResolvedValueOnce(chaseSessionId);
        getChaseApplicationInfoMock.mockResolvedValueOnce(applicationInfoResponse);
        loadChaseInstantCreditReturnUrlMock.mockResolvedValue(returnToURL);

        createComponent({ queryParameters: { ...queryParameters, ...additionalQueryParameters } });

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).not.toBeCalled();
          expect(loadChaseInstantCreditReturnUrlMock).toHaveBeenCalled();
          expect(createChaseSession).toHaveBeenCalledWith(`${baseUrl}${returnToURL}`, isLoggedIn);
          expect(getChaseApplicationInfoMock).toBeCalledWith({
            SPID,
            CELL,
            chaseSessionId,
            returnToURL: `${baseUrl}${returnToURL}`,
            isComboApp: true,
            appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
            pageId
          });
          expect(openMock).toHaveBeenCalledWith(daoCardUrl, '_self');
        }, done);
      });

      it('should handle empty DAO response', (done) => {
        createChaseSession.mockResolvedValueOnce(chaseSessionId);
        getChaseApplicationInfoMock.mockResolvedValue();
        loadChaseInstantCreditReturnUrlMock.mockRejectedValue('/');

        createComponent({ queryParameters });

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).not.toHaveBeenCalled();
          expect(loadChaseInstantCreditReturnUrlMock).toHaveBeenCalled();
          expect(createChaseSession).toHaveBeenCalledWith(`${baseUrl}/`, isLoggedIn);
          expect(getChaseApplicationInfoMock).toHaveBeenCalledWith({
            SPID,
            CELL,
            chaseSessionId,
            returnToURL: `${baseUrl}/`,
            isComboApp: true,
            appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
            pageId
          });
          expect(openMock).toHaveBeenCalledWith('/', '_self');
        }, done);
      });

      it('should handle empty query parameters', (done) => {
        const defaultMcvid = 'default-mcvid';

        createChaseSession.mockResolvedValue('');
        getChaseApplicationInfoMock.mockResolvedValue();
        Mcvid.getMcvid.mockReturnValueOnce(defaultMcvid);
        loadChaseInstantCreditReturnUrlMock.mockRejectedValue('/');
        transformSearchToQuery.mockImplementation(() => ({}));

        createComponent();

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).toHaveBeenCalled();
          expect(loadChaseInstantCreditReturnUrlMock).toHaveBeenCalled();
          expect(createChaseSession).toBeCalledWith(`${baseUrl}/`, isLoggedIn);
          expect(getChaseApplicationInfoMock).toBeCalledWith({
            SPID: '',
            CELL: '',
            chaseSessionId: '',
            returnToURL: `${baseUrl}/`,
            isComboApp: false,
            appendToDAOURL: {
              clk: undefined,
              datachannel: DATA_CHANNEL,
              f: undefined,
              mcvid: defaultMcvid,
              RMID: undefined,
              RR_NUMBER: undefined,
              RRID: undefined,
              RSD: undefined,
              src: undefined
            },
            pageId: undefined
          });
          expect(openMock).toHaveBeenCalledWith('/', '_self');
        }, done);
      });

      it('should handle failure Chase Session response', (done) => {
        createChaseSession.mockImplementationOnce(() => Promise.reject());
        generateDialogConfigForChaseError.mockImplementation(() => dialogConfig);
        getChaseApplicationInfoMock.mockRejectedValue();
        loadChaseInstantCreditReturnUrlMock.mockRejectedValue('/');

        createComponent({ queryParameters });

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).not.toBeCalled();
          expect(loadChaseInstantCreditReturnUrlMock).toBeCalled();
          expect(createChaseSession).toBeCalledWith(`${baseUrl}/`, isLoggedIn);
          expect(getChaseApplicationInfoMock).not.toBeCalled();
          expect(showDialog).toHaveBeenCalledWith(dialogConfig);
        }, done);
      });

      it('should handle failure DAO response', (done) => {
        createChaseSession.mockReturnValue(Promise.resolve(''));
        generateDialogConfigForChaseError.mockImplementation(() => dialogConfig);
        getChaseApplicationInfoMock.mockReturnValue(Promise.reject());
        loadChaseInstantCreditReturnUrlMock.mockReturnValue(Promise.resolve(returnToURL));

        createComponent({ queryParameters, chaseSessionId: null });

        waitFor.untilAssertPass(() => {
          expect(Mcvid.getMcvid).not.toHaveBeenCalled();
          expect(loadChaseInstantCreditReturnUrlMock).toHaveBeenCalled();
          expect(createChaseSession).toBeCalledWith(`${baseUrl}${returnToURL}`, isLoggedIn);
          expect(getChaseApplicationInfoMock).toBeCalledWith({
            SPID,
            CELL,
            chaseSessionId: '',
            returnToURL: `${baseUrl}${returnToURL}`,
            isComboApp: true,
            appendToDAOURL: { clk, datachannel, f, mcvid, RMID, RR_NUMBER, RRID, RSD, src },
            pageId
          });
          expect(showDialog).toHaveBeenCalledWith(dialogConfig);

          generateDialogConfigForChaseError.mock.calls[0][1]();

          expect(forceHideDialog).toHaveBeenCalled();
          expect(LocalStorageCache.deleteFromLocalStorage).toHaveBeenCalledWith(CHASE_SESSION_ID_KEY);
          expect(pushMock).toHaveBeenCalledWith(returnToURL);
        }, done);
      });
    });

    const createComponent = (props = {}) => {
      const defaultProps = {
        createChaseSessionFn: createChaseSession,
        forceHideDialogFn: forceHideDialog,
        getChaseApplicationInfoFn: getChaseApplicationInfoMock,
        isLoggedIn,
        location: { search: { key: 'value' } },
        push: pushMock,
        replace: replaceMock,
        showDialogFn: showDialog
      };

      const mergedProps = { ...defaultProps, ...props };

      const store = configureMockStore()();

      return render(
        <Provider store={store}>
          <OfferApplyExtendPage {...mergedProps} />
        </Provider>
      );
    };
  });
});
