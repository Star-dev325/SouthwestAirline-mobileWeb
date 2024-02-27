import React from 'react';
import { Route } from 'react-router';
import OfferApplyExtend from 'src/chase/pages/offerApplyExtend';
import offerErrorForNative from 'src/chase/pages/offerErrorForNative';

class Chase extends React.Component {
  render() {
    return (
      <div className="chase">
        <Route exact path="/chase/offer/apply" component={OfferApplyExtend} />
        <Route exact path="/chase/offer/error" component={offerErrorForNative} />
      </div>
    );
  }
}

export default Chase;
