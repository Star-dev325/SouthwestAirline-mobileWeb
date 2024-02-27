// @flow
import React from 'react';
import FlightChangeMessageKey from 'src/airChange/constants/flightChangeMessageKey';
import Icon from 'src/shared/components/icon';
import type { MessageType } from 'src/shared/flow-typed/shared.types';
import {
  convertBackgroundBrandColor,
  convertBrandColor,
  iconTypeMap
} from 'src/shared/helpers/productDefinitionsHelper';

const { SPLIT_PNR_CHANGE_DW_DEP_STATIONS, SPLIT_PNR_CHANGE_DW_RET_STATIONS, SPLIT_PNR_CHANGE_DW_SUMMARY } =
  FlightChangeMessageKey;

type Props = {
  messages: Array<MessageType>
};

const DynamicWaiverMessages = ({ messages }: Props) => {
  const findMessageByKey = (key) => messages && messages.find((message) => message.key === key);
  const splitPnrDynamicWaiverDepartureStationsMessage = findMessageByKey(SPLIT_PNR_CHANGE_DW_DEP_STATIONS);
  const splitPnrDynamicWaiverReturnStationsMessage = findMessageByKey(SPLIT_PNR_CHANGE_DW_RET_STATIONS);
  const splitPnrDynamicWaiverSummaryMessage = findMessageByKey(SPLIT_PNR_CHANGE_DW_SUMMARY);

  const _renderDynamicWaiverSummaryMessage = ({
    body,
    header,
    icon,
    inverseThemeColor,
    primaryThemeColor
  }: MessageType) => {
    const backgroundColor = convertBackgroundBrandColor(inverseThemeColor, 'bggray2');
    const textColor = convertBrandColor(primaryThemeColor, 'red');
    const classnames = `${backgroundColor} ${textColor}`;

    return (
      <div className={classnames}>
        <div className="dynamic-waiver-messages--summary-message">
          <Icon className="dynamic-waiver-messages--summary-message-icon" type={iconTypeMap[icon]} />
          <p className="bold">{header}</p>
        </div>
        <p>{body}</p>
      </div>
    );
  };

  const _renderDynamicWaiverStations = (stationsMessage: MessageType) => {
    const { body, header, inverseThemeColor, primaryThemeColor } = stationsMessage;
    const backgroundColor = convertBackgroundBrandColor(inverseThemeColor, 'bggray2');
    const textColor = convertBrandColor(primaryThemeColor, 'red');
    const classnames = `pt5 ${backgroundColor} ${textColor}`;

    return (
      <div className={classnames}>
        <p className="dynamic-waiver-messages--station-header">{header}</p>
        {body && body.split('.').map((station, index) => <p key={index+station}>{station}</p>)}
      </div>
    );
  };

  return (
    <div className="dynamic-waiver-messages">
      {splitPnrDynamicWaiverSummaryMessage && _renderDynamicWaiverSummaryMessage(splitPnrDynamicWaiverSummaryMessage)}
      {splitPnrDynamicWaiverDepartureStationsMessage &&
        _renderDynamicWaiverStations(splitPnrDynamicWaiverDepartureStationsMessage)}
      {splitPnrDynamicWaiverReturnStationsMessage &&
        _renderDynamicWaiverStations(splitPnrDynamicWaiverReturnStationsMessage)}
    </div>
  );
};

export default DynamicWaiverMessages;
