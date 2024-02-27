import React from 'react';
import BaggageDetailsModalInfo from 'src/viewReservation/components/baggageDetailsModalInfo';

export const modalInfoCallbackFunction = (modalInfo, index) => (
  <BaggageDetailsModalInfo modalInfo={modalInfo} key={`baggage-details-${index}`} />
);

export const getShowDialogOptions = (modifyBaggageDetails, onClick) => {
  const {
    modalDetails: { buttonText, contentView, infoList, title }
  } = modifyBaggageDetails;

  return {
    buttons: [{ label: buttonText, onClick }],
    className: 'align-left',
    contentView: contentView ? contentView : infoList.map(modalInfoCallbackFunction),
    hasStickyFooterButton: true,
    name: 'baggage-details',
    title
  };
};
