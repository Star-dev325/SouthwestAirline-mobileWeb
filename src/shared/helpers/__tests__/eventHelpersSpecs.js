import EventEmittter from 'events';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('eventHelpers', () => {
  let EventHelpers;
  let target;
  let stub;

  beforeEach(() => {
    target = new EventEmittter();
    target.addEventListener = target.addListener;
    target.removeEventListener = target.removeListener;
    stub = sinon.stub();
    EventHelpers = require('src/shared/helpers/eventHelpers');
    EventHelpers.addEventListenerOnce(target, 'someEvent', stub);
  });
  afterEach(() => {
    sinon.restore();
  });
  context('addEventListenerOnce', () => {
    it('should call removeEventListener after listener was called', () => {
      target.emit('someEvent');
      target.emit('someEvent');
      expect(stub).to.have.been.calledOnce;
    });

    it('should call stub method with emitted params', () => {
      target.emit('someEvent', { state: { popup: 'open' } });

      expect(stub).to.have.been.calledWith({ state: { popup: 'open' } });
    });
  });
});
