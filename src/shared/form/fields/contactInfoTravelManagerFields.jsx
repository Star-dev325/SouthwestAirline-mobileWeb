// @flow
import React from 'react';
import cx from 'classnames';
import withFields from 'src/shared/form/enhancers/withFields';
import Fields from 'src/shared/components/fields';
import FormNavItemField from 'src/shared/form/fields/formNavItemField';
import i18n from '@swa-ui/locale';

type Props = {
  clickContactInfoTravelManagerMethodFn: () => void,
  value?: string
};

const ContactInfoTravelManagerFields = (props: Props) => {
  const { clickContactInfoTravelManagerMethodFn, value } = props;
  const placeholder = value ? '' : `${i18n('SHARED__CONTACT_INFO_TRAVEL_MANAGER__ADD')} ${i18n('SHARED__CONTACT_METHOD__OPTIONAL')}`;

  return (
    <Fields type="grouped" label={i18n('SHARED__CONTACT_INFO_TRAVEL_MANAGER__LABEL')}>
      <FormNavItemField
        name={'contactInfoTravelManagerContent'}
        className={`nav-item-field ${cx({ 'no-duty-of-care-info-selected': !value })}`}
        onNavItemClick={clickContactInfoTravelManagerMethodFn}
        placeholder={placeholder}
        value={value}
      />
    </Fields>
  );
};

export default withFields(ContactInfoTravelManagerFields);
