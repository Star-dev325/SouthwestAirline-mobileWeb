import chai from 'chai';
import chaiHttp from 'chai-http';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

chai.use(chaiHttp);
global.chai = chai;
global.expect = chai.expect;
configure({ adapter: new Adapter() });
