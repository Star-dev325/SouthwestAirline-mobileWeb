import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { AirportInfoPage } from 'src/airports/pages/airportInfoPage';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';

describe('Airport Info Page', () => {
  let getAirportInfoFnStub;

  beforeEach(() => {
    getAirportInfoFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should render', () => {
    it('AirportInfoPage', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });
  });

  describe('alert', () => {
    it('should display alert when wcm alert active is true', () => {
      const { container } = createComponent();

      expect(container.querySelector('.alert')).toBeInTheDocument();
    });

    it('should not display alert when wcm alert active is false', () => {
      const { container } = createComponent({
        airportInfo: {
          alert: {
            active: false,
            icon: '/content/mkt/images/airport_info/alert.jpg',
            title: 'Airport Alert',
            text: ''
          },
          airport_city_alt_text: 'Picture representing CLE',
          airport_city_image: '/content/mkt/images/airport_info/CLE_aiport_info.jpg',
          display_name: 'Cleveland&#44; OH - CLE',
          id: 'CLE',
          body: []
        }
      });

      expect(container.querySelector('.alert')).not.toBeInTheDocument();
    });
  });

  describe('body', () => {
    it('should display body when body is present', () => {
      const body = [
        {
          heading: 'Concourse B',
          icon: '',
          icon_alt_text: '',
          text: '<p>Gates 8-11<br /><ul><li>Fly By Checkin</li><li>Fly By Security</li></ul>\n</p>',
          title: 'TERMINAL AND GATE'
        }
      ];
      const { container } = createComponent({
        airportInfo: {
          alert: {
            active: true,
            icon: '/content/mkt/images/airport_info/alert.jpg',
            text: '',
            title: 'Airport Alert'
          },
          airport_city_alt_text: 'Picture representing CLE',
          airport_city_image: '/content/mkt/images/airport_info/CLE_aiport_info.jpg',
          display_name: 'Cleveland&#44; OH - CLE',
          id: 'CLE',
          body
        }
      });

      expect(container.querySelector('[data-qa="body-objects"]').querySelector('.item')).toBeInTheDocument();
    });

    it('should not display body when body is not present', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="body-objects"]').querySelector('.item')).not.toBeInTheDocument();
    });
  });

  describe('Done button functionality', () => {
    it('should go to Where We Fly page', () => {
      const goBackStub = jest.fn();
      const { container } = createComponent({ goBack: goBackStub });

      fireEvent.click(container.querySelector('.button'));
      expect(goBackStub).toHaveBeenCalled();
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      airportInfo: defaultAirport,
      getAirportInfoFn: getAirportInfoFnStub,
      params: {
        code: 'CLE'
      },
      goBack: () => {}
    };

    const state = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return integrationRender()(state, AirportInfoPage, combinedProps);
  }

  const defaultAirport = {
    alert: {
      active: true,
      icon: '/content/mkt/images/airport_info/alert.jpg',
      text: '',
      title: 'Airport Alert'
    },
    airport_city_alt_text: 'Picture representing CLE',
    airport_city_image: '/content/mkt/images/airport_info/CLE_aiport_info.jpg',
    display_name: 'Cleveland&#44; OH - CLE',
    id: 'CLE',
    body: []
  };
});
