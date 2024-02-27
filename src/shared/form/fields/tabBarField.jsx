// @flow
import React from 'react';
import _ from 'lodash';
import withField from 'src/shared/form/enhancers/withField';
import Tab from 'src/shared/components/tab';
import TabBar from 'src/shared/components/tabBar';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type TabType = {
  name: string,
  value: string
};

type Props = {
  tabs: Array<TabType>,
  analyticsTrackViewTabFn: (string) => void,
  MWEB_HOMEPAGE_REDESIGN: boolean
} & FieldProps;

export class TabBarField extends React.Component<Props> {
  render() {
    const { tabs, onChange, value, analyticsTrackViewTabFn, MWEB_HOMEPAGE_REDESIGN } = this.props;

    return (
      <TabBar activeKey={value} justified onSelect={onChange} analyticsTrackViewTabFn={analyticsTrackViewTabFn}>
        {_.map(tabs, (tab: TabType, index: number) => (
          <Tab key={index} eventKey={tab.value} MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}>
            {tab.name}
          </Tab>
        ))}
      </TabBar>
    );
  }
}

export default withField()(TabBarField);
