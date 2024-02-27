// @flow
import branch from 'branch-sdk';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { Replace } from 'src/shared/flow-typed/shared.types';

type Props = {
  replace: Replace
};

export const BranchRedirectPage = (props: Props) => {
  branch.data((err, data) => {
    if (data.data_parsed['^destination'].toLowerCase() === 'view_reservation') {
      const recordLocator = data.data_parsed['^record_locator'];
      const firstName = data.data_parsed['^first_name'];
      const lastName = data.data_parsed['^last_name'];

      props.replace(`/view-reservation/trip-details/${recordLocator}`, null, null, { firstName, lastName });
    } else {
      props.replace('/');
    }
  });

  return null;
};

export default withConnectedReactRouter(BranchRedirectPage);
