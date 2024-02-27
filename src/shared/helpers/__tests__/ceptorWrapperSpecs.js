import _ from 'lodash';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';
import { getCeptorConfigWithAmount } from 'test/builders/model/ceptorBuilder';

describe('CeptorWrapper', () => {
  it('should not be null on import', () => {
    expect(CeptorWrapper.instance).to.not.be.null;
  });

  it('should create a new instance', () => {
    const prevWrapper = CeptorWrapper.instance;

    const ceptorConfig = getCeptorConfigWithAmount();
    const wrapper = CeptorWrapper.createInstance(ceptorConfig);

    expect(CeptorWrapper.instance).to.not.be.null;
    expect(prevWrapper).to.not.equal(wrapper);
  });

  it('should get the existing instance', () => {
    const prevWrapper = CeptorWrapper.instance;

    const wrapper = CeptorWrapper.getInstance();

    expect(CeptorWrapper.instance).to.not.be.null;
    expect(prevWrapper).to.equal(wrapper);
  });

  it('should create a new basic instance', () => {
    const prevWrapper = CeptorWrapper.instance;

    const ceptorConfig = getCeptorConfigWithAmount();
    const wrapper = CeptorWrapper.createBaseInstance(ceptorConfig);

    expect(CeptorWrapper.instance).to.not.be.null;
    expect(prevWrapper).to.not.equal(wrapper);
  });

  it('should set and read extension object', () => {
    const fakeExtension = { addInfo: _.noop };

    CeptorWrapper.setExtension(fakeExtension);

    expect(CeptorWrapper.getExtension()).to.eq(fakeExtension);
  });
});
