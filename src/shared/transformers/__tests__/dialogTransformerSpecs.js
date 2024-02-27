import i18n from '@swa-ui/locale';
import React from 'react';
import { sandbox } from 'sinon';
import { history } from 'src/appHistory';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as HistoryActions from 'src/shared/actions/historyActions';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import AlternativeFormsOfPaymentError from 'src/shared/errors/alternativeFormsOfPaymentError';
import LocationServicesError from 'src/shared/errors/locationServicesError';
import * as dialogHelper from 'src/shared/helpers/dialogHelper';
import {
  generateDialogConfigForChaseError,
  generateDialogConfigFromError
} from 'src/shared/transformers/dialogTransformer';

const sinon = sandbox.create();

describe('dialogTransformer', () => {
  let dispatchHideDialogStub;
  let cleanUpEndOfSessionStub;
  let addHistoryForceRedirectStub;
  let pushStub;
  let errorHandlerStub;

  beforeEach(() => {
    dispatchHideDialogStub = sinon
      .stub(dialogHelper, 'dispatchHideDialog')
      .returns(new Promise((resolve) => resolve({ type: 'fakeType' })));
    cleanUpEndOfSessionStub = sinon.stub(AccountActions, 'cleanUpEndOfSession').returns({ type: 'fakeType' });
    addHistoryForceRedirectStub = sinon.stub(HistoryActions, 'addHistoryForceRedirect').returns({ type: 'fakeType' });
    pushStub = sinon.stub(history, 'push');
    errorHandlerStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('generateDialogConfigFromError', () => {
    it('should generate dialog config for api error', () => {
      const error = {
        responseJSON: {
          code: 400520187,
          httpStatusCode: 'BAD_REQUEST',
          infoList: [
            {
              key: 'passengers[0].birthDate',
              value: '1980-01-01'
            }
          ],
          message: 'A standard error.',
          messageKey: 'A_STANDARD_ERROR',
          requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb'
        }
      };
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.deep.equal({
        title: 'A standard error.',
        error
      });
    });

    it('should generate dialog config with customized error handler', async () => {
      const error = {
        errorHandler: errorHandlerStub,
        responseJSON: {
          code: 400520187,
          httpStatusCode: 'BAD_REQUEST',
          infoList: [
            {
              key: 'passengers[0].birthDate',
              value: '1980-01-01'
            }
          ],
          message: 'A standard error.',
          messageKey: 'A_STANDARD_ERROR',
          requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb'
        }
      };
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig.buttons[0]).to.contain({ label: 'OK' });
      await dialogConfig.buttons[0].onClick();

      expect(dispatchHideDialogStub).to.be.called;
      expect(errorHandlerStub).to.be.called;
    });

    it('should generate dialog config for customized error', async () => {
      const error = new AccessTokenExpiredError();

      error.errorHandler = errorHandlerStub;
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.contains({
        title: 'Your session has expired',
        name: 'global-error-popup'
      });
      expect(dialogConfig.buttons[0]).to.contain({ label: 'OK' });
      await dialogConfig.buttons[0].onClick();

      expect(cleanUpEndOfSessionStub).to.have.been.called;
      expect(addHistoryForceRedirectStub).to.have.been.calledWith('/');
      expect(pushStub).to.have.been.calledWith('/');
      expect(errorHandlerStub).not.to.be.called;
    });

    it('should generate dialog config for access token expired error with custom message', async () => {
      const error = new AccessTokenExpiredError();

      error.message = 'custom message';
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.contains({
        title: 'custom message',
        name: 'global-error-popup'
      });
    });

    it('should generate dialog config for LocationServicesError with default message', () => {
      const error = new LocationServicesError();
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.deep.equal({
        name: 'global-error-popup',
        title: i18n('SHARED__ERROR_MESSAGES__LOCATION_UNAVAILABLE')
      });
    });

    it('should generate dialog config for LocationServicesError with custom message', () => {
      const error = new LocationServicesError('custom message');
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.deep.equal({
        name: 'global-error-popup',
        title: 'custom message'
      });
    });

    it('should generate dialog config for JavaScript error', () => {
      const error = new TypeError(`Cannot read property 'name' of undefined`, 'http://localhost:3000/js/index.js');
      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig).to.deep.equal({
        title: i18n('SHARED__ERROR_MESSAGES__GENERIC_JAVASCRIPT_MESSAGE'),
        name: 'generic-javascript-error',
        closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL'),
        verticalLinks: {
          links: [
            {
              label: i18n('SHARED__AIRPORT_LIST__VISIT_SOUTHWEST_DOT_COM'),
              href: 'http://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb',
              onClick: dispatchHideDialogStub,
              isExternal: true
            },
            {
              label: i18n('SHARED__BUTTON_TEXT__PHONE_I_FLY_SWA'),
              href: 'tel:1-800-435-9792',
              onClick: dispatchHideDialogStub
            }
          ]
        }
      });
    });

    it('should generate dialog config for AlternativeFormsOfPaymentError with an errorHandler', async () => {
      const error = new AlternativeFormsOfPaymentError(errorHandlerStub);

      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig.buttons[0]).to.contain({ label: 'OK' });
      await dialogConfig.buttons[0].onClick();

      expect(dialogConfig.title).to.equal(i18n('SHARED__ERROR_MESSAGES__AFP_ERROR_MESSAGE'));
      expect(dialogConfig.name).to.equal('afp-error-popup');

      expect(errorHandlerStub).to.have.been.called;
    });

    it('should generate dialog config for AlternativeFormsOfPaymentError without an errorHandler', () => {
      const error = new AlternativeFormsOfPaymentError();

      const dialogConfig = generateDialogConfigFromError(error);

      expect(dialogConfig.title).to.equal(i18n('SHARED__ERROR_MESSAGES__AFP_ERROR_MESSAGE'));
      expect(dialogConfig.name).to.equal('afp-error-popup');
      expect(dialogConfig.buttons).to.equal(undefined);

      expect(errorHandlerStub).to.not.have.been.called;
    });
  });

  context('generateDialogConfigForChaseError', () => {
    it('should generate dialog config for chase error with code and request id', () => {
      const code = '12345';
      const requestId = '67890';
      const error = {
        responseJSON: {
          code,
          requestId
        }
      };
      const onClickFnStub = sinon.stub();
      const dialogConfig = generateDialogConfigForChaseError(error, onClickFnStub);

      expect(dialogConfig).to.deep.equal({
        name: 'chase-offer-apply-failure',
        title: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE_TITLE'),
        message: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE'),
        contentView: code && (
          <div>
            <br />
            <p>Error {code}</p>
            <p>{`(${requestId})`}</p>
          </div>
        ),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: onClickFnStub
          }
        ]
      });
    });

    it('should generate dialog config for chase error with code and no request id', () => {
      const code = '12345';
      const error = {
        responseJSON: {
          code
        }
      };
      const onClickFnStub = sinon.stub();
      const dialogConfig = generateDialogConfigForChaseError(error, onClickFnStub);

      expect(dialogConfig).to.deep.equal({
        name: 'chase-offer-apply-failure',
        title: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE_TITLE'),
        message: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE'),
        contentView: code && (
          <div>
            <br />
            <p>Error {code}</p>
            {''}
          </div>
        ),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: onClickFnStub
          }
        ]
      });
    });

    it('should generate dialog config for chase error without code or request id', () => {
      const error = {
        responseJSON: {}
      };
      const onClickFnStub = sinon.stub();
      const dialogConfig = generateDialogConfigForChaseError(error, onClickFnStub);

      expect(dialogConfig).to.deep.equal({
        name: 'chase-offer-apply-failure',
        title: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE_TITLE'),
        message: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE'),
        contentView: '',
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: onClickFnStub
          }
        ]
      });
    });
  });
});
