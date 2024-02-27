import omitSchema from 'src/shared/helpers/formSchemaHelper';

describe('formSchemaHelper', () => {
  context('omitSchemaWithConditionObject', () => {
    let formSchema;

    beforeEach(() => {
      formSchema = {
        name: {
          isRequire: true
        },
        passPort: {
          number: '123'
        }
      };
    });

    it('should not omit any schema field if we do not pass condition object', () => {
      const schema = omitSchema(formSchema);

      expect(schema).to.deep.equal(formSchema);
    });

    it('should omit schema field when the field is false in condition object', () => {
      const omitObject = {
        passPort: false,
        name: true
      };
      const schema = omitSchema(formSchema, omitObject);

      expect(schema).to.deep.equal({
        name: {
          isRequire: true
        }
      });
    });

    it('should not omit field if we do not specify field', () => {
      const omitObject = {
        name: false
      };
      const schema = omitSchema(formSchema, omitObject);

      expect(schema).to.deep.equal({
        passPort: {
          number: '123'
        }
      });
    });
  });
});
