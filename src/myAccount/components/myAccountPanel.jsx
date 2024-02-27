// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import Panel from 'src/shared/components/panel';
import type { Node } from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  heading?: string,
  notEnrolled?: boolean,
  children: Node
};

const MyAccountPanel = (props: Props) => {
  const renderHeader = () => {
    const { heading } = props;

    if (_.isEmpty(heading)) return null;

    return [
      <span key="my" className="pre-text">
        {i18n('MY_ACCOUNT__MY')}
      </span>,
      <span key="text" className="text">
        {heading}
      </span>
    ];
  };

  return (
    <Panel
      className={cx('my-account-panel', { 'not-enrolled': !!props.notEnrolled })}
      defaultExpanded
      header={renderHeader()}
    >
      {props.children}
    </Panel>
  );
};

export default MyAccountPanel;
