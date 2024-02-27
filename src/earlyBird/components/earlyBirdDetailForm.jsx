// @flow
import React from 'react';
import _ from 'lodash';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import EarlyBirdPriceFooter from 'src/earlyBird/components/earlyBirdPriceFooter';
import i18n from '@swa-ui/locale';
import EarlyBirdBoundDetailCard from 'src/earlyBird/components/earlyBirdBoundDetailCard';
import EarlyBirdPriceSubtotal from 'src/earlyBird/components/earlyBirdPriceSubtotal';
import { transformToEarlyBirdBoundDetails } from 'src/earlyBird/transformers/earlyBirdBoundsDetailsTransformer';
import { transformToEarlyBirdPriceSubTotal } from 'src/earlyBird/transformers/earlyBirdPriceSubTotalTransformer';
import transformToDefaultValues from 'src/earlyBird/transformers/earlyBirdDetailFormDefaultValuesTransformer';
import earlyBirdDetailFormValidator from 'src/shared/form/formValidators/earlyBirdDetailFormValidator';

import type {
  onClickIneligibleLabelType,
  onChangeEBCheckboxType
} from 'src/shared/form/fields/earlyBirdPassengerCheckbox';
import type {
  EarlyBirdBoundDetailsType,
  EarlyBirdBoundType,
  EarlyBirdPriceSubTotalType
} from 'src/earlyBird/flow-typed/earlyBird.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  onSubmit: (FormData) => void,
  earlyBirdBounds: Array<EarlyBirdBoundType>,
  formData: FormData,
  onClickIneligibleLabel: onClickIneligibleLabelType,
  hideErrorHeaderMsgFn: onChangeEBCheckboxType
};

export class EarlyBirdDetailForm extends React.Component<Props> {
  render() {
    const { formId, onSubmit, earlyBirdBounds, formData, onClickIneligibleLabel, hideErrorHeaderMsgFn } = this.props;

    const boundsDetails = transformToEarlyBirdBoundDetails(earlyBirdBounds);
    const boundsSubTotals = transformToEarlyBirdPriceSubTotal(earlyBirdBounds, formData);
    const totalPrice = addCurrency(..._.map(boundsSubTotals, 'totalBoundPrice'));

    return (
      <Form formId={formId} onSubmit={onSubmit}>
        {boundsDetails &&
          boundsDetails.map(
            (bound: EarlyBirdBoundDetailsType, index: number) =>
              bound && (
                <EarlyBirdBoundDetailCard
                  key={index}
                  boundOrder={`bound_${index}`}
                  boundDetail={bound}
                  onClickIneligibleLabel={onClickIneligibleLabel}
                  onChangeEBCheckbox={hideErrorHeaderMsgFn}
                />
              )
          )}
        <p className="early-bird-detail--message">{i18n('EARLY_BIRD_HAVE_SELECTED_EARLY_BIRD_TIPS')}</p>
        <div className="early-bird-detail--subtotal">
          {boundsSubTotals &&
            boundsSubTotals.map(
              (subTotal: EarlyBirdPriceSubTotalType, index: number) =>
                subTotal && <EarlyBirdPriceSubtotal key={index} subtotal={subTotal} />
            )}
        </div>
        <EarlyBirdPriceFooter buttonText="Continue" total={totalPrice} />
      </Form>
    );
  }
}

export default withForm({
  formValidator: earlyBirdDetailFormValidator,
  autoClearFormData: false,
  defaultValues(props: Props) {
    return transformToDefaultValues(props.earlyBirdBounds);
  }
})(EarlyBirdDetailForm);
