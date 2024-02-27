import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { integrationMount } from 'test/unit/helpers/testUtils';

describe('withConnectedReactRouter', () => {
  describe('params and queries', () => {
    it('should parse params to object format', () => {
      const wrapper = createComponent();

      expect(wrapper.find('MockComponent').prop('params')).toEqual({
        name: 'fisher'
      });
    });

    it(`should convert 'depart' direction param to 'outbound'`, () => {
      const wrapper = createComponent({ location: '/path/depart', path: '/path/:direction' });

      expect(wrapper.find('MockComponent').prop('params')).toEqual({
        direction: 'outbound'
      });
    });

    it(`should convert 'return' direction param to 'inbound'`, () => {
      const wrapper = createComponent({ location: '/path/return', path: '/path/:direction' });

      expect(wrapper.find('MockComponent').prop('params')).toEqual({
        direction: 'inbound'
      });
    });

    it('should pass the direction param through if it is not depart or return', () => {
      const wrapper = createComponent({ location: '/path/outbound', path: '/path/:direction' });

      expect(wrapper.find('MockComponent').prop('params')).toEqual({
        direction: 'outbound'
      });
    });

    it('should parse query to object format', () => {
      const wrapper = createComponent();

      expect(wrapper.find('MockComponent').prop('query')).toEqual({
        foo: 'bar'
      });
    });
  });

  describe('push', () => {
    it('should push to a new page when component calling push prop', () => {
      const wrapper = createComponent();

      const pushProp = wrapper.find('MockComponent').prop('push');

      pushProp('/new/path');

      expect(wrapper.instance().props.history.location.pathname).toEqual('/new/path');
    });

    it('should push to a new page when component colling push prop with params', () => {
      const wrapper = createComponent();

      const pushProp = wrapper.find('MockComponent').prop('push');

      pushProp('/new/path/:name', { name: 'fisher' });

      expect(wrapper.instance().props.history.location.pathname).toEqual('/new/path/fisher');
    });
  });

  describe('replace', () => {
    it('should replace with a new page when component calling replace prop', () => {
      const wrapper = createComponent();

      const replaceProp = wrapper.find('MockComponent').prop('replace');

      replaceProp('/new/path');

      expect(wrapper.instance().props.history.location.pathname).toEqual('/new/path');
    });

    it('should replace with a new page when component colling push prop with params', () => {
      const wrapper = createComponent();

      const replaceProp = wrapper.find('MockComponent').prop('replace');

      replaceProp('/new/path/:name', { name: 'fisher' });

      expect(wrapper.instance().props.history.location.pathname).toEqual('/new/path/fisher');
    });
  });

  function createComponent(props) {
    const MockComponent = () => null;

    return integrationMount({
      location: '/path/fisher?foo=bar',
      path: '/path/:name',
      ...props
    })({}, withConnectedReactRouter(MockComponent));
  }
});
