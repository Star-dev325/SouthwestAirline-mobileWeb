// @flow

import i18n from '@swa-ui/locale';
import React from 'react';
import { userIsConsideredMinor } from 'src/enroll/helpers/minorAgeCalculationHelper';

type Props = {
  dateOfBirth: string,
  minorAgeThreshold: number
};

class AcceptRapidRewardsRulesMessage extends React.Component<Props> {
  render() {
    const { dateOfBirth, minorAgeThreshold } = this.props;
    const userIsMinor = userIsConsideredMinor(dateOfBirth, minorAgeThreshold);

    return (
      <div className="medium ml4">
        {userIsMinor ? (
          <div
            data-qa="enroll-minor-acknowledgement"
            dangerouslySetInnerHTML={{ __html: i18n('MINOR_ACKNOWLEDGE_MESSAGE') }}
          />
        ) : (
          <div
            data-qa="enroll-acknowledgement"
            className="enroll-acknowledgement-link"
            dangerouslySetInnerHTML={{ __html: i18n('RULES_ACKNOWLEDGE_MESSAGE') }}
          />
        )}
      </div>
    );
  }
}

export default AcceptRapidRewardsRulesMessage;
