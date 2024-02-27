import { pushToPathOnCriteria } from 'src/shared/routeUtils/routeHelper';

describe('RouteHelper', () => {
  describe('pushToPathOnCriteria', () => {
    let pushStub;

    beforeEach(() => {
      pushStub = jest.fn();
    });

    it('should call push with /first-path when shouldPushToFirstPath is true', () => {
      pushToPathOnCriteria(true, '/first-path', '/second-path', pushStub);

      expect(pushStub).toHaveBeenCalledWith('/first-path');
    });

    it('should call push with /second-path when shouldPushToFirstPath is false', () => {
      pushToPathOnCriteria(false, '/first-path', '/second-path', pushStub);

      expect(pushStub).toHaveBeenCalledWith('/second-path');
    });
  });
});
