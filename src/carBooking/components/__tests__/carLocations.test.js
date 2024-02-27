import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import CarLocations from 'src/carBooking/components/carLocations';
import * as AlphabetSelectorHelper from 'src/shared/helpers/alphabetSelectorHelper';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarLocations', () => {
  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const noop = () => {};
  let mockScrollToHeader;

  beforeEach(() => {
    mockScrollToHeader = jest.spyOn(AlphabetSelectorHelper, 'scrollToHeader');
    jest.spyOn(AlphabetSelectorHelper, 'getAlphabet').mockReturnValue(alphabet);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render when car locations exist', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should rerender with latest car locations', () => {
    const { container, rerender } = createComponent({ carLocations: [] });
    const newProps = {
      carLocations: [
        {
          airport: {
            airportName: 'Amarillo, TX - AMA',
            code: 'AMA'
          },
          city: 'Amarillo',
          state: 'TX'
        },
        {
          airport: {
            airportName: 'Dallas (Love Field), TX - DAL',
            code: 'DAL'
          },
          city: 'Dallas (Love Field)',
          state: 'TX'
        }
      ],
      onAirportSelect: noop,
      onCancel: noop,
      title: 'title'
    };

    rerender(
      <Provider store={createMockedFormStore()}>
        <CarLocations {...newProps} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should rerender with same car locations', () => {
    const { container, rerender } = createComponent();
    const newProps = {
      carLocations: [
        {
          airport: {
            airportName: 'Amarillo, TX - AMA',
            code: 'AMA'
          },
          city: 'Amarillo',
          state: 'TX'
        },
        {
          airport: {
            airportName: 'Dallas (Love Field), TX - DAL',
            code: 'DAL'
          },
          city: 'Dallas (Love Field)',
          state: 'TX'
        }
      ],
      onAirportSelect: noop,
      onCancel: noop,
      title: 'title'
    };

    rerender(
      <Provider store={createMockedFormStore()}>
        <CarLocations {...newProps} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  describe('Alphabet Selector', () => {
    it('should invoke scrollTo prop', () => {
      const { container } = createComponent();
      const airportGroups = container.querySelectorAll('.airport-group-header');
      const airportGroupsRefs = mockScrollToHeader.mock.calls[0][0];

      expect(mockScrollToHeader).toHaveBeenCalled();
      expect(airportGroups[0].textContent).toEqual(airportGroupsRefs['A'].textContent);
      expect(airportGroups[1].textContent).toEqual(airportGroupsRefs['D'].textContent);
    });

    it('should display alphabet', () => {
      const { container } = createComponent();
      const alphabetLetters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters).toHaveLength(alphabet.length);
    });

    it('should not display on search focus', () => {
      const instance = React.createRef();
      const { container } = createComponent({ ref: instance });

      instance.current._onSearchFocus();
      const alphabetLetters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters).toHaveLength(0);
    });

    it('should not display while searching', () => {
      const instance = React.createRef();
      const { container } = createComponent({ ref: instance });

      instance.current._onSearchChange('search');
      const alphabetLetters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters).toHaveLength(0);
    });

    it('should display when search canceled', () => {
      const instance = React.createRef();
      const { container } = createComponent({ ref: instance });
      const alphabetLetters = container.querySelectorAll('div[data-qa="alpha-select-letter"]');

      instance.current._onSearchFocus();
      instance.current._onSearchChange('search');
      instance.current._onSearchCancel();

      expect(alphabetLetters).toHaveLength(alphabet.length);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      carLocations: [
        {
          airport: {
            airportName: 'Amarillo, TX - AMA',
            code: 'AMA'
          },
          city: 'Amarillo',
          state: 'TX'
        },
        {
          airport: {
            airportName: 'Dallas (Love Field), TX - DAL',
            code: 'DAL'
          },
          city: 'Dallas (Love Field)',
          state: 'TX'
        }
      ],
      onAirportSelect: noop,
      onCancel: noop,
      title: 'title'
    };
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <CarLocations {...mergedProps} />
      </Provider>
    );
  };
});
