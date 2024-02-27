import React, { Component } from 'react';
import _ from 'lodash';

const withBodyClass = (className) => (Comp) =>
  class BodyClass extends Component {
    constructor() {
      super();
      this._appendClassName(className);
    }

    componentDidMount() {
      this._appendClassName(className);
    }

    componentWillUnmount() {
      if (_.isArray(className)) {
        className.forEach((arg) => {
          document.body.classList.remove(arg);
        });
      } else if (typeof className === 'string') {
        document.body.classList.remove(className);
      }
    }

    _appendClassName = (classNameProp) => {
      if (_.isArray(classNameProp)) {
        classNameProp.forEach((arg) => {
          !document.body.classList.contains(arg) && document.body.classList.add(arg);
        });
      } else if (typeof classNameProp === 'string') {
        !document.body.classList.contains(classNameProp) && document.body.classList.add(classNameProp);
      }
    };

    render() {
      return <Comp {...this.props} />;
    }
  };

export default withBodyClass;
