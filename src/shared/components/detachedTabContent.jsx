// @flow
import React from 'react';
import _ from 'lodash';

type Props = {
  active: number,
  children: *
};

const DetachedTabContent = (props: Props) => {
  const { active, children } = props;
  const activeTabContent = _.find(children, (tabContent: *, index: number) => active === index);

  return <div className="tabs selected">{activeTabContent}</div>;
};

export default DetachedTabContent;
