const FakeClock = require('test/unit/helpers/fakeClock');
const dayjs = require('dayjs');

describe('FakeClock', () => {
  afterEach(FakeClock.restore);

  it('should fake what dayjs objects return', () => {
    FakeClock.setTimeTo('2008-07-04T11:19');

    expect(dayjs().format('YYYY-MM-DDTHH:mm')).to.be.equal('2008-07-04T11:19');
  });

  it('should stop faking after you call restore', () => {
    FakeClock.setTimeTo('2008-07-04T11:19');
    FakeClock.restore();
    expect(dayjs().format('YYYY-MM-DDTHH:mm')).to.not.be.equal('2008-07-04T11:19');
  });
});
