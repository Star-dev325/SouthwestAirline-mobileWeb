// @flow
import React from 'react';
import i18n from '@swa-ui/locale';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import ContentLink from 'src/shared/components/contentLink';
import URLS from 'src/shared/bootstrap/urls';

const { LAPCHILD } = PassengerTypes;
const { lapChildFAQ } = URLS;

type Props = {
  paxNumber: number,
  type?: string,
  frequentTravelerId?: string
};

const LapChildDisclosure = ({ paxNumber, type, frequentTravelerId }: Props) => (
  <>
    {type === LAPCHILD ? (
      <div className="lap-child-personal-info">
        <div className="lap-child-personal-info-form">
          <p>{`${i18n('AIR_BOOKING__PASSENGERS__TITLE')} ${paxNumber}`}</p>
          <p className="lap-child-personal-info-form--helper-text">{i18n('SHARED__LAP_CHILD__TITLE_LAP_CHILD')}</p>
        </div>
        <p className="lap-child-personal-info--helper-text">
          {i18n('AIR_BOOKING__PASSENGERS__LAPCHILD_INFO')}
          <ContentLink href={lapChildFAQ}>{i18n('AIR_BOOKING__LEARN_MORE')}</ContentLink>
        </p>
        <div className="lap-child-personal-info-form">{i18n('AIR_BOOKING__PASSENGERS__LAPCHILD_PROOF_TITLE')}</div>
        <p className="lap-child-personal-info--helper-text">{i18n('AIR_BOOKING__PASSENGERS__LAPCHILD_PROOF_INFO')}</p>
      </div>
    ) : (
      <div className={frequentTravelerId ? 'lap-child-personal-info--text-above' : 'lap-child-personal-info'}>
        <div className="lap-child-personal-info-form">
          <p>{`${i18n('AIR_BOOKING__PASSENGERS__TITLE')} ${paxNumber}`}</p>
          <p className="lap-child-personal-info-form--helper-text">
            {i18n('SHARED__LAP_CHILD__TITLE_EXCLUDING_LAP_CHILD')}
          </p>
        </div>
      </div>
    )}
  </>
);

export default LapChildDisclosure;
