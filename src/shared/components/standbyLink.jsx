// @flow

import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  enhancedStandbyList: ?Link,
  isNonRevPnr: boolean,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link }) => void,
  viewStandbyList: Link
};

const StandbyLink = (props: Props) => {
  const {
    enhancedStandbyList,
    isNonRevPnr,
    onClickStandbyList,
    viewStandbyList
  } = props;

  return (
    <div className="standby-card--link">
      <a
        data-a="STANDBY"
        onClick={(event) => {
          event.stopPropagation && event.stopPropagation();
          onClickStandbyList({
            isNonRevPnr,
            link: viewStandbyList,
            enhancedLink: enhancedStandbyList
          });
        }}
      >
        {enhancedStandbyList?.labelText || i18n('STANDBY__LIST_LINK')}
      </a>
    </div>
  );
};

export default StandbyLink;
