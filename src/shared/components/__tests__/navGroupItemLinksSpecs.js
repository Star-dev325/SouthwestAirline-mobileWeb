import React from 'react';
import { shallow } from 'enzyme';
import NavGroupItemLinks from 'src/shared/components/navGroupItemLinks';
import { sitePaths } from 'src/shared/constants/siteLinks';

describe('NavGroupItemLinks', () => {
  let navGroupItemLinks;

  beforeEach(() => {
    navGroupItemLinks = shallow(<NavGroupItemLinks />);
  });

  it('should link to the home page', () => {
    expect(navGroupItemLinks.find('NavItemLink')).to.have.props({ link: sitePaths.homePage, children: 'Home' });
  });

  it('should have external link to contact us', () => {
    const contactUsLink = navGroupItemLinks.find('ExternalNavItemLink').at(0);

    expect(contactUsLink).to.have.props({ href: sitePaths.contactUs, children: 'Contact us' });
  });

  it('should have external link to checkin and refund', () => {
    const checkinAndRefundLink = navGroupItemLinks.find('ExternalNavItemLink').at(1);

    expect(checkinAndRefundLink).to.have.props({
      href: sitePaths.checkinAndRefund,
      children: 'Check In & refund information'
    });
  });

  it('should have external link to carriage contract', () => {
    const carriageContractLink = navGroupItemLinks.find('ExternalNavItemLink').at(2);

    expect(carriageContractLink).to.have.props({ href: sitePaths.carriageContract, children: 'Condition of contract' });
  });
});
