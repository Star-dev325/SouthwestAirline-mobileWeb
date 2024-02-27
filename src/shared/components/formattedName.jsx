// @flow

import React from 'react';
import _ from 'lodash';
import type { Node } from 'react';
import cx from 'classnames';
import { toTitleCase } from 'src/shared/helpers/nameHelper';

type Props = {
  name: | {
        firstName?: string,
        lastName?: string
      }
    | string,
  suffix?: ?string,
  prefixContent?: Node,
  className?: string
};

const _formatName = (name, suffix: ?string) => {
  const fullName = `${_.get(name, 'firstName', '')} ${_.get(name, 'lastName', '')}`;
  const formattedName = toTitleCase(fullName);

  return _appendSuffix(formattedName, suffix);
};

const _appendSuffix = (name: string, suffix: ?string = '') => (!suffix ? name : `${name} ${suffix}`);

const FormattedName = (props: Props) => {
  const { className, prefixContent, name, suffix } = props;

  return (
    <span data-qa="userName" className={cx(className, 'block nowrap overflow-hidden ellipsis')}>
      {prefixContent}
      {typeof name === 'string' ? _appendSuffix(name, suffix) : _formatName(name, suffix)}
    </span>
  );
};

export default FormattedName;
