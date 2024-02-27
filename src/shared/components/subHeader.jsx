// @flow
import React from 'react';
import PageHeader from 'src/shared/components/pageHeader';

type Props = {
  title: string
};

const SubHeader = (props: Props) => <PageHeader>{props.title}</PageHeader>;

export default SubHeader;
