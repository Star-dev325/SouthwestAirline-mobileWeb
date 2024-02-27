// mocked because of circular dependency caused by mktgDataSelectors
jest.mock('src/shared/api/loggingApi');

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import lodashMixin from 'src/shared/mixins/lodashMixin';
import 'src/app/helpers/dayJsSetup';

global.fetch = jest.fn().mockImplementation(() => new Promise((resolve) => resolve('done')));
global.window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });

lodashMixin();
