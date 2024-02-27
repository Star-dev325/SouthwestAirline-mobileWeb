// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  label: string,
  spendablePoints?: string,
  onBenefitsClick?: () => void,
  expirationDate: ?string
};

const PtsGroup = (props: Props) => {
  const { label, spendablePoints, onBenefitsClick, expirationDate } = props;

  return (
    <div className="points-group">
      <div className="points-group--col-infos">
        <label className="points-group--col-infos-label">{label}</label>
        {expirationDate && <span>{`${i18n('MY_ACCOUNT__PTS_GROUP__EARNED_THROUGH')} ${expirationDate}`}</span>}
        {expirationDate && onBenefitsClick && <span className="points-group--divider">|</span>}
        {onBenefitsClick && (
          <span className="pblue" data-qa="view-benefits" onClick={onBenefitsClick}>
            {i18n('MY_ACCOUNT__PTS_GROUP__VIEW_BENEFITS')}
          </span>
        )}
      </div>
      {spendablePoints && (
        <div className="points-group--col-points align-right">
          <label className="points-group--col-points-label">{spendablePoints}</label>
          <span>{i18n('MY_ACCOUNT__PTS_GROUP__PTS')}</span>
        </div>
      )}
    </div>
  );
};

export default PtsGroup;
