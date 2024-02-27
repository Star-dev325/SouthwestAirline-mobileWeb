// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import type { ModalInfoType } from 'src/shared/flow-typed/shared.types';

type Props = {
  modalInfo: ModalInfoType
};

const BaggageDetailsModalInfo = ({ modalInfo: { icon, text } }: Props) => (
  <div className="baggage-details--modal-info-content">
    <Icon className="baggage-details--modal-info-icon" type={icon} />
    <p className="baggage-details--modal-info-text">{text}</p>
  </div>
);

export default BaggageDetailsModalInfo;
