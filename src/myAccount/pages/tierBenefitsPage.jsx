// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getTierBenefits } from 'src/wcm/selectors/tierBenefitsSelectors';
import { retrieveTierBenefits } from 'src/wcm/actions/wcmActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import Icon from 'src/shared/components/icon';
import PageHeader from 'src/shared/components/pageHeader';

import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  retrieveTierBenefitsFn: () => void,
  tierBenefitsContent: {
    title: ?string,
    headings: ?Array<*>,
    categories: ?{ [string]: Array<*> }
  },
  goBack: () => void,
  push: Push
};

export class TierBenefitsPage extends React.Component<Props> {
  componentDidMount() {
    this.props.retrieveTierBenefitsFn();
  }

  _getViewValue = (apiValue: *, color: string) =>
    (_.isBoolean(apiValue) && apiValue ? <span style={{ background: color }} className="active-circle" /> : apiValue);

  _renderHeader = (headings: Array<*>) => (
    <div className="flex" data-qa="tier-benefits-headings">
      {_.map(headings, (heading, index: number) => (
        <div key={index} style={{ background: heading.color }} className="flex6 larger p4 white center">
          {heading.title}
        </div>
      ))}
    </div>
  );

  _renderCategories = (categories: { [string]: Array<*> }, headings: Array<*>) => (
    <div className="flex flex-column">
      {_.map(categories, (value, key: string) => {
        const valuesFromKey = key.split('-');
        const title = valuesFromKey[0];
        const index = parseInt(valuesFromKey[1]);
        const subTitle = _.get(valuesFromKey, '2');

        return (
          <div
            key={index}
            data-qa="tier-benefits-category"
            className={cx('flex flex-cross-center py7 pdkblue center', {
              bgwhite: index % 2 === 0,
              bggray1: index % 2 !== 0
            })}
          >
            <div style={{ color: headings[0].color }} className="flex2 medium">
              {this._getViewValue(value[0].value, headings[0].color)}
            </div>
            <div className="flex8 larger flex flex-column">
              <div dangerouslySetInnerHTML={{ __html: title }} />
              <div className="gray4 italic">{subTitle}</div>
            </div>
            <div style={{ color: headings[1].color }} className="flex2 medium">
              {this._getViewValue(value[1].value, headings[1].color)}
            </div>
          </div>
        );
      })}
    </div>
  );

  render() {
    const { title, headings = [], categories = {} } = this.props.tierBenefitsContent;

    return (
      <div className="tier-benefits-page">
        <PageHeader>
          <a href="" onClick={() => this.props.push('/my-account')} ref="gobackIcon" className="goback-link">
            <Icon type="keyboard-arrow-left" />
          </a>
          <span data-qa="tier-benefits-title" className="header">
            {title}
          </span>
        </PageHeader>
        {headings && this._renderHeader(headings)}
        {categories && headings && this._renderCategories(categories, headings)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tierBenefitsContent: getTierBenefits(state)
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, {
    retrieveTierBenefitsFn: retrieveTierBenefits
  })
);

export default enhancers(TierBenefitsPage);
