const _ = require('lodash');

function isInputMaskField(input) {
  try {
    expect(input.find('InputElement'))
      .to.have.prop('mask');

    return true;
  } catch (e) {
    return false;
  }
}

function checkPropValue(wrapper, prop, value) {
  try {
    expect(wrapper).to.have.prop(prop, value);

    return true;
  } catch (e) {
    return false;
  }
}

function enterText(input, newValue, valid = true) {
  const isDisabled = input.find('input').prop('disabled');

  if (isInputMaskField(input) && !isDisabled) {
    return input.find('input').simulate('paste', {
      clipboardData: {
        getData: () => newValue
      }
    });
  } else if (!isDisabled) {
    return input.find('input').simulate('change', {
      target: {
        value: newValue,
        validity: {
          valid
        }
      }
    });
  }
}

function enterTextIntoMaskedField(wrapper, input, value) {
  const maskInput = wrapper.find(input).find('input');

  maskInput.simulate('focus');

  const actualInput = wrapper.find(input).find('input');

  enterText(actualInput, value);

  return wrapper.find(input).find('input').simulate('blur');
}

function enterCheckbox(inputWrapper, value) {
  const isSelected = checkPropValue(inputWrapper, 'initialChecked', true);

  if (isSelected !== value) {
    return inputWrapper.simulate('click');
  }
}

function select(input, targetValue, shouldNotChangeValueWhenInputValueNotChanged) {
  if (typeof targetValue !== 'string' || typeof targetValue !== 'number') {
    targetValue = String(targetValue);
  }

  if (shouldNotChangeValueWhenInputValueNotChanged
    && (input.value === targetValue)) {
    return;
  }

  return input.simulate('change', { target: { value: targetValue } });
}

function submitForm(formWrapper, event) {
  return formWrapper.find('form').at(0).simulate('submit', event);
}

function click(inputWrapper) {
  return inputWrapper.simulate('click');
}

function focus(inputWrapper) {
  return inputWrapper.simulate('focus');
}

function blur(inputWrapper) {
  return inputWrapper.simulate('blur');
}

const getFillFormHelper = (config, formWrapper) => data => {
  _.forEach(data, (value, key) => {
    const keyConfig = config[key];

    if (!keyConfig) {
      console.warn(`you should set config for the key: ${key} or we cannot fill value on it`); // eslint-disable-line no-console

      return;
    }

    const { fillMethod, fieldSelector } = keyConfig;

    const inputWrapper = formWrapper.find(fieldSelector);

    if (!inputWrapper.exists()) {
      console.warn(`input field not found for : ${key}`); // eslint-disable-line no-console

      return;
    }

    try {
      fillMethod(inputWrapper, value);
    } catch (e) {
      console.warn( // eslint-disable-line no-console
        `Please check the fillMethod of field: ${key}, maybe its not compatible with the enzyme wrapper: `
      );
      console.warn(e); // eslint-disable-line no-console
    }
  });
};

module.exports = {
  enterText,
  enterTextIntoMaskedField,
  enterCheckbox,
  select,
  submitForm,
  click,
  focus,
  blur,
  getFillFormHelper,
  checkPropValue
};
