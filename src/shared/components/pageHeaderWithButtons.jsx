// @flow

import type { Node } from 'react';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import PageHeader from 'src/shared/components/pageHeader';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import { history } from 'src/appHistory';

import type { ButtonType } from 'src/shared/flow-typed/components.types';

export type ButtonProps = { name: string } & ButtonType;

type Props = {
  showBackButton: boolean,
  title: Node,
  subTitle?: Node,
  leftButtons?: Array<ButtonProps>,
  rightButtons?: Array<ButtonProps>,
  hidden: boolean,
  titleInCenter?: boolean,
  className?: string,
  dataQa?: string
};

class PageHeaderWithButtons extends React.Component<Props> {
  static defaultProps = {
    showBackButton: false,
    title: '',
    leftButtons: [],
    rightButtons: [],
    titleInCenter: false,
    hidden: false
  };

  _handleGoBackClick() {
    history.goBack();
  }

  _renderButtons(buttons: ?Array<ButtonProps>, type: string) {
    if (buttons instanceof Array) {
      return (
        <ul className={`action-bar-buttons action-bar--${type}-buttons`}>
          {buttons.map((button, index) => {
            const { name, ...props } = button;

            return (
              <li key={index} className="action-bar-buttons--item">
                <Button {...props}>{name}</Button>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  render() {
    const { className, showBackButton, title, subTitle, hidden, leftButtons, rightButtons, titleInCenter, dataQa } =
      this.props;
    const titleAlignCenter = titleInCenter || !!showBackButton || !_.isEmpty(leftButtons);

    return (
      <PageHeader hidden={hidden} className={cx(className, 'action-bar')}>
        {showBackButton ? (
          <div onClick={this._handleGoBackClick} className="goback-link">
            <Icon type="keyboard-arrow-left" />
          </div>
        ) : (
          this._renderButtons(leftButtons, 'left')
        )}

        <div className="action-bar--container">
          <div className={cx({ 'action-bar--title-align-center': titleAlignCenter }, 'action-bar--title')}>
            <span className="action-bar--main-title" data-qa={dataQa}>
              {title}
            </span>
            <span className="action-bar--sub-title">{subTitle}</span>
          </div>
        </div>

        {this._renderButtons(rightButtons, 'right')}
      </PageHeader>
    );
  }
}

export default PageHeaderWithButtons;
