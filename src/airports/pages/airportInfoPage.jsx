// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { getAirportInfo } from 'src/airports/actions/airportsActions';
import Alert from 'src/airports/components/alert';
import ImageItem from 'src/airports/components/imageItem';
import Item from 'src/airports/components/item';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import type { AirportInfoType } from 'src/airports/flow-typed/airport.types';

type Props = {
  airportInfo: AirportInfoType,
  getAirportInfoFn: (airportCode: string) => void,
  params: {
    code: string
  },
  goBack: () => void
};

export class AirportInfoPage extends React.Component<Props> {
  componentDidMount() {
    const {
      params: { code },
      getAirportInfoFn
    } = this.props;

    getAirportInfoFn(code);
  }

  render() {
    const { airportInfo, goBack } = this.props;

    if (_.isEmpty(airportInfo)) return null;
    const { id, display_name, airport_city_image, airport_city_alt_text, alert, body } = airportInfo;

    return (
      <div className="airport-info">
        <PageHeaderWithButtons title="Airport Info" titleInCenter rightButtons={[{ name: 'Done', onClick: goBack }]} />
        <ImageItem
          title={id}
          subtitle={display_name}
          image={{
            src: airport_city_image,
            alt: airport_city_alt_text
          }}
        />
        {alert.active && (
          <Alert
            icon={{
              src: alert.icon
            }}
            title={alert.title}
            description={alert.text}
          />
        )}
        <div className="item-collection" data-qa="body-objects">
          {body.map((item, index) => (
            <Item
              key={index}
              title={item.title}
              subtitle={item.heading}
              icon={{
                src: item.icon,
                alt: item.icon_alt_text
              }}
              content={item.text}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airportInfo: _.get(state, 'app.airports.airportInfo')
});

const mapDispatchToProps = {
  getAirportInfoFn: getAirportInfo
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass(['bgwhite', 'hide-header']),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirportInfoPage);
