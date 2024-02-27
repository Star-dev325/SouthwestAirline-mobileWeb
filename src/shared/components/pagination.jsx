// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';

import Icon from 'src/shared/components/icon';

type Props = {
  totalPageCount: number,
  clickCallback: ({ selected: number }) => void,
  selected: number
};

class Pagination extends Component<Props> {
  static defaultProps = {
    selected: 0
  };

  handlePreviousPage = (event: Event) => {
    event.preventDefault();
    this.props.clickCallback({ selected: this.props.selected - 1 });
  };

  handleNextPage = (event: Event) => {
    event.preventDefault();
    this.props.clickCallback({ selected: this.props.selected + 1 });
  };

  render() {
    const toolbarClasses = cx({
      toolbar: true,
      hidden: this.props.totalPageCount === 1
    });

    const nextClasses = cx({
      'toolbar-next': true,
      invisible: this.props.selected === this.props.totalPageCount - 1
    });

    const previousClasses = cx({
      'toolbar-previous': true,
      invisible: this.props.selected === 0
    });

    const pages = _.range(0, this.props.totalPageCount).map((page, index) => (
      <span key={index} className={cx('page', { active: this.props.selected === page })} />
    ));

    return (
      <div className={toolbarClasses}>
        <div className={previousClasses}>
          <div ref="prevLink" data-qa="prevLink" onClick={this.handlePreviousPage} className="previous-link">
            <Icon type="keyboard-arrow-left" />
          </div>
        </div>
        <div className="toolbar-circle">
          <div className="pager">{pages}</div>
        </div>
        <div className={nextClasses}>
          <div ref="nextLink" data-qa="nextLink" onClick={this.handleNextPage} className="next-link">
            <Icon type="keyboard-arrow-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
