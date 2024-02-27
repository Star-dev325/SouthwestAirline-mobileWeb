import createMockStore from 'test/unit/helpers/configureMockStore';

describe('configureMockStore', () => {
  it('should have create mock store configurations', () => {
    const store = createMockStore();

    expect(store()).toBeDefined();
  });
});
