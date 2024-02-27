// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import CreditCardUpdateForm from 'src/shared/components/creditCardUpdateForm';
import * as GlobalHeaderActions from 'src/shared/actions/globalHeaderActions';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import i18n from '@swa-ui/locale';
import {
  NEW_CREDIT_CARD_ID,
  RAPID_REWARDS_VISA_ID,
  UNSELECTED_CREDIT_CARD,
  PAY_PAL_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import type {
  UpdateSavedCreditCardPage,
  UpdateSavedCreditCardFormData,
  Push,
  AccountContactInfoType
} from 'src/shared/flow-typed/shared.types';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import { CREDIT_CARD_UPDATE_FORM } from 'src/shared/constants/formIds';
import { DESTRUCTIVE } from 'src/shared/constants/buttonPopupStyleTypes';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';

type Props = {
  editMode: boolean,
  updateSavedCreditCardPage: ?UpdateSavedCreditCardPage,
  resetGlobalHeaderFn: () => void,
  showCancelButtonFn: () => void,
  hideButtonFn: () => void,
  clickCancelButtonFn: () => void,
  clickEditButtonFn: () => void,
  showEditButtonFn: () => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: () => Promise<*>,
  onMakePrimaryCreditCardFn: (string) => void,
  getSavedCreditCardByIdFn: (string, string) => Promise<*>,
  onDeleteCreditCardsFn: (Array<string>) => void,
  updateCreditCardFn: (UpdateSavedCreditCardFormData, string) => Promise<*>,
  fetchCreditCardsAndQuitEditModeFn: (shouldGoBackAfterSuccess?: boolean) => void,
  setReLoginCallbackFunctionsFn: (reLoginCallbackFunctions: ReLoginCallbackFunctionsType) => void,
  push: Push,
  goBack: () => void,
  recordLocator?: string,
  continueAsGuestActionFn?: () => (dispatch: ReduxDispatch<*>) => {},
  userAddressInfo?: AccountContactInfoType,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  addHistoryBackToHomeFn: (boolean) => void,
  isWebView?: boolean
};

type State = {
  selectedCardId: string
};
type OptionsType = {
  fullScreenModalId: string,
  enableRelogin?: boolean
};

const withPaymentEditMode =
  (options: OptionsType, continueAsGuestFn: (props: Props) => void = _.noop) =>
    (Payment: *) => {
      const { fullScreenModalId = true } = options;

      class PaymentEditMode extends React.Component<Props, State> {
        constructor(props) {
          super(props);
          this.state = {
            selectedCardId: ''
          };
        }

        componentWillUnmount() {
          this.props.resetGlobalHeaderFn();
        }

        _handleNextAction(next: () => void, postLoginCallback: () => void) {
          const { setReLoginCallbackFunctionsFn } = this.props;
          const continueAsGuest = () => continueAsGuestFn(this.props);

          next();
          setReLoginCallbackFunctionsFn({ continueAsGuestFn: continueAsGuest, postLoginCallbackFn: postLoginCallback });
        }

        _handleDeleteCard(onDeleteCreditCardsFn: *) {
          const { fetchCreditCardsAndQuitEditModeFn } = this.props;

          this._handleNextAction(onDeleteCreditCardsFn, fetchCreditCardsAndQuitEditModeFn);
        }

        _handleUpdateCard(updateCreditCardFn: *) {
          const { fetchCreditCardsAndQuitEditModeFn } = this.props;

          this._handleNextAction(updateCreditCardFn, () => fetchCreditCardsAndQuitEditModeFn(true));
        }

        _getCardById(getSavedCreditCardByIdFn: *) {
          const { fetchCreditCardsAndQuitEditModeFn } = this.props;

          this._handleNextAction(getSavedCreditCardByIdFn, fetchCreditCardsAndQuitEditModeFn);
        }

        _makePrimaryCard(onMakePrimaryCreditCardFn: *) {
          const { fetchCreditCardsAndQuitEditModeFn } = this.props;

          this._handleNextAction(onMakePrimaryCreditCardFn, fetchCreditCardsAndQuitEditModeFn);
        }

      _onUpdateGlobalHeader = (savedCreditCardId: string) => {
        const { editMode, showEditButtonFn, showCancelButtonFn, hideButtonFn } = this.props;

        if (
          savedCreditCardId === NEW_CREDIT_CARD_ID ||
          savedCreditCardId === UNSELECTED_CREDIT_CARD ||
          savedCreditCardId === RAPID_REWARDS_VISA_ID ||
          savedCreditCardId === PAY_PAL_CARD_ID
        ) {
          hideButtonFn();
        } else {
          editMode ? showCancelButtonFn() : showEditButtonFn();
        }
      };

      _onDeleteCreditCards = (selectedCardIds: Array<string>) => {
        const { onDeleteCreditCardsFn, showDialogFn, hideDialogFn } = this.props;

        showDialogFn({
          name: 'save-credit-card-delete-confirmation',
          title: i18n('AIR_BOOKING__DELETE_CREDIT_CARD__CONFIRM_TITLE'),
          message: i18n('AIR_BOOKING__DELETE_CREDIT_CARD__CONFIRM_POPUP'),
          buttons: [
            {
              label: 'No',
              onClick: hideDialogFn
            },
            {
              label: 'Yes',
              onClick: () => {
                hideDialogFn().then(() => {
                  onDeleteCreditCardsFn && this._handleDeleteCard(_.partial(onDeleteCreditCardsFn, selectedCardIds));
                });
              },
              style: DESTRUCTIVE
            }
          ]
        });
      };

      _onUpdateCreditCardSubmit = (formData: *) => {
        const { updateCreditCardFn, updateSavedCreditCardPage } = this.props;
        const creditCardType = _.get(updateSavedCreditCardPage, 'type');
        const cardDescription = _.get(updateSavedCreditCardPage, '_infoNeededToUpdate.cardDescription');
        const savedCreditCardId = _.get(updateSavedCreditCardPage, '_infoNeededToUpdate.savedCreditCardId');

        const mergedCardFormData = _.merge({}, formData, {
          cardDescription,
          creditCardType,
          savedCreditCardId
        });

        this._handleUpdateCard(_.partial(updateCreditCardFn, mergedCardFormData, fullScreenModalId));
      };

      _onUpdateCreditCard = (selectedId: string) => {
        const { getSavedCreditCardByIdFn } = this.props;

        this.setState({ selectedCardId: selectedId });
        this._getCardById(_.partial(getSavedCreditCardByIdFn, selectedId, fullScreenModalId));
      };

      render() {
        const { updateSavedCreditCardPage, onMakePrimaryCreditCardFn, addHistoryBackToHomeFn } = this.props;

        return (
          <div>
            <Payment
              onUpdateGlobalHeader={this._onUpdateGlobalHeader}
              onDeleteCreditCards={this._onDeleteCreditCards}
              onSelectedCreditCardChanged={this._onUpdateGlobalHeader}
              onUpdateCreditCard={this._onUpdateCreditCard}
              onMakePrimaryCreditCard={(selectedCardId) => {
                this._makePrimaryCard(_.partial(onMakePrimaryCreditCardFn, selectedCardId));
              }}
              addHistoryBackToHome={addHistoryBackToHomeFn}
              {...this.props}
            />

            <FullScreenModal id={fullScreenModalId}>
              {updateSavedCreditCardPage && (
                <div className="update-saved-credit-card-page">
                  <CreditCardUpdateForm
                    formId={`${CREDIT_CARD_UPDATE_FORM}_${this.state.selectedCardId}`}
                    savedCreditCard={updateSavedCreditCardPage}
                    onSubmit={this._onUpdateCreditCardSubmit}
                  />
                </div>
              )}
            </FullScreenModal>
          </div>
        );
      }
      }

      const mapStateToProps = (state) => ({
        editMode: state.app.globalHeader.editMode,
        updateSavedCreditCardPage: state.app.airBooking.updateSavedCreditCardPage,
        accountNumber: _.get(state, 'app.account.accountNumber'),
        isLoggedIn: state.app.account.isLoggedIn
      });

      const mapDispatchToProps = {
        clickEditButtonFn: GlobalHeaderActions.clickEditButton,
        showEditButtonFn: GlobalHeaderActions.showEditButton,
        clickCancelButtonFn: GlobalHeaderActions.clickCancelButton,
        showCancelButtonFn: GlobalHeaderActions.showCancelButton,
        hideButtonFn: GlobalHeaderActions.hideButton,
        resetGlobalHeaderFn: GlobalHeaderActions.resetGlobalHeader,
        onMakePrimaryCreditCardFn: CreditCardActions.makeCreditCardPrimaryAndUpdateCreditCard,
        onDeleteCreditCardsFn: CreditCardActions.deleteCreditCardsAndUpdateCreditCard,
        getSavedCreditCardByIdFn: CreditCardActions.getSavedCreditCardById,
        setReLoginCallbackFunctionsFn: setReLoginCallbackFunctions,
        updateCreditCardFn: CreditCardActions.updateCreditCard,
        fetchCreditCardsAndQuitEditModeFn: CreditCardActions.fetchCreditCardsAndQuitEditMode,
        showDialogFn: showDialog,
        hideDialogFn: hideDialog
      };

      return _.flowRight(
        withConnectedReactRouter,
        connect(mapStateToProps, mapDispatchToProps)
      )(PaymentEditMode);
    };

export default withPaymentEditMode;
