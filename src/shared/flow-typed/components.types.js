// @flow
export type ButtonType = {
  type?: string,
  color?: string,
  size?: string,
  icon?: string,
  iconLabeled?: boolean | string,
  fluid?: boolean,
  circular?: boolean,
  onClick?: (*) => void,
  className?: string
}
