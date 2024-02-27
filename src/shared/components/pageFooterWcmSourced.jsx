// @flow
import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import PageFooterLink from 'src/shared/components/pageFooterLink';

import type { WcmFooterType, WcmFooterRowType } from 'src/shared/flow-typed/shared.types';
import cx from 'classnames';
import i18n from '@swa-ui/locale';

type Props = {
  footerLinkRows: Array<WcmFooterType>,
  className?: string
};

const PageFooterWcmSourced = (props: Props) => {
  const _renderLink = (rowItem: WcmFooterRowType, showSeparator: boolean, key: string) => (
    <PageFooterLink key={key} showSeparator={showSeparator} {...rowItem} />
  );

  const _renderLinks = () =>
    _.map(props.footerLinkRows, (footerRow, rowIndex: number) => (
      <div className="page-footer-wcm--row" key={rowIndex}>
        {_.map(footerRow.linkListItems, (rowItem, index: number) => {
          const showSeparator = footerRow.linkListItems.length > 1 && index < footerRow.linkListItems.length - 1;

          return _renderLink(rowItem, showSeparator, `${index}-${rowIndex}`);
        })}
      </div>
    ));

  return (
    <div className={cx('page-footer-wcm', props.className)}>
      {_renderLinks()}
      <span className="page-footer-wcm--copyright">
        ©{dayjs().year()} {i18n('SHARED__FOOTER__ALL_RIGHTS_RESERVED')}
      </span>
    </div>
  );
};

export default PageFooterWcmSourced;
