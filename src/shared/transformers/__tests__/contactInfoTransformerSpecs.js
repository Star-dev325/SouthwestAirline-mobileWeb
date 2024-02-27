import { transformToSaveContactMethodRequest } from 'src/shared/transformers/contactInfoTransformer';

describe('contact info transformer', () => {
  context('transformToSaveContactMethodRequest', () => {
    it('should get correct save contact method args from chapi passenger info with EMAIL contact method', () => {
      const contactInfo = {
        number: '4694223678',
        contactEmail: 'kpaxqin@foxmail.com',
        countryCode: '+1',
        contactMethod: 'EMAIL'
      };

      expect(transformToSaveContactMethodRequest(contactInfo)).to.deep.equal({
        contactMethodUpdate: {
          contactMethod: 'EMAIL_ME',
          contactPhone: null,
          contactEmail: 'kpaxqin@foxmail.com'
        }
      });
    });

    it('should get correct save contact method args from chapi passenger info with MAIL contact method', () => {
      const contactInfo = {
        number: '4694223678',
        contactEmail: 'kpaxqin@foxmail.com',
        countryCode: '+1',
        contactMethod: 'MAIL'
      };

      expect(transformToSaveContactMethodRequest(contactInfo)).to.deep.equal({
        contactMethodUpdate: {
          contactMethod: 'EMAIL_ME',
          contactPhone: null,
          contactEmail: 'kpaxqin@foxmail.com'
        }
      });
    });

    it('should get correct save contact method args from chapi passenger info with call contact method', () => {
      const contactInfo = {
        number: '1231321312',
        contactEmail: 'kpaxqin@foxmail.com',
        countryCode: '+1',
        contactMethod: 'CALL'
      };

      expect(transformToSaveContactMethodRequest(contactInfo)).to.deep.equal({
        contactMethodUpdate: {
          contactMethod: 'CALL_ME',
          contactPhone: {
            number: 1231321312,
            countryCodeNumber: 1
          },
          contactEmail: null
        }
      });
    });

    it('should get correct save contact method args from chapi passenger info with text contact method', () => {
      const contactInfo = {
        number: '123999999',
        contactEmail: 'kpaxqin@foxmail.com',
        countryCode: '+297',
        contactMethod: 'TEXT'
      };

      expect(transformToSaveContactMethodRequest(contactInfo)).to.deep.equal({
        contactMethodUpdate: {
          contactMethod: 'TEXT_ME',
          contactPhone: {
            number: 123999999,
            countryCodeNumber: 297
          },
          contactEmail: null
        }
      });
    });

    it("should set country code as USA when user didn't save contact method before", () => {
      const contactInfo = {
        number: '1231321312',
        contactEmail: '',
        countryCode: '',
        contactMethod: 'CALL'
      };

      expect(transformToSaveContactMethodRequest(contactInfo)).to.deep.equal({
        contactMethodUpdate: {
          contactMethod: 'CALL_ME',
          contactPhone: {
            number: 1231321312,
            countryCodeNumber: 1
          },
          contactEmail: null
        }
      });
    });
  });
});
