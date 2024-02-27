// @flow
import React from 'react';
import _ from 'lodash';

import withAbstractPopup from 'src/shared/enhancers/withAbstractPopup';

type Props = {
  closeLabel?: string,
  links: Array<{
    dataQa?: string,
    handler: (*) => void,
    label: string
  }>,
  subtitle?: string,
  onClose: () => void
};

export const BottomLinksPopup = ({ links, onClose, closeLabel, subtitle }: Props) => (
  <div className="mb4">
    <div className="bottom-link-list" key="bottom-link-list">
      {subtitle && <div className="bottom-link-list--subtitle">{subtitle}</div>}
      {_.map(links, (link, index: number) => {
        const { dataQa, label, handler } = link;

        return (
          <a
            key={index}
            className={`bottom-link-list--item ${subtitle ? 'pdkblue' : 'button'}`}
            data-qa={!_.isEmpty(dataQa) ? dataQa : null}
            onClick={() => {
              handler();
              onClose();
            }}
          >
            {label}
          </a>
        );
      })}
    </div>
    <button key="close-button" className="button cancel-button" onClick={onClose}>
      {closeLabel || 'Close'}
    </button>
  </div>
);

export default withAbstractPopup(BottomLinksPopup);
