// @flow
import React from 'react';
import i18n from '@swa-ui/locale';
import ContentLink from 'src/shared/components/contentLink';

type Props = {
  lapInfant: {
    name: string
  },
  body?: string
};

const LapChildConfirmation = (props: Props) => {
  const { lapInfant, body } = props;

  return (
    <>
      <div className="confirmation-trip-header-lap-child">
        <div className="confirmation-trip-header-lap-child--lap-child-icon" />
        <div className="confirmation-trip-header-lap-child--lap-child-info">
          <span className="confirmation-trip-header-lap-child--lap-child-title">
            {i18n('VIEW_RESERVATION__BOARDING_INFO__LAP_CHILD_TITLE')}
          </span>
          <span className="confirmation-trip-header-lap-child--lap-child-name">{lapInfant.name}</span>
        </div>
      </div>
      {body && (
        <div className="confirmation-trip-header--grey-box-message">
          <ContentLink className={'confirmation-trip-header--content-link'} raw={body} />
        </div>
      )}
    </>
  );
};

export default LapChildConfirmation;
