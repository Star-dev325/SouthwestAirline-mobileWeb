// @flow

import React from 'react';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import { toTitleCase } from 'src/shared/helpers/nameHelper';

type Props = {
  passengers: Array<string>,
  recordLocator: string
};

const PassengersAndRecordLocators = (props: Props) => {
  const { recordLocator, passengers } = props;

  return (
    <div>
      <div className="passengers-record-locators--row">
        <div className="passengers-record-locators--first-column">
          <p className="medium caps ml2">{i18n('CHECK_IN__PASSENGERS')}</p>
        </div>
        <div className="passengers-record-locators--second-column">
          <p className="medium caps mr2 align-right">{i18n('CHECK_IN__CONFIRMATION')}</p>
        </div>
      </div>
      {
        <div data-qa="passengers-and-record-locator" className="passengers-record-locators--row">
          <div className="passengers-record-locators--first-column">
            <div className="larger">
              {_.map(passengers, (passenger, id: number) => (
                <span key={id} data-qa="userName" className="ml2 block nowrap overflow-hidden ellipsis">
                  {toTitleCase(passenger)}
                </span>
              ))}
            </div>
          </div>
          <div className="passengers-record-locators--second-column">
            <p className="larger mr2 align-right">{recordLocator}</p>
          </div>
        </div>
      }
    </div>
  );
};

export default PassengersAndRecordLocators;
