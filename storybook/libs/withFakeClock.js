import React from 'react';

import FakeClock from 'test/unit/helpers/fakeClock';

const InnerComponent = (props) => props.story();

export const withFakeClock = (fakeTime) => (story) => {
  class WithFakeClock extends React.Component {
    UNSAFE_componentWillMount() {
      FakeClock.setTimeTo(fakeTime);
    }

    render() {
      return <InnerComponent {...this.props} />;
    }

    componentWillUnmount() {
      FakeClock.restore();
    }
  }

  return <WithFakeClock story={story} />;
};
