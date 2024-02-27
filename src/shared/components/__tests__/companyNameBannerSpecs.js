import _ from 'lodash';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import { mount } from 'enzyme';
import React from 'react';

describe('CompanyNameBanner', () => {
  let wrapper;

  it('should return correct company name', () => {
    const selectedCompanyName = 'Dunder Mifflin Paper Company';

    wrapper = createComponent({
      selectedCompanyName
    });
    expect(wrapper.find('.company-name-banner--label')).to.contain.text(selectedCompanyName);
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      selectedCompanyName: 'Company Name'
    };

    return mount(<CompanyNameBanner {..._.merge({}, defaultProps, props)} />);
  };
});
