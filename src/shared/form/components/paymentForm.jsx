// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import { store } from 'src/shared/redux/createStore';

import Form from 'src/shared/form/components/form';
import CreditCardFields from 'src/shared/form/fields/creditCardFields';
import PaymentInputFields from 'src/shared/form/fields/paymentInputFields';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import CreditCardsBottomBar from 'src/shared/components/creditCardsBottomBar';
import { scrollToTop } from 'src/shared/helpers/uiHelper';
import { shouldShowBackToTopButton } from 'src/shared/helpers/paymentInfoHelplers';
import EditModeBottomButtonConstants from 'src/shared/form/constants/editModeBottomButtonConstants';
import { toEditModeButtonStatus } from 'src/airBooking/transformers/savedCreditCardsTransformer';
import {
  NEW_CREDIT_CARD_ID,
  RAPID_REWARDS_VISA_ID,
  UNSELECTED_CREDIT_CARD
} from 'src/shared/constants/creditCardConstants';
import withForm from 'src/shared/form/enhancers/withForm';
import paymentFormValidator from 'src/shared/form/formValidators/paymentFormValidator';
import { doesNewCreditCardNeedCVV, getDefaultSelectedPaymentInfo } from 'src/shared/helpers/creditCardHelper';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import i18n from '@swa-ui/locale';

import type {
  PaymentSavedCreditCard,
  PaymentSavedCreditCards,
  AccountContactInfoType,
  PaymentInfo
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';
import { transformContactInfoToBillingAddressFormData } from 'src/shared/transformers/billingAddressTransformer';

const { buttonText } = EditModeBottomButtonConstants;

type Props = {
  clearFormDataByIdFn: (string) => void,
  clickCancelButtonFn: () => void,
  clickEditButtonFn: () => void,
  editMode: boolean,
  enableOperationOnCC: boolean,
  formData: FormData,
  formId: string,
  goBack: () => void,
  hideErrorHeader?: () => void,
  hideErrorHeaderMsgFn: () => void,
  hideGhostCards: boolean,
  hideSubmitSegment?: boolean,
  isWebView?: boolean,
  onChange: (fieldName: string, fieldValue: *) => void,
  onClickApplePayButton?: (paymentInfo: PaymentInfo) => void,
  onClickContinueButton?: (*) => void,
  onClickPayPalButton?: (paymentInfo: PaymentInfo) => void,
  onClickUpliftButton?: (paymentInfo: PaymentInfo) => void,
  onDeleteCreditCards?: (Array<string>) => void,
  onMakePrimaryCreditCard?: (string) => void,
  onSelectedCreditCardChanged?: (string) => void,
  onSubmit: () => void,
  onUpdateCreditCard?: (string) => void,
  onUpdateGlobalHeader: (string) => void,
  savedCreditCards: PaymentSavedCreditCards,
  shouldDisableUplift?: boolean,
  shouldEnableSaveCC?: boolean,
  shouldShowApplePay: boolean,
  shouldShowChaseInstantCreditCard?: boolean,
  shouldShowUplift: boolean,
  showEditHeader?: boolean,
  subTitle?: string,
  supportModifyCountryCode: boolean,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  upliftAdditionalInfoLink?: string,
  upliftAdditionalMessaging?: string,
  upliftDisabledPlacement?: DynamicPlacementResponse,
  userAddressInfo?: AccountContactInfoType
};

type State = {
  selectedCreditCardStatuses: string[],
  showSecurityCode: boolean
};

export class PaymentForm extends React.Component<Props, State> {
  static defaultProps = {
    clickCancelButtonFn: _.noop,
    clickEditButtonFn: _.noop,
    editMode: false,
    enableOperationOnCC: false,
    goBack: _.noop,
    hideGhostCards: false,
    hideSubmitSegment: false,
    onClickContinueButton: _.noop,
    onDeleteCreditCards: _.noop,
    onMakePrimaryCreditCard: _.noop,
    onSelectedCreditCardChanged: _.noop,
    onUpdateGlobalHeader: _.noop,
    shouldEnableSaveCC: true,
    shouldShowApplePay: false,
    shouldShowChaseInstantCreditCard: false,
    shouldShowUplift: false,
    showEditHeader: false,
    subTitle: '',
    supportModifyCountryCode: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCreditCardStatuses: [],
      showSecurityCode: true
    };
  }

  componentDidMount() {
    const { onUpdateGlobalHeader, formData } = this.props;

    onUpdateGlobalHeader(formData.selectedCardId);
    this._showOrHideCVVField(formData.cardNumber);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { editMode } = this.props;

    if (editMode !== nextProps.editMode) {
      this.setState(() => ({ selectedCreditCardStatuses: [] }));
    }

    const {
      formData: { selectedCardId: nextSelectedCardId },
      hideErrorHeaderMsgFn,
      onSelectedCreditCardChanged
    } = nextProps;

    if (this.props.formData.selectedCardId !== nextSelectedCardId) {
      hideErrorHeaderMsgFn();
      onSelectedCreditCardChanged && onSelectedCreditCardChanged(nextSelectedCardId);
    }

    const { savedCreditCards: nextSavedCreditCards } = nextProps;

    if (
      this.props.savedCreditCards !== nextSavedCreditCards &&
      nextSelectedCardId !== RAPID_REWARDS_VISA_ID &&
      nextSavedCreditCards !== NEW_CREDIT_CARD_ID
    ) {
      const shouldReselectCreditCard = !_.some(
        _.concat([nextSavedCreditCards.primaryCard], nextSavedCreditCards.otherCards),
        ['savedCreditCardId', nextSelectedCardId]
      );

      if (shouldReselectCreditCard) {
        this.props.onChange(
          'selectedCardId',
          getDefaultValueForSelectedCreditCard(nextSavedCreditCards, nextProps.shouldShowChaseInstantCreditCard)
        );
      }
    }
  }

  _selectCreditCardCheckBox = (creditCardId: string) => {
    const { selectedCreditCardStatuses } = this.state;

    if (_.includes(selectedCreditCardStatuses, creditCardId)) {
      const index = _.indexOf(selectedCreditCardStatuses, creditCardId);

      this.setState({
        selectedCreditCardStatuses: [
          ...selectedCreditCardStatuses.slice(0, index),
          ...selectedCreditCardStatuses.slice(index + 1)
        ]
      });
    } else {
      this.setState({
        selectedCreditCardStatuses: [...selectedCreditCardStatuses, creditCardId]
      });
    }
  };

  _selectGhostCard = (selectedGhostCardId: string) => {
    const { formId, updateFormDataValueFn } = this.props;

    updateFormDataValueFn &&
      updateFormDataValueFn(formId, { selectedGhostCardId, selectedCardId: selectedGhostCardId });
  };

  renderSubmitSegment = () => (
    <Segment className="payment-form--footer" color="blue" inverted>
      <div className="summary-footer">
        <p className="summary-footer--verbiage">{i18n('AIR_BOOKING__SUMMARY_PAYMENT__KIND_REMINDER_MESSAGE')}</p>
        <div className="summary-footer__nav">
          <Button className="continue" ref="continueButton" type="submit" color="yellow" size="larger" fluid>
            Continue
          </Button>
        </div>
      </div>
    </Segment>
  );

  _shouldShowEditButton = (
    primaryCard: ?PaymentSavedCreditCard,
    selectedCard: string,
    editMode: boolean,
    enableOperationOnCC: boolean
  ) =>
    enableOperationOnCC &&
    !editMode &&
    !(selectedCard === NEW_CREDIT_CARD_ID || selectedCard === RAPID_REWARDS_VISA_ID) &&
    !_.isEmpty(primaryCard);

  _shouldShowCancelButton = (selectedCard: string, editMode: boolean) =>
    !editMode && (selectedCard === NEW_CREDIT_CARD_ID || selectedCard === RAPID_REWARDS_VISA_ID);

  _shouldShowBackToTop = (selectedCardId: string) => {
    const { savedCreditCards, enableOperationOnCC } = this.props;

    return shouldShowBackToTopButton(selectedCardId, savedCreditCards, enableOperationOnCC);
  };

  _onClickCancelButton = () => {
    const { editMode, clickCancelButtonFn, goBack } = this.props;

    editMode ? clickCancelButtonFn() : goBack();
  };

  _renderEditHeader() {
    const {
      subTitle,
      enableOperationOnCC,
      savedCreditCards: { primaryCard },
      editMode,
      clickEditButtonFn,
      formData
    } = this.props;

    const shouldShowEditButton = this._shouldShowEditButton(
      primaryCard,
      formData.selectedCardId,
      editMode,
      enableOperationOnCC
    );
    const shouldShowCancelButton = this._shouldShowCancelButton(formData.selectedCardId, editMode);

    const editButton = {
      name: i18n('SHARED__BUTTON_TEXT__EDIT'),
      onClick: clickEditButtonFn
    };

    const cancelButton = {
      name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
      onClick: this._onClickCancelButton
    };

    let leftButtons;

    if (shouldShowEditButton) {
      leftButtons = [editButton];
    } else if (shouldShowCancelButton) {
      leftButtons = [cancelButton];
    }

    const doneButton = {
      name: i18n('SHARED__BUTTON_TEXT__DONE'),
      type: 'submit'
    };
    const rightButtons = [editMode ? cancelButton : doneButton];

    return (
      <PageHeaderWithButtons
        title="Payment Method"
        subTitle={subTitle}
        titleInCenter={enableOperationOnCC}
        leftButtons={leftButtons}
        rightButtons={rightButtons}
      />
    );
  }

  _backToTop(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();
  }

  _getCreditCardEditButtons() {
    const { selectedCreditCardStatuses } = this.state;
    const { savedCreditCards } = this.props;

    const buttonMap = toEditModeButtonStatus(savedCreditCards, selectedCreditCardStatuses);

    return _.map(buttonMap, (enable, buttonName: string) => ({
      id: buttonName,
      text: buttonText[buttonName],
      enable
    }));
  }

  _bottomBarClick = (id: string) => {
    const { PRIMARY, DELETE, UPDATE } = buttonText;
    const { selectedCreditCardStatuses } = this.state;
    const { onMakePrimaryCreditCard, onDeleteCreditCards, onUpdateCreditCard } = this.props;

    const creditCardIds = selectedCreditCardStatuses;

    const creditCardHandlers = {
      [PRIMARY]: () => {
        onMakePrimaryCreditCard && onMakePrimaryCreditCard(creditCardIds[0]);
      },
      [UPDATE]: () => {
        onUpdateCreditCard && onUpdateCreditCard(creditCardIds[0]);
      },
      [DELETE]: () => {
        onDeleteCreditCards && onDeleteCreditCards(creditCardIds);
      }
    };

    creditCardHandlers[buttonText[id]]();
  };

  _onUseNewCreditCardChange = () => {
    const { formId, clearFormDataByIdFn, updateFormDataValueFn, userAddressInfo, formData } = this.props;

    if (userAddressInfo) {
      const transformedUserAddress = transformContactInfoToBillingAddressFormData(userAddressInfo);
      const formIsBlank = _.isEmpty(
        _.omit(formData, [
          'selectedCardId',
          'selectedGhostCardId',
          'chasePhoneCountryCode',
          'isoCountryCode',
          'phoneCountryCode',
          'expiration'
        ])
      );

      formIsBlank && updateFormDataValueFn(formId, transformedUserAddress);
    } else {
      clearFormDataByIdFn(formId);
    }
  };

  _showOrHideCVVField = (fieldValue: string) => {
    const { formId } = this.props;
    const showSecurityCode = doesNewCreditCardNeedCVV(fieldValue);

    if (!showSecurityCode) {
      store.dispatch(FormDataActions.updateFormFieldDataValue(formId, 'securityCode', ''));
    }
    this.setState({ showSecurityCode });
  };

  render() {
    const {
      editMode,
      enableOperationOnCC,
      formData,
      hideGhostCards,
      hideSubmitSegment,
      isWebView,
      onClickApplePayButton,
      onClickPayPalButton,
      onClickUpliftButton,
      savedCreditCards,
      shouldDisableUplift,
      shouldEnableSaveCC,
      shouldShowApplePay,
      shouldShowChaseInstantCreditCard,
      shouldShowUplift,
      showEditHeader,
      supportModifyCountryCode,
      upliftAdditionalInfoLink,
      upliftAdditionalMessaging,
      upliftDisabledPlacement
    } = this.props;

    const { selectedCreditCardStatuses, showSecurityCode } = this.state;
    const shouldRenderSubmitSegment = !(hideSubmitSegment || editMode);

    return (
      <Form
        formId={this.props.formId}
        className={cx('payment-form', { 'payment-form_edit': hideSubmitSegment })}
        onSubmit={this.props.onSubmit}
      >
        {showEditHeader && this._renderEditHeader()}
        <CreditCardFields
          editMode={editMode}
          hideGhostCards={hideGhostCards}
          names={['selectedCardId', 'chasePhoneNumber', 'chasePhoneCountryCode']}
          onClickApplePayButton={({ selectedCardId }) =>
            !editMode && onClickApplePayButton && onClickApplePayButton({ selectedCardId })
          }
          onClickPayPalButton={({ selectedCardId }) =>
            !editMode && onClickPayPalButton && onClickPayPalButton({ selectedCardId })
          }
          onClickUpliftButton={({ selectedCardId }) =>
            !editMode && onClickUpliftButton && onClickUpliftButton({ selectedCardId })
          }
          onSelectCreditCardCheckBox={this._selectCreditCardCheckBox}
          onSelectGhostCard={this._selectGhostCard}
          onUseNewCreditCardChange={this._onUseNewCreditCardChange}
          savedCreditCards={savedCreditCards}
          selectedCreditCardId={formData.selectedCardId}
          selectedCreditCardStatuses={selectedCreditCardStatuses}
          shouldDisableUplift={shouldDisableUplift}
          shouldShowApplePay={shouldShowApplePay}
          shouldShowChaseInstantCreditCard={shouldShowChaseInstantCreditCard}
          shouldShowUplift={shouldShowUplift}
          upliftAdditionalInfoLink={upliftAdditionalInfoLink}
          upliftAdditionalMessaging={upliftAdditionalMessaging}
          upliftDisabledPlacement={upliftDisabledPlacement}
        />
        {formData.selectedCardId === NEW_CREDIT_CARD_ID && (
          <PaymentInputFields
            names={[
              'intentToStore',
              'isoCountryCode',
              'addressLine1',
              'addressLine2',
              'city',
              'stateProvinceRegion',
              'zipOrPostalCode',
              'phoneNumber',
              'phoneCountryCode',
              'expiration',
              'nameOnCard',
              'securityCode',
              'cardNumber'
            ]}
            showSaveCCButton={enableOperationOnCC && shouldEnableSaveCC}
            showSecurityCode={showSecurityCode}
            supportModifyCountryCode={supportModifyCountryCode}
            onCreditCardChange={this._showOrHideCVVField}
            isWebView={isWebView}
          />
        )}
        {shouldRenderSubmitSegment && this.renderSubmitSegment()}
        {editMode && (
          <CreditCardsBottomBar buttons={this._getCreditCardEditButtons()} onButtonClick={this._bottomBarClick} />
        )}
      </Form>
    );
  }
}

function getDefaultValueForSelectedCreditCard(
  savedCreditCards,
  shouldShowChaseInstantCreditCard = false,
  shouldShowNewCardSelected = true
) {
  const { primaryCard } = savedCreditCards;
  let defaultSelectedCreditCard = UNSELECTED_CREDIT_CARD;

  if (hasCorporateToken()) {
    ({ selectedCardId: defaultSelectedCreditCard } = getDefaultSelectedPaymentInfo(savedCreditCards, true));
  } else if (shouldShowChaseInstantCreditCard) {
    defaultSelectedCreditCard = RAPID_REWARDS_VISA_ID;
  } else if (primaryCard) {
    defaultSelectedCreditCard = primaryCard.savedCreditCardId;
  } else if (shouldShowNewCardSelected) {
    defaultSelectedCreditCard = NEW_CREDIT_CARD_ID;
  }

  return defaultSelectedCreditCard;
}

export default withForm({
  formValidator: paymentFormValidator,
  autoClearFormData: true,
  defaultValues: (props: Props) => {
    const { formData, savedCreditCards, shouldShowChaseInstantCreditCard } = props;
    const hasAlreadySelectedCreditCard = !!_.get(formData, 'selectedCardId');
    const selectedCardId = hasAlreadySelectedCreditCard
      ? formData.selectedCardId
      : getDefaultValueForSelectedCreditCard(savedCreditCards, shouldShowChaseInstantCreditCard, false);

    return {
      selectedCardId,
      isoCountryCode: 'US',
      phoneCountryCode: 'US',
      chasePhoneCountryCode: 'US'
    };
  }
})(PaymentForm);
