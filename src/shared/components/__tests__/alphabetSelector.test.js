import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AlphabetSelector from 'src/shared/components/alphabetSelector';

describe('AlphabetSelector', () => {
  const defaultAlphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  let mockScrollTo;

  beforeEach(() => {
    mockScrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render content when "shouldShow" is not present', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.alphabet-selector')).toHaveLength(1);
    expect(container.querySelector('div[data-qa="alpha-select-letter"]')).toBeNull();
  });

  it('should not render content when "shouldShow" is false', () => {
    const { container } = createComponent({
      shouldShow: false
    });

    expect(container.querySelectorAll('.alphabet-selector')).toHaveLength(1);
    expect(container.querySelector('div[data-qa="alpha-select-letter"]')).toBeNull();
  });

  it('should render content when "shouldShow" is true', () => {
    const { container } = createComponent({
      alphabet: defaultAlphabet,
      scrollTo: mockScrollTo,
      shouldShow: true
    });

    expect(container.querySelectorAll('.alphabet-selector')).toHaveLength(1);
    expect(container.querySelectorAll('div[data-qa="alpha-select-letter"]')).toHaveLength(defaultAlphabet.length);
  });

  it('should sort alphabet', () => {
    const alphabet = [...'CBA'];

    const { container } = createComponent({
      alphabet,
      scrollTo: mockScrollTo,
      shouldShow: true
    });

    const letters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

    expect(letters[0].textContent).toEqual('A');
    expect(letters[1].textContent).toEqual('B');
    expect(letters[2].textContent).toEqual('C');
  });

  it('should simulate click on a letter', () => {
    const { container } = createComponent({
      alphabet: defaultAlphabet,
      scrollTo: mockScrollTo,
      shouldShow: true
    });

    const letters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

    fireEvent.click(letters[3]);

    expect(mockScrollTo.mock.calls[0][0]).toBe('D');
  });

  it('should simulate touchMove on letters', () => {
    const { container } = createComponent({
      alphabet: defaultAlphabet,
      scrollTo: mockScrollTo,
      shouldShow: true
    });

    const selector = container.querySelector('.alphabet-selector');
    const letters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

    setLettersTopPosition(letters, 100, 50);

    fireEvent.touchMove(selector, touchMoveEvent({ y: 175 }));

    expect(mockScrollTo.mock.calls[0][0]).toBe('B');
  });

  it('should not call scrollTo when no letters are touched', () => {
    const { container } = createComponent({
      defaultAlphabet,
      scrollTo: mockScrollTo,
      shouldShow: true
    });

    const selector = container.querySelector('.alphabet-selector');
    const letters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

    setLettersTopPosition(letters, 100, 50);

    fireEvent.touchMove(selector, touchMoveEvent({ y: 1 }));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  const touchMoveEvent = ({ x = 0, y = 0 }) => ({
    touches: [{ clientX: x, clientY: y }]
  });

  const setLettersTopPosition = (letters, startingPosition, increment) => {
    letters.forEach((element, index) => {
      const top = startingPosition + increment * index;

      element.getBoundingClientRect = () => ({ top });
    });
  };

  const createComponent = (props = {}) => {
    const defaultProps = {
      alphabet: [],
      scrollTo: jest.fn()
    };

    const finalProps = { ...defaultProps, ...props };

    return render(<AlphabetSelector {...finalProps} />);
  };
});
