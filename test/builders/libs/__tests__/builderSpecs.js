const Builder = require('test/builders/libs/builder');

describe('model builder', () => {
  context('initial with empty argument', () => {
    it('should throw error, if argument is empty', () => {
      expect((function() {
        // eslint-disable-next-line no-new
        new Builder();
      })()).to.throw(Error);
    });
  });

  context('with some Model', () => {
    let Model;

    beforeEach(() => {
      Model = function(data) {
        this.key1 = data.key1;
        this.key2 = data.key2;
      };

      Model.prototype.func = function() {
      };
    });

    context('when initial', () => {
      let builder;

      beforeEach(() => {
        builder = new Builder(Model);
      });

      it('should has dataKeys with each keys in model constructor', () => {
        expect(builder.dataKeys).to.be.equal(['key1', 'key2']);
      });

      it('should has withKey func for each keys in model constructor', () => {
        expect(builder.withKey1).to.be.exist;
        expect(builder.withKey2).to.be.exist;
      });
    });

    describe('#set', () => {
      let builder;

      beforeEach(() => {
        builder = new Builder(Model);
      });

      it('should set data by key', () => {
        builder.set('key1', 1);
        expect(builder.data).to.have.property('key1', 1);
      });

      it('should not set data by key which is not in model', () => {
        builder.set('keyNoNeed', 1);
        expect(builder.data.keyNoNeed).to.not.be.exist;
      });
    });

    describe('#defaults', () => {
      let builder;

      beforeEach(() => {
        builder = new Builder(Model);
      });

      it('should set data', () => {
        builder.defaults({
          key1: 1,
          key2: 2
        });

        expect(builder.data).to.be.equal({
          key1: 1,
          key2: 2
        });
      });

      it('should ignore any keys that are not part of the model structure', () => {
        builder.defaults({
          key1: 1,
          key2: 2,
          keyNoNeed: 3
        });

        expect(builder.data).to.be.equal({
          key1: 1,
          key2: 2
        });
      });
    });

    describe('#build', () => {
      it('should return new Model with data', () => {
        const builder = new Builder(Model);

        builder.defaults({
          key1: 1,
          key2: 2
        });

        const model = builder.build();

        expect(model).to.have.property('key1', 1);
        expect(model).to.have.property('key2', 2);
      });
    });
  });
});
