// @flow
import React from 'react';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';

type Props = {
  src?: ?string,
  className?: string,
  alt?: ?string
};

type State = {
  error: boolean
};

export default class ImgThatHidesOnError extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: false
    };
  }

  _onImageError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error || !this.props.src) {
      return null;
    }

    return <img {...filterDOMProps(this.props)} onError={this._onImageError} />;
  }
}
