// @flow

import type { ComponentType } from 'react';

export function getHocDisplayName(hocName: string, WrappedComponent: ComponentType<*>) {
  const name = WrappedComponent.displayName || WrappedComponent.name;

  return name ? `${hocName}(${name})` : hocName;
}
