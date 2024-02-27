import _ from 'lodash';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('post', () => {
  let post;
  let form;
  const mockElement = function (element) {
    this.type = element;
    this.attributes = {};
    this.children = [];
    this.parentNode = {
      removeChild: sinon.stub()
    };
    this.setAttribute = function (attribute, value) {
      this.attributes[attribute] = value;

      return this;
    };
    this.appendChild = function (child) {
      this.children.push(child);

      return this;
    };
    this.submit = sinon.stub();
  };
  const mockDocument = {
    createElement(element) {
      return new mockElement(element);
    },
    body: new mockElement('body')
  };
  const mockFormProps = {
    path: 'test/path'
  };
  const mockInputFields = {
    origin: 'DAL',
    destination: 'HOU'
  };

  beforeEach(() => {
    post = proxyquire('src/shared/form/helpers/post', {
      'src/shared/helpers/browserObject': {
        default: { document: mockDocument }
      }
    }).default;
  });

  afterEach(() => {
    mockDocument.body.children = [];
  });

  it('should set default form attributes', () => {
    post(mockFormProps, mockInputFields);
    form = mockDocument.body.children[0];

    expect(form.attributes).to.deep.equal({
      action: 'test/path',
      method: 'POST'
    });
  });

  it('should set method and target form attributes when provided', () => {
    post({ ...mockFormProps, method: 'GET', target: '_blank' }, mockInputFields);
    form = mockDocument.body.children[0];

    expect(form.attributes).to.deep.equal({
      action: 'test/path',
      method: 'GET',
      target: '_blank'
    });
  });

  it('should set hidden inputs based on params', () => {
    let index = 0;

    post(mockFormProps, mockInputFields);
    form = mockDocument.body.children[0];

    _.each(mockInputFields, (value, key) => {
      expect(form.children[index].attributes).to.deep.equal({
        name: key,
        type: 'hidden',
        value
      });
      index += 1;
    });
  });

  it('should create submit  button', () => {
    post(mockFormProps, mockInputFields);
    form = mockDocument.body.children[0];

    expect(form.children[form.children.length - 1].attributes).to.deep.equal({
      type: 'submit',
      style: 'display: none;',
      value: 'submitButton'
    });
  });

  it('should submit form', () => {
    post(mockFormProps, mockInputFields);
    form = mockDocument.body.children[0];

    expect(form.submit).to.have.been.calledOnce;
  });

  it('should remove form after submit', () => {
    post(mockFormProps, mockInputFields);
    form = mockDocument.body.children[0];

    expect(form.parentNode.removeChild).to.have.been.calledOnce;
  });

  it('should not create form if params not provided', () => {
    post();
    form = mockDocument.body.children[0];

    expect(form).to.not.exist;
  });
});
