// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  dayOfTravelContactInfo: string,
  onContactInfoClick: () => void
};

const DayOfTravelContactSelect = ({ dayOfTravelContactInfo, onContactInfoClick }: Props) => (
  <div className="pt2 day-of-travel-wrapper" onClick={() => onContactInfoClick()} data-qa="day-of-travel-wrapper">
    <div className="flex flex-cross-center flex-wrap">
      <div className="flex flex11 flex-column overflow-hidden">
        <div className="medium gray5 pb2 mt4">{i18n('DAY_OF_TRAVEL__INFO_TITLE')}</div>
        <div className="xlarge block nowrap overflow-hidden ellipsis">
          {dayOfTravelContactInfo || i18n('DAY_OF_TRAVEL__NO_CONTACT_INFO')}
        </div>
      </div>
      <Icon className="xxlarge sltblue flex1 icon" type="pencil" />
    </div>
  </div>
);

export default DayOfTravelContactSelect;
