// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

export type SwitcherButtonOptionType = {
  label: string,
  value: *,
  className?: string
};

type State = {
  selectedIndex: ?number,
  selectedOption: ?*
};

type Props = {
  defaultValue?: ?string,
  value?: ?string,
  disabled?: boolean,
  onSelect: (SwitcherButtonOptionType) => void,
  itemClickable?: boolean,
  disableDefaultSelection?: boolean,
  options: Array<SwitcherButtonOptionType>,
  itemRender?: (?string) => ?*,
  className?: string
};

class SwitcherButton extends React.Component<Props, State> {
  static defaultProps = {
    disabled: false,
    onSelect: _.noop,
    itemClickable: false,
    disableDefaultSelection: false,
    options: [],
    itemRender: (label: ?*) => label,
    className: ''
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: undefined,
      selectedOption: undefined
    };
  }

  UNSAFE_componentWillMount() {
    const value = this.props.defaultValue || this.props.value;

    this._createStateFromProps(this.props, value, _.noop);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const nextValue = _.get(nextProps, 'value');
    const stateValue = _.get(this.state, 'selectedOption.value');
    const nextStateValue = _.get(nextState, 'selectedOption.value');

    if (
      !_.isEqual(this.props, nextProps) ||
      (_.isUndefined(this.props.value) &&
        _.isUndefined(nextValue) &&
        _.isUndefined(stateValue) &&
        !_.isEqual(nextStateValue, stateValue)) ||
      !_.isEqual(nextValue, stateValue)
    ) {
      return true;
    }

    return false;
  }

  UNSAFE_componentWillUpdate(nextProps: Props) {
    const nextValue = _.get(nextProps, 'value');

    if (
      !_.isEqual(this.props.value, nextValue) ||
      !_.isEqual(this.props.options, nextProps.options) ||
      (!_.isUndefined(nextValue) && !_.isEqual(nextValue, _.get(this.state, 'selectedOption.value')))
    ) {
      this._createStateFromProps(nextProps, nextValue, this._callOnUpdate);
    }
  }

  _createStateFromProps = (props: Props, value: ?*, updateStateCallBack: () => *) => {
    const { options } = props;

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

  _shouldDisableDefaultSelection = () => this.props.disableDefaultSelection && _.isEmpty(this.props.value);

  handleClick = (evt: *) => {
    evt.preventDefault();

    if (!this.props.disabled) {
      let idx = _.get(this.state, 'selectedIndex', 0);

      if (_.isArray(this.props.options)) {
        idx++;

        if (idx >= this.props.options.length) {
          idx = 0;
        }
        this.updateStateBySelectedOption(this.getSelectedOptionByIndex(idx), idx);
      }
    }
  };

  renderOptions = () =>
    _.map(this.props.options, (optionItem: SwitcherButtonOptionType, idx: number) => {
      const isActive = _.get(this.state, 'selectedOption')
        ? _.isEqual(optionItem.value, _.get(this.state, 'selectedOption.value'))
        : false;

      return (
        <span
          key={idx}
          className={cx(
            {
              'switch-button--item': true,
              active: isActive
            },
            optionItem.className
          )}
          onClick={this.props.itemClickable ? this._handleItemClick.bind(this, idx) : _.noop}
        >
          {this.props.itemRender && this.props.itemRender(optionItem.label)}
        </span>
      );
    });

  _handleItemClick = (idx: number, evt: *) => {
    evt.preventDefault();

    if (!this.props.disabled) {
      this.updateStateBySelectedOption(this.getSelectedOptionByIndex(idx), idx);
    }
  };

  updateSelect = () => {
    const { selectedOption } = this.state;

    selectedOption && this.props.onSelect(selectedOption);
  };

  _setStateForSelectedIndex = (
    selectedOption: ?SwitcherButtonOptionType,
    idx: ?number,
    callBackForSetState: () => *
  ) => {
    if (_.isObject(selectedOption)) {
      if (_.isUndefined(idx)) {
        idx = this.findSelectIndexBySelectedOption(selectedOption);
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

  _callOnUpdate = () => () => {
    this.updateSelect();
  };

  updateStateBySelectedOption = (selectedOption: ?SwitcherButtonOptionType, idx: number) => {
    this._setStateForSelectedIndex(selectedOption, idx, this._callOnUpdate());
  };

  resetSelectedOptions = () => {
    this.setState({
      selectedIndex: undefined,
      selectedOption: undefined
    });
  };

  getSelectedOptionByValue = (options: Array<*>, value: *) =>
    _.find(options, (optionItem) => optionItem.value === value);

  getSelectedOptionByDefaultValue = () => {
    if (this._shouldDisableDefaultSelection()) {
      return undefined;
    }

    return _.find(this.props.options, (optionItem) => optionItem.value === this.props.defaultValue);
  };

  getSelectedOptionByIndex = (idx: number) => _.clone(this.props.options[idx]);

  findSelectIndexBySelectedOption = (selectedOption: ?SwitcherButtonOptionType) => {
    const options = _.get(this.props, 'options', []);

    return _.indexOf(options, selectedOption);
  };

  render() {
    return (
      <div
        className={cx(this.props.className, {
          'switch-button': true,
          'switch-button--disabled': this.props.disabled
        })}
        onClick={this.props.itemClickable ? null : this.handleClick}
      >
        {this.renderOptions()}
      </div>
    );
  }
}

export default SwitcherButton;
