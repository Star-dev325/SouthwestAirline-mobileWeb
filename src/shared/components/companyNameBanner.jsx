// @flow
import React from 'react';

type Props = {
  selectedCompanyName: string
};

const CompanyNameBanner = ({ selectedCompanyName }: Props) => (
  <div className="company-name-banner">
    <div className="company-name-banner--label">{selectedCompanyName}</div>
  </div>
);

export default CompanyNameBanner;
