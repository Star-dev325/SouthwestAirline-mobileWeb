// @flow

import React from 'react';
import _ from 'lodash';
import withFields from 'src/shared/form/enhancers/withFields';
import Fields from 'src/shared/components/fields';
import FormNavItemField from 'src/shared/form/fields/formNavItemField';
import i18n from '@swa-ui/locale';

type Props = {
  clickContactMethodFn: () => void,
  value?: string,
  formData: { contactMethodContent?: string },
  isOptional?: boolean,
  missingContactMethod: boolean
};

const ContactMethodFields = (props: Props) => {
  const {
    clickContactMethodFn,
    formData: { contactMethodContent },
    missingContactMethod,
    isOptional
  } = props;
  let placeholder = '';

  if (_.isEmpty(contactMethodContent)) {
    placeholder = `${i18n('SHARED__CONTACT_METHOD__TITLE')} ${
      isOptional ? i18n('SHARED__CONTACT_METHOD__OPTIONAL') : ''
    }`;
  }

  return (
    <Fields type="grouped" label={i18n('SHARED__CONTACT_METHOD__LABEL')} className="contact-method">
      <FormNavItemField
        name={'contactMethodContent'}
        onNavItemClick={clickContactMethodFn}
        placeholder={placeholder}
        {...(missingContactMethod ? { icon: 'exclamation-circle warning', iconClassName: '' } : {})}
      />
    </Fields>
  );
};

ContactMethodFields.defaultProps = {
  missingContactMethod: false
};

export default withFields(ContactMethodFields);
