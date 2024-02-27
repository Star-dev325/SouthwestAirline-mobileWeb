import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

class SwitchButton extends React.Component {
  state = {
    selectedOption: undefined,
    selectedIndex: undefined
  };

  UNSAFE_componentWillMount() {
    const { options, defaultValue, value } = this.props;

    this._createStateFromProps(options, defaultValue || value);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, onSelect } = this.props;

    if (nextProps.value !== value) {
      this._createStateFromProps(nextProps.options, nextProps.value, () => onSelect(this.state.selectedOption));
    }
  }

  _createStateFromProps = (options, value, updateStateCallBack = _.noop()) => {
    if (!_.isUndefined(value)) {
      const selectedOption = this.getSelectedOptionByValue(options, value);

      if (!_.isEmpty(selectedOption)) {
        this._setStateForSelectedIndex(selectedOption, undefined, updateStateCallBack);
      } else {
        this.resetSelectedOptions();
      }
    } else {
      if (_.isArray(options) && options.length) {
        const defaultOption = this.getSelectedOptionByDefaultValue();

        if (defaultOption) {
          this._setStateForSelectedIndex(defaultOption, undefined, updateStateCallBack);
        } else {
          this.resetSelectedOptions();
        }
      }
    }
  };

  handleClick = (event) => {
    event.preventDefault();

    const { options, onSelect, disabled } = this.props;
    const { selectedOption, selectedIndex } = this.state;

    if (!disabled) {
      let idx = selectedIndex;

      if (_.isArray(options)) {
        idx++;

        if (idx >= options.length) {
          idx = 0;
        }

        this._setStateForSelectedIndex(_.clone(options[idx]), idx, () => onSelect(selectedOption));
      }
    }
  };

  handleItemClick = (idx, event) => {
    event.preventDefault();

    const { disabled, options, onSelect } = this.props;

    if (!disabled) {
      this._setStateForSelectedIndex(_.clone(options[idx]), idx, () => onSelect(this.state.selectedOption));
    }
  };

  _setStateForSelectedIndex = (selectedOption, idx, callBackForSetState) => {
    if (_.isObject(selectedOption)) {
      if (_.isUndefined(idx)) {
        idx = _.indexOf(this.props.options, selectedOption);
      }

      this.setState(
        {
          selectedIndex: idx,
          selectedOption
        },
        callBackForSetState
      );
    }
  };

  resetSelectedOptions = () => {
    this.setState({
      selectedIndex: undefined,
      selectedOption: undefined
    });
  };

  getSelectedOptionByValue = (options, value) => _.find(options, (optionItem) => optionItem.value === value);

  getSelectedOptionByDefaultValue = () => {
    const { disableDefaultSelection, value, options, defaultValue } = this.props;

    if (disableDefaultSelection && _.isEmpty(value)) {
      return undefined;
    }

    return _.find(options, (optionItem) => optionItem.value === defaultValue);
  };

  renderOptions = () => {
    const { isVerticallyAligned, itemClickable, itemRender, options, removeShadows } = this.props;

    return _.map(options, (optionItem, idx) => {
      const { selectedOption } = this.state;
      const isActive = selectedOption && optionItem.value === selectedOption.value;

      return (
        <span
          key={idx}
          className={cx(
            {
              'switch-button--item': true,
              'switch-button--remove-shadow': removeShadows,
              'switch-button_unclickable': isVerticallyAligned,
              active: isActive
            },
            optionItem.className
          )}
          onClick={itemClickable ? (event) => this.handleItemClick(idx, event) : null}
        >
          {itemRender(optionItem.label, isActive)}
        </span>
      );
    });
  };

  render() {
    const { className, disabled, isVerticallyAligned, itemClickable, removeBorder } = this.props;

    return (
      <div
        className={cx(className, {
          'switch-button--align-vertically': isVerticallyAligned,
          'switch-button--disabled': disabled,
          'switch-button--remove-border': removeBorder,
          'switch-button': true
        })}
        onClick={itemClickable ? null : this.handleClick}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

SwitchButton.propTypes = {
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  disableDefaultSelection: PropTypes.bool,
  isVerticallyAligned: PropTypes.bool,
  itemClickable: PropTypes.bool,
  itemRender: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any.isRequired
    })
  ).isRequired,
  removeBorder: PropTypes.bool,
  removeShadows: PropTypes.bool,
  value: PropTypes.any
};

SwitchButton.defaultProps = {
  disableDefaultSelection: false,
  itemRender: (label, isActive = false) => [label, isActive],
  onSelect: () => {},
  options: []
};

export default SwitchButton;
