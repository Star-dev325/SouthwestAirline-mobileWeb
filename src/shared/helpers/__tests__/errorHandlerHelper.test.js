import { goBackErrorHandler } from 'src/shared/helpers/errorHandlerHelper';
import BrowserObject from 'src/shared/helpers/browserObject';

const { history } = BrowserObject;

describe('errorHandlerHelper', () => {
  describe('goBackErrorHandler', () => {
    it('should trigger history goBack', () => {
      jest.spyOn(history, 'back');

      goBackErrorHandler();

      expect(history.back).toHaveBeenCalled();
    });
  });
});
