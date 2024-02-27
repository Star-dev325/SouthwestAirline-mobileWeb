// @flow
import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import NavItemLink from 'src/shared/components/navItemLink';
import withField from 'src/shared/form/enhancers/withField';
import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { IrnInfoType } from 'src/shared/flow-typed/shared.types';
import i18n from '@swa-ui/locale';

type Props = FieldProps & {
  clickIrnFn: () => void,
  irnInfo: IrnInfoType,
  selectedIrn?: string,
  name: string
};

export class InternalReferenceNumberField extends React.Component<Props> {
  render() {
    const { error, clickIrnFn, irnInfo, selectedIrn } = this.props;
    const {
      companyInternalReferenceNumbers = [],
      travelerInternalReferenceNumbers = [],
      irnRequired,
      alternateIrnAllowed
    } = irnInfo;
    const combinedIrns = companyInternalReferenceNumbers.concat(travelerInternalReferenceNumbers);
    const hasNoIrn = combinedIrns.length === 0;
    const hasOnlyOneIrn = combinedIrns.length === 1;
    const hasNoIcon = irnRequired && !alternateIrnAllowed && hasOnlyOneIrn;
    const hasExclamationIcon = irnRequired && !selectedIrn;
    const optionalSuffix = !irnRequired ? i18n('AIR_BOOKING__CORPORATE_BOOKING__OPTIONAL_SUFFIX') : '';
    const placeholder =
      !irnRequired && alternateIrnAllowed && hasNoIrn
        ? `${i18n('AIR_BOOKING__CORPORATE_BOOKING__IRN')} ${optionalSuffix}`
        : `${i18n('AIR_BOOKING__CORPORATE_BOOKING__SELECT')} ${optionalSuffix}`;
    const className = cx({
      'nav-item-field': true,
      'no-irn-selected': !selectedIrn && _.isEmpty(error) && !hasExclamationIcon
    });

    return (
      <div className="internal-reference-number">
        <dt>{i18n('AIR_BOOKING__CORPORATE_BOOKING__IRN').toUpperCase()}</dt>
        <NavItemLink
          disabled={hasNoIcon}
          onClick={() => !hasNoIcon && clickIrnFn()}
          className={className}
          icon={hasNoIcon ? '' : hasExclamationIcon ? 'exclamation-circle warning' : 'keyboard-arrow-right'}
          iconClassName={hasNoIcon || hasExclamationIcon ? '' : 'nav-item-link--icon'}
        >
          <span className="internal-reference-number--value">{selectedIrn ? selectedIrn : placeholder}</span>
        </NavItemLink>
      </div>
    );
  }
}

export default withField()(InternalReferenceNumberField);
