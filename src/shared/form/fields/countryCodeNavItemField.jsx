// @flow
import React from 'react';
import _ from 'lodash';
import withField from 'src/shared/form/enhancers/withField';
import NavItemLink from 'src/shared/components/navItemLink';
import isoCountryCode from 'src/shared/constants/isoCountryCode';

type Props = {
  countryCode: string,
  onLabelClick: () => void
};

class CountryCodeNavItemField extends React.Component<Props> {
  static defaultProps = {
    countryCode: 'US'
  };

  render() {
    const { countryCode, onLabelClick } = this.props;
    const countryName = _.get(isoCountryCode, countryCode);

    return (
      <div data-qa={'country-code-nav-item-field'} className={'country-code-nav-item-field'}>
        <NavItemLink onClick={() => onLabelClick()} className={'input'}>
          <div data-qa={'country-code-nav-item-field-value'} className={'country-code-nav-item-field--value'}>
            {countryName} - {countryCode}
          </div>
        </NavItemLink>
      </div>
    );
  }
}

export default withField()(CountryCodeNavItemField);
