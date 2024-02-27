// @flow
import type { Node } from 'react';

export type ButtonType = {
  label: string,
  onClick: (*) => void,
  dataQa?: string,
  href?: string,
  dataAnalytics?: string,
  style?: string
};

export type LinkType = {
  dataQa?: string,
  href?: string,
  isExternal?: boolean,
  label: string,
  onClick?: (*) => void,
  style?: string
};

export type DialogOptionsType = VerticalLinksPopupType & ButtonsPopupType;

export type AbstractPopupType = {
  active?: boolean,
  bodyClassName?: string,
  bottom?: boolean,
  children?: *,
  className?: string,
  contentView?: Node,
  error?: *,
  headClassName?: string,
  hasStickyFooterButton?: boolean,
  links?: Array<LinkType>,
  message?: string,
  name?: string,
  onDimmerClick?: (*) => void,
  onViewModalFn?: (*) => void,
  title?: string,
  titleClassName?: string
}

export type VerticalLinksPopupType = AbstractPopupType & {
  onClose?: (*) => void,
  closeLabel?: string,
  closeLabelStyle?: string,
  hideCloseButton?: boolean
};

export type ButtonsPopupType = AbstractPopupType & {
  buttons?: Array<ButtonType>
}

export type DialogType = {
  dialog: DialogOptionsType & {
    verticalLinks?: VerticalLinksPopupType
  }
}
