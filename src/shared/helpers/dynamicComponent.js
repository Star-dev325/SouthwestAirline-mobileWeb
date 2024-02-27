// @flow
import React from 'react';
import { connect } from 'react-redux';

import type { ComponentType } from 'react';

type Props = {
  toggles: *
};

export default function dynamicComponent(
  ComponentToggleOn: ComponentType<*>,
  ComponentToggleOff: ComponentType<*>,
  toggle: string
) {
  class DynamicComponent extends React.Component<Props, *> {
    render() {
      if (this.props.toggles[toggle]) {
        return <ComponentToggleOn {...this.props} />;
      }

      return <ComponentToggleOff {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({ toggles: state.app.toggles });

  return connect(mapStateToProps, {})(DynamicComponent);
}
