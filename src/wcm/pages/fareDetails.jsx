// @flow
import _ from 'lodash';
import cx from 'classnames';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import React from 'react';
import RouterStore from 'src/shared/stores/routerStore';
import StylizedLabel from 'src/shared/components/stylizedLabel';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { connect } from 'react-redux';
import { getFareDetails } from 'src/wcm/selectors/fareDetailsSelectors';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { Location } from 'react-router';
import type { Push } from 'src/shared/flow-typed/shared.types';

type PageContent = {
  title?: string,
  headings?: Array<*>,
  categories?: { [string]: Array<*> }
};

type Props = {
  pageContent: PageContent,
  goBack: () => void,
  push: Push,
  location: Location
};

export const FareDetails = ({
  pageContent: { title, headings = [], categories: categoriesObject },
  goBack,
  push
}: Props) => {
  const _transitionToAvailablePage = () => {
    if (RouterStore.getPrevState()) {
      goBack();
    } else {
      push(getNormalizedRoute({ routeName: 'index' }));
    }
  };

  const _renderPageHeadings = () => (
    <div className="fare-details--headings_wrapper">
      {_.map(headings, (heading, index: number) => {
        const dividerStyles = heading.textColor && {
          borderColor: heading.textColor
        };

        return (
          <div
            className="fare-details--fare"
            data-qa="fare-details-page-heading"
            key={index}
            style={{
              background: heading.backgroundColor,
              color: heading.textColor || 'white'
            }}
          >
            <div className="fare-details--fare-name_wrapper">
              <span className="fare-details--fare-name">
                <StylizedLabel value={heading.stylizedFareName} defaultText={heading.fareName} />
              </span>
            </div>
            <div className="fare-details--fare-points">
              <div className="fare-details--fare-points_amount" style={dividerStyles}>
                <span>{heading.amountOfPoints}</span>
              </div>
              <div className="fare-details--fare-points_per-dollar">
                <span>{heading.pointsPerDollar}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const _renderCategoriesAndValues = () => (
    <div className="flex flex-column fare-details--categories-and-values">
      {_.map(categoriesObject, (categories: Array<*>, key: string) => {
        const values = key.split('--');
        const categoryTitle = values[0];
        const index = parseInt(values[1]);
        const description = _.get(categories, '0.description', '');

        return (
          <div
            key={index}
            data-qa="fare-details-page-category"
            className={cx('flex flex-cross-center flex-cross-baseline py6 p12 pdkblue', {
              bgwhite: index % 2 === 0,
              bggray2: index % 2 !== 0
            })}
          >
            <div className="flex-column center flex5">
              {_.map(categories, (valuePerFare, idx: number) =>
                (valuePerFare.value ? (
                  <span key={idx} style={{ background: valuePerFare.color }} className="active-circle p4 m2" />
                ) : (
                  <span key={idx} className="p4 m2" />
                ))
              )}
            </div>
            <div className="flex-column flex7 pr5 fare-details--attribute">
              <div className="large" dangerouslySetInnerHTML={{ __html: categoryTitle }} />
              <div
                className="fare-details--attribute-description py3"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="fare-details">
      <PageHeaderWithButtons
        rightButtons={[{ name: 'Done', onClick: _transitionToAvailablePage }]}
        title={title}
        dataQa="fare-details-page-title"
      />
      {_renderPageHeadings()}
      {_renderCategoriesAndValues()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pageContent: getFareDetails()(state)
});

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps), withBodyClass('fare-details-page'));

export default enhancers(FareDetails);
