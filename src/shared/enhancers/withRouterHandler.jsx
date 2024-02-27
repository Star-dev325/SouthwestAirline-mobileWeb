// @flow
import React from 'react';
import _ from 'lodash';

const checkQueryList = ['tab=FLIGHT', 'tab=CAR'];

type Location = {
  pathname: string,
  search: string
};

type Props = {
  location: Location
};

const withRouterHandler = (Comp: *) =>
  class WithRouterHandler extends React.Component<*> {
    constructor(props: Props) {
      super(props);
      const { pathname, search } = props.location;

      this.currentLocation = { pathname, search };
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
      const { pathname, search } = nextProps.location;

      this.currentLocation = { pathname, search };
    }

    shouldComponentUpdate() {
      return this._isUrlChanged(this.props.location, this.currentLocation);
    }

    currentLocation: Location;

    _isUrlChanged = (prevLocation: Location, currentLocation: Location) => {
      const { pathname, search } = currentLocation;
      const { pathname: prevPath, search: prevSearch } = prevLocation;

      const isCheckUrl = _.some(checkQueryList, (query) => _.includes(search, query));

      if (isCheckUrl) {
        return `${prevPath}${prevSearch}` !== `${pathname}${search}`;
      }

      return prevPath !== pathname;
    };

    render() {
      return <Comp {...this.props} />;
    }
  };

export default withRouterHandler;
