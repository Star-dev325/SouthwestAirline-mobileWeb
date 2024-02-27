// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import ApplyRapidRewardPointsRadioInputSection from 'src/airBooking/pages/applyRapidRewardPointsRadioInputSection';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';

import type {
  SplitPayLinksType,
  SplitPayRadioOptionsArray,
  TotalPointsAppliedType
} from 'src/airBooking/flow-typed/applyRapidRewards.types';

type Props = {
  formId: string,
  links?: SplitPayLinksType,
  onSubmit: () => void,
  radioOptionSelected?: string,
  selectedSplitPay: ?number,
  splitPayRadioOptions: ?Array<SplitPayRadioOptionsArray>,
  termsAndConditions: string,
  totalPointsApplied?: TotalPointsAppliedType
};

export class ApplyRapidRewardsForm extends React.Component<Props> {
  render() {
    const {
      formId,
      links,
      onSubmit,
      radioOptionSelected,
      selectedSplitPay,
      splitPayRadioOptions,
      termsAndConditions,
      totalPointsApplied
    } = this.props;

    const isApplyPointsBtnDisabled = radioOptionSelected ? totalPointsApplied : !radioOptionSelected;

    return (
      <Form formId={formId} name="apply-rapid-rewards-points--form" onSubmit={onSubmit}>
        <ApplyRapidRewardPointsRadioInputSection
          name="selectedRadioOption"
          selectedSplitPay={selectedSplitPay}
          splitPayRadioOptions={splitPayRadioOptions}
          totalPointsApplied={totalPointsApplied}
        />
        <Segment className="apply-points-section">
          <Button
            className={cx('apply-points-button', {
              'points-button-disabled': isApplyPointsBtnDisabled
            })}
            color="grey"
            fluid
            role="submit"
            size="larger"
            type="submit"
          >
            {totalPointsApplied
              ? i18n('SPLIT_PAY_FORM__POINTS_APPLIED_TEXT')
              : links?.calculateFunds?.labelText || i18n('SPLIT_PAY_PAGE__APPLY_POINTS_BUTTON')}
          </Button>
          <p
            className="split-pay-disclaimer"
            dangerouslySetInnerHTML={{ __html: termsAndConditions || i18n('SPLIT_PAY_PAGE__TERMS_AND_CONDITIONS') }}
          />
        </Segment>
      </Form>
    );
  }
}

export default withForm({ autoClearFormData: false })(ApplyRapidRewardsForm);
