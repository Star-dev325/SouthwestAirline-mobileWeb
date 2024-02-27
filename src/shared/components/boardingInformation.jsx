// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  boardingGate?: string,
  boardingGroup: ?string,
  boardingPosition: ?string
};

const BoardingInformation = (props: Props) => {
  const renderWithBoardingGate = () => {
    const { boardingGate, boardingGroup, boardingPosition } = props;

    return (
      <div className="boarding-information--item-row">
        <div className="boarding-information--item">
          <div className="boarding-information--item-label">{i18n('SHARED__BOARDING_INFORMATION__GATE')}</div>
          <div className="boarding-information--item-info">{boardingGate}</div>
        </div>
        <div className="boarding-information--item">
          <div className="boarding-information--item-label">{i18n('SHARED__BOARDING_INFORMATION__GROUP')}</div>
          <div className="boarding-information--item-info">{boardingGroup}</div>
        </div>
        <div className="boarding-information--item">
          <div className="boarding-information--item-label">{i18n('SHARED__BOARDING_INFORMATION__POSITION')}</div>
          <div className="boarding-information--item-info_right">{boardingPosition}</div>
        </div>
      </div>
    );
  };

  const renderWithoutBoardingGate = () => {
    const { boardingGroup, boardingPosition } = props;

    return (
      <div className="boarding-information--without-gate">
        <span>
          <span className="without-gate--item-label">{i18n('SHARED__BOARDING_INFORMATION__BOARDING_GROUP')}</span>
          <span className="without-gate--item-content"> {boardingGroup} </span>
        </span>
        <span className="without-gate--item-row">
          <span className="without-gate--item-label">{i18n('SHARED__BOARDING_INFORMATION__POSITION')}</span>
          <span className="without-gate--item-content"> {boardingPosition} </span>
        </span>
      </div>
    );
  };

  let content = renderWithoutBoardingGate();

  if (props.boardingGate) {
    content = renderWithBoardingGate();
  }

  return <div className="boarding-info boarding-information center pt5 pb5 mt3">{content}</div>;
};

export default BoardingInformation;
