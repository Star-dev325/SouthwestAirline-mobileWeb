import { fireEvent, render } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import Input from 'src/shared/components/input';
import withFields from 'src/shared/form/enhancers/withFields';
import { noop } from 'src/shared/helpers/jsUtils';

describe('withFields', () => {
  let onChangeStub;

  beforeEach(() => {
    onChangeStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should only pass declared form data to child component', () => {
    const { container } = createComponent(['fieldTwo']);

    expect(container).toMatchSnapshot();
  });

  describe('update values', () => {
    it('should update the value to form when calling onChange through child component', () => {
      const { container } = createComponent(['fieldTwo']);

      fireEvent.change(container.querySelector('input'), { target: { value: 'value2' } });

      expect(onChangeStub).toHaveBeenCalledWith('fieldTwo', 'value2');
    });

    it('should not update the value to form when calling onChange with an undeclared field', () => {
      const { container } = createComponent(['fieldOne']);

      fireEvent.change(container.querySelector('input'), { target: { value: 'value2' } });

      expect(onChangeStub).not.toHaveBeenCalled();
    });
  });

  class FormContextProvider extends React.Component {
    static childContextTypes = {
      form: PropTypes.object
    };

    getChildContext() {
      return {
        form: {
          clearError: noop,
          errors: {},
          formData: { fieldOne: 'value1', fieldTwo: 'value2' },
          onChange: this.props.onChange,
          register: noop,
          unregister: noop
        }
      };
    }

    render() {
      return <div>{this.props.children}</div>;
    }
  }

  function createComponent(names = []) {
    const MockedField = (props) =>
      <Input {...props}
        onChange={(e) => { props.onChange('fieldTwo', e.target.value); }}
      />;
    const ConnectedField = withFields(MockedField);

    return render(
      <FormContextProvider onChange={onChangeStub}>
        <ConnectedField names={names} />
      </FormContextProvider>
    );
  }
});
