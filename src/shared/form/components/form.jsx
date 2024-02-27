// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';
import type { Node } from 'react';

type Props = {
  onSubmit: (event: Event) => void,
  formId: string,
  isWidget?: boolean,
  stopSubmitPropagation?: boolean,
  disabled?: boolean,
  className?: string,
  children?: Node
};

export default class Form extends React.Component<Props> {
  static defaultProps = {
    disabled: false,
    stopSubmitPropagation: false,
    isWidget: false
  };

  _debouncedOnSubmit = _.debounce(
    (event: Event) => {
      const { onSubmit } = this.props;

      this._hiddenKeyboard();
      onSubmit(event);
    },
    500,
    {
      leading: true,
      trailing: false
    }
  );

  _onSubmit = (event: Event) => {
    const { stopSubmitPropagation } = this.props;

    stopSubmitPropagation && event && event.stopPropagation();
    event.preventDefault();
    this._debouncedOnSubmit(event);
  };

  _hiddenKeyboard() {
    document.activeElement && document.activeElement.blur();
    // This fixes fixed position elements on iOS < 7.1 (e.g. spinner): http://stackoverflow.com/a/24670746
    setTimeout(() => {
      document.body && window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
    }, 0);
  }

  render() {
    const { className, isWidget, disabled, children, formId, ...restProps } = this.props;

    return (
      <form
        name={formId}
        onSubmit={this._onSubmit}
        className={cx(className, { form: true, widget: isWidget })}
        noValidate
        {...filterDOMProps(_.omit(restProps, 'stopSubmitPropagation', 'onSubmit'))}
      >
        <fieldset disabled={disabled}>{children}</fieldset>
      </form>
    );
  }
}
