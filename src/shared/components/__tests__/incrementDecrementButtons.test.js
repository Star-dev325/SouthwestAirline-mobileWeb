import React from 'react';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import IncrementDecrementButtons from 'src/shared/components/incrementDecrementButtons/incrementDecrementButtons';

describe('IncrementDecrementButtons', () => {
  let wrapper;
  let onIncrementDecrementStub;

  beforeEach(() => {
    wrapper = createComponent();
    onIncrementDecrementStub = jest.fn();
  });

  describe('render', () => {
    it('should render default component correct', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('[icon="minus"]').props()).toHaveProperty('disabled');
    });

    it('should render minus without disabled when value is greater than 1 and min value is 0', () => {
      wrapper = createComponent({ value: 1, minValue: 0 });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with plus & minus disabled when disableDecrement & disableIncrement are true', () => {
      wrapper = createComponent({ disableDecrement: true, disableIncrement: true });

      expect(wrapper.find('[icon="minus"]').props()).toHaveProperty('disabled');
      expect(wrapper.find('[icon="plus"]').props()).toHaveProperty('disabled');
    });

    it('should render with plus disabled when value is greater that maxValue', () => {
      wrapper = createComponent({ value: 9, maxValue: 8 });
  
      expect(wrapper.find('[icon="plus"]').props()).toHaveProperty('disabled');
    });

    it('should render with minus disabled when value is equal to minValue', () => {
      wrapper = createComponent({ value: 1, minValue: 1 });
    
      expect(wrapper.find('[icon="minus"]').props()).toHaveProperty('disabled');
    });
  });

  describe('click', () => {
    it('should trigger onChangeStub when clicked on minus button', () => {
      wrapper = createComponent({ value: 2 });

      click(wrapper.find('Button').at(0));

      expect(onIncrementDecrementStub).toHaveBeenCalledWith(1);
    });

    it('should trigger onChangeStub when clicked on plus button', () => {
      wrapper = createComponent({ value: 1 });

      click(wrapper.find('Button').at(1));

      expect(onIncrementDecrementStub).toHaveBeenCalledWith(2);
    });
  });

  function createComponent({
    value=1,
    isCircular = true,
    onIncrementDecrement = onIncrementDecrementStub,
    ...otherProps
  } = {}) {
    return mount(
      <IncrementDecrementButtons
        isCircular={isCircular}
        value={value}
        onIncrementDecrement={onIncrementDecrement}
        {...otherProps}
      />
    );
  }
});
