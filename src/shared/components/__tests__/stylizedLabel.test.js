import React from 'react';
import StylizedLabel from 'src/shared/components/stylizedLabel';
import { convertBrandColor } from 'src/shared/helpers/productDefinitionsHelper';
import { shallow } from 'enzyme';

jest.mock('src/shared/helpers/productDefinitionsHelper', () => ({ convertBrandColor: jest.fn() }));

describe('StylizedLabel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render default text', () => {
    const wrapper = createComponent();

    expect(wrapper).toMatchSnapshot();
  });

  describe('should render stylized label', () => {
    it('with fonts', () => {
      const value = [
        { label: 'one' },
        { label: 'two', font: 'Fairwater Script' },
        { label: 'three', font: 'Southwest Sans' }
      ];

      const wrapper = createComponent({ value });

      expect(wrapper).toMatchSnapshot();
    });

    it('with primary label colors', () => {
      const brandColor1 = 'brandColor1';
      const brandColor2 = 'brandColor2';
      const primaryLabelColor1 = 'primaryLabelColor1';
      const primaryLabelColor2 = 'primaryLabelColor2';

      convertBrandColor.mockReturnValueOnce(brandColor1).mockReturnValueOnce(brandColor2);

      const value = [
        { label: 'one', primaryLabelColor: primaryLabelColor1 },
        { label: 'two', primaryLabelColor: primaryLabelColor2 }
      ];

      const wrapper = createComponent({ value });

      expect(wrapper).toMatchSnapshot();
      expect(convertBrandColor).toHaveBeenNthCalledWith(1, primaryLabelColor1);
      expect(convertBrandColor).toHaveBeenNthCalledWith(2, primaryLabelColor2);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = { defaultText: 'defaultText' };
    const finalProps = { ...defaultProps, ...props };

    return shallow(<StylizedLabel {...finalProps} />);
  };
});
