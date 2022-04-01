import { useTranslation } from 'react-i18next';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import * as GS from 'constants/globalStyles';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { AdminEditUserRequest } from 'api/generated';
import { RolesSelect } from '../../../../../components/Form/Select/Roles';

export const EditUserForm = ({
  control,
  errors,
  register
}: {
  errors: FieldErrors<AdminEditUserRequest>;
  register: UseFormRegister<AdminEditUserRequest>;
  control: Control<AdminEditUserRequest>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput
          errors={errors}
          name={'newEmail'}
          register={register}
          title={t('form:input.email')}
        />
        <TextInput
          errors={errors}
          name={'phoneNumber'}
          register={register}
          title={t('form:table.phone')}
        />
        <RolesSelect control={control} errors={errors} />
      </GS.GridItem>
    </GS.GridRow>
  );
};
