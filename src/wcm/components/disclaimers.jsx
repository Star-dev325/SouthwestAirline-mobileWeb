// @flow
import React from 'react';
import _ from 'lodash';

type Props = {
  disclaimers?: Array<*>
};

const Disclaimers = ({ disclaimers }: Props) =>
  !_.isEmpty(disclaimers) && (
    <div data-qa="disclaimers" className="m6 grey2 italic large">
      {_.map(disclaimers, (disclaimer, key: number) => (
        <p className="mt6 mb6" key={key}>
          {disclaimer.disclaimerText}
        </p>
      ))}
    </div>
  );

export default Disclaimers;
