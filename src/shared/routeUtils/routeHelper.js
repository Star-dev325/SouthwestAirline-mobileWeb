// @flow
import type { Push } from 'src/shared/flow-typed/shared.types';

export const pushToPathOnCriteria = (
  shouldPushToFirstPath: boolean,
  firstPath: string,
  secondPath: string,
  push: Push
) => {
  const path = shouldPushToFirstPath ? firstPath : secondPath;

  push(path);
};
