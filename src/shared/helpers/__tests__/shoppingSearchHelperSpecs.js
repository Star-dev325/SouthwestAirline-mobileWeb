import _ from 'lodash';
import { generateSearchRequest } from 'src/shared/helpers/shoppingSearchHelper';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';

describe('shoppingSearchHelper', () => {
  context('generateSearchRequest', () => {
    let changeShoppingLink;
    let searchRequest;
    let boundSelections;

    before(() => {
      changeShoppingLink = {
        body: [{ boundReference: 'boundReferenceA' }, { boundReference: 'boundReferenceB' }],
        href: 'api href',
        method: 'POST'
      };
      searchRequest = {
        departureAndReturnDate: {
          departureDate: '2018-04-18',
          returnDate: '2018-04-19'
        },
        from: 'ATL',
        to: 'AUS'
      };
      boundSelections = [new BoundSelectionBuilder().build()];
    });

    it('should return with href, method and body', () => {
      const result = generateSearchRequest({
        boundSelections,
        selectedBounds: { firstbound: true },
        searchRequest,
        changeShoppingLink
      });

      expect(result.href).to.equal('api href');
      expect(result.method).to.equal('POST');
      expect(result.body).to.not.be.null;
    });

    context('oneWay', () => {
      it('should return body with only outbound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: true },
          searchRequest,
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-18',
            'origin-airport': 'ATL',
            'destination-airport': 'AUS',
            isChangeBound: true
          }
        });
      });
    });

    context('roundTrip', () => {
      before(() => {
        boundSelections[1] = new BoundSelectionBuilder()
          .withFlightType('RETURN')
          .withFrom('Austin, TX - AUS', 'AUS')
          .withTo('Boise, ID - BOI', 'BOI')
          .withOriginalDate('2018-04-19')
          .build();
      });

      it('should return body with correct outbound and inbound with isChangeBound equal true when select both bound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: true, secondbound: true },
          searchRequest,
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-18',
            'origin-airport': 'ATL',
            'destination-airport': 'AUS',
            isChangeBound: true
          },
          inbound: {
            boundReference: 'boundReferenceB',
            date: '2018-04-19',
            'origin-airport': 'AUS',
            'destination-airport': 'ATL',
            isChangeBound: true
          }
        });
      });

      it('should return body with only outbound with isChangeBound equal true when only select firstbound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: true, secondbound: false },
          searchRequest,
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-18',
            'origin-airport': 'ATL',
            'destination-airport': 'AUS',
            isChangeBound: true
          },
          inbound: {
            boundReference: 'boundReferenceB',
            date: '2018-04-19',
            'origin-airport': 'AUS',
            'destination-airport': 'BOI',
            isChangeBound: false
          }
        });
      });

      it('should return body with outbound with isChangeBound equal false and inbound with isChangeBound equal true when only select secondbound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: false, secondbound: true },
          searchRequest,
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-17',
            'origin-airport': 'BOI',
            'destination-airport': 'AUS',
            isChangeBound: false
          },
          inbound: {
            boundReference: 'boundReferenceB',
            date: '2018-04-19',
            'origin-airport': 'ATL',
            'destination-airport': 'AUS',
            isChangeBound: true
          }
        });
      });
    });

    context('openJaw', () => {
      before(() => {
        boundSelections[1] = new BoundSelectionBuilder()
          .withFrom('Austin, TX - AUS', 'AUS')
          .withTo('Mexico City, Mexico - MEX', 'MEX')
          .withOriginalDate('2018-04-18')
          .build();
      });

      it('should return body with only outbound and using the departure date when select firstbound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: true, secondbound: false },
          searchRequest,
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-18',
            'origin-airport': 'ATL',
            'destination-airport': 'AUS',
            isChangeBound: true
          },
          inbound: {
            boundReference: 'boundReferenceB',
            date: '2018-04-18',
            'origin-airport': 'AUS',
            'destination-airport': 'MEX',
            isChangeBound: false
          }
        });
      });

      it('should return body with both outbound and inbound but only inbound isChangeBound and using the return date when select secondbound', () => {
        const result = generateSearchRequest({
          boundSelections,
          selectedBounds: { firstbound: false, secondbound: true },
          searchRequest: _.merge({}, searchRequest, { from: 'AUS', to: 'HOU' }),
          changeShoppingLink
        });

        expect(result.body).to.deep.equal({
          outbound: {
            boundReference: 'boundReferenceA',
            date: '2018-04-17',
            'origin-airport': 'BOI',
            'destination-airport': 'AUS',
            isChangeBound: false
          },
          inbound: {
            boundReference: 'boundReferenceB',
            date: '2018-04-19',
            'origin-airport': 'AUS',
            'destination-airport': 'HOU',
            isChangeBound: true
          }
        });
      });
    });
  });
});
