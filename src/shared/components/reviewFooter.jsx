// @flow
import React from 'react';
import { sitePaths } from 'src/shared/constants/siteLinks';
import i18n from '@swa-ui/locale';

type Props = {
  size?: 'normal' | 'small',
  remainingTravelFundsDisclaimerText?: string
};

const ReviewFooter = (props: Props) => {
  const { size = 'normal', remainingTravelFundsDisclaimerText } = props;
  const showAll = size === 'normal';

  return (
    <div className="review-footer">
      {showAll && <div className="review-footer--verbiage">{i18n('HAZMAT_TEXT')}</div>}
      <ul className="review-footer--links">
        {showAll && (
          <li>
            <a target="_blank" href={sitePaths.HazardousMaterials}>
              {i18n('SHARED__REVIEW_FOOTER_VIEW_MORE_DETAILS_LINK')}
            </a>
          </li>
        )}
        {!!remainingTravelFundsDisclaimerText && (
          <li>
            <div className="review-footer--travel-funds-verbiage">{remainingTravelFundsDisclaimerText}</div>
          </li>
        )}
        <li>
          <a target="_blank" href={sitePaths.termsAndConditions}>
            {i18n('SHARED__REVIEW_FOOTER_TERMS_AND_CONDITIONS_LINK')}
          </a>
          <a target="_blank" href={sitePaths.privacyPolicy}>
            {i18n('SHARED__REVIEW_FOOTER_PRIVACY_POLICY_LINK')}
          </a>
        </li>
        <li>
          <a target="_blank" href={sitePaths.carriageContract}>
            {i18n('SHARED__REVIEW_FOOTER_CONTRACT_OF_CARRIAGE_LINK')}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ReviewFooter;
