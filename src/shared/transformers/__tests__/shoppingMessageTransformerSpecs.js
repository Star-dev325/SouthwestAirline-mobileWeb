import { transformToSGAMessage } from 'src/shared/transformers/shoppingMessageTransformer';
import SgaMessageConstants from 'src/shared/constants/sgaMessageConstants';

const { MESSAGE_GOVERNMENT_APPROVAL, MESSAGE_GOVERNMENT_APPROVAL_TITLE, MESSAGE_GOVERNMENT_APPROVAL_TEXT } =
  SgaMessageConstants;

describe('airChangeShoppingMessageTransformer', () => {
  context('transformToSGAMessage', () => {
    it('should be backwards compatible and return the SGA message correctly when passed separate title and text objects the old way', () => {
      const flightShoppingMessage = [
        {
          key: MESSAGE_GOVERNMENT_APPROVAL_TITLE,
          header: 'sga title'
        },
        {
          key: MESSAGE_GOVERNMENT_APPROVAL_TEXT,
          body: 'sga text'
        }
      ];

      expect(transformToSGAMessage(flightShoppingMessage)).to.be.deep.equal({
        title: 'sga title',
        text: 'sga text'
      });
    });
    it('should correctly return the SGA message when sent the new single-object format with combined title and text properties', () => {
      const flightShoppingMessage = [
        {
          key: MESSAGE_GOVERNMENT_APPROVAL,
          header: 'sga title',
          body: 'sga text'
        }
      ];

      expect(transformToSGAMessage(flightShoppingMessage)).to.be.deep.equal({
        title: 'sga title',
        text: 'sga text'
      });
    });

    it('should return empty object when flightShoppingMessage is empty', () => {
      expect(transformToSGAMessage([])).to.be.deep.equal({});
    });
  });
});
