import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { BOARDING_PASS_DATA_FOR_REFRESH } = StorageKeys;

const sinon = sandbox.create();

describe('BoardingPassHelper', () => {
  let mockSessionStorage;
  let BoardingPassHelper;

  beforeEach(() => {
    mockSessionStorage = {
      session: {
        set: sinon.stub(),
        get: sinon.stub(),
        remove: sinon.stub()
      }
    };

    BoardingPassHelper = proxyquire('src/shared/helpers/boardingPassHelper', {
      store2: mockSessionStorage
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('setBoardingPassToSession', () => {
    BoardingPassHelper.setBoardingPassToSession({ cool: 'stuff' });

    expect(mockSessionStorage.session.set).to.have.been.calledWith(BOARDING_PASS_DATA_FOR_REFRESH, { cool: 'stuff' });
  });

  it('getBoardingPassFromSession', () => {
    mockSessionStorage.session.get.withArgs(BOARDING_PASS_DATA_FOR_REFRESH).returns({ cooler: 'stuff' });

    expect(BoardingPassHelper.getBoardingPassFromSession()).to.deep.equal({ cooler: 'stuff' });
  });

  it('removeBoardingPassFromSession', () => {
    BoardingPassHelper.removeBoardingPassFromSession();

    expect(mockSessionStorage.session.remove).to.have.been.calledWith(BOARDING_PASS_DATA_FOR_REFRESH);
  });
});
