// @flow
import _ from 'lodash';
import React from 'react';
import type { Footnote } from 'src/shared/flow-typed/shared.types';
import ContentLink from 'src/shared/components/contentLink';

type Props = {
  footnotes: ?Array<Footnote>
};

const Footnotes = (props: Props) => {
  const { footnotes } = props;

  return (
    <div className="footnotes">
      {_.map(footnotes || [], (footnote, index: number) => {
        const { prefix, label } = footnote;

        return (
          <div className="footnote" key={index}>
            {prefix && <span data-qa="footnote-prefix">{prefix}</span>}{' '}
            <ContentLink dataQa="footnote-label" raw={label} />
          </div>
        );
      })}
    </div>
  );
};

export default Footnotes;
