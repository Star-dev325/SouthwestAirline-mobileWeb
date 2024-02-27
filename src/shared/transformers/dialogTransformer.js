import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { history } from 'src/appHistory';
import { cleanUpEndOfSession } from 'src/shared/actions/accountActions';
import { addHistoryForceRedirect } from 'src/shared/actions/historyActions';
import ErrorMessages from 'src/shared/constants/errorMessages';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import AlternativeFormsOfPaymentError from 'src/shared/errors/alternativeFormsOfPaymentError';
import LocationServicesError from 'src/shared/errors/locationServicesError';
import UserNotLoginError from 'src/shared/errors/userNotLoginError';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';
import { store } from 'src/shared/redux/createStore';

export function generateDialogConfigFromError(error) {
  if (error instanceof Error) {
    if (error instanceof AlternativeFormsOfPaymentError) {
      return generateDialogConfigFromAfpError(error);
    }

    if (error instanceof UserNotLoginError || error instanceof AccessTokenExpiredError) {
      return {
        title: error.message,
        name: 'global-error-popup',
        buttons: [
          {
            label: 'OK',
            onClick: () =>
              dispatchHideDialog().then(() => {
                store.dispatch(cleanUpEndOfSession());
                store.dispatch(addHistoryForceRedirect('/'));
                history.push('/');
              })
          }
        ]
      };
    }

    if (error instanceof LocationServicesError) {
      return {
        name: 'global-error-popup',
        title: error.message
      };
    }

    const isNotCustomizedMessage = !_.includes(ErrorMessages, error.message);

    if (isNotCustomizedMessage) {
      return {
        title: i18n('SHARED__ERROR_MESSAGES__GENERIC_JAVASCRIPT_MESSAGE'),
        name: 'generic-javascript-error',
        verticalLinks: {
          links: [
            {
              label: i18n('SHARED__AIRPORT_LIST__VISIT_SOUTHWEST_DOT_COM'),
              href: 'http://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb',
              onClick: dispatchHideDialog,
              isExternal: true
            },
            {
              label: i18n('SHARED__BUTTON_TEXT__PHONE_I_FLY_SWA'),
              href: 'tel:1-800-435-9792',
              onClick: dispatchHideDialog
            }
          ]
        },
        closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL')
      };
    }

    return {
      title: error.message,
      name: 'global-error-popup'
    };
  } else {
    const { errorHandler } = error;
    const basicConfig = {
      title: _.get(error, 'responseJSON.message'),
      error
    };

    if (errorHandler) {
      const buttons = [
        {
          label: 'OK',
          onClick: () => dispatchHideDialog().then(errorHandler)
        }
      ];

      return _.merge(basicConfig, { buttons });
    }

    return basicConfig;
  }
}

const generateDialogConfigFromAfpError = (error) => {
  const { errorHandler, message: title } = error;

  return {
    title,
    name: 'afp-error-popup',
    buttons: errorHandler && [
      {
        label: 'OK',
        onClick: () => dispatchHideDialog().then(errorHandler)
      }
    ]
  };
};

export const generateDialogConfigForChaseError = (error, onClickFn) => {
  const errorCode = _.get(error, 'responseJSON.code', '');
  const errorRequestId = _.get(error, 'responseJSON.requestId', '');

  return {
    name: 'chase-offer-apply-failure',
    title: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE_TITLE'),
    message: i18n('SHARED__ERROR_MESSAGES__CHASE_ERROR_MESSAGE'),
    contentView: errorCode && (
      <div>
        <br />
        <p>Error {errorCode}</p>
        {errorRequestId && <p>{`(${errorRequestId})`}</p>}
      </div>
    ),
    buttons: [
      {
        label: i18n('SHARED__BUTTON_TEXT__OK'),
        onClick: onClickFn
      }
    ]
  };
};
