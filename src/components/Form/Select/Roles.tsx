import { useTranslation } from 'react-i18next';
import { Control, FieldErrors } from 'react-hook-form';
import { Select } from 'components/Form/Select';
import { Roles } from '_types';

export const RolesSelect = ({
  control,
  errors
}: {
  errors: FieldErrors<any>;
  control: Control<any>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  return (
    <Select
      name={'roles'}
      title={t('form:input.roles')}
      control={control}
      options={[
        { label: t('portal:roles.user'), value: Roles.USER },
        { label: t('portal:roles.admin'), value: Roles.ADMIN },
        { label: t('portal:roles.externalOperator'), value: Roles.EXTERNAL_OPERATOR }
      ]}
      errors={errors}
      isMulti
    />
  );
};
