import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import * as GS from 'constants/globalStyles';
import { AdminChangePasswordRequest } from 'api/generated';
import { PasswordInput } from '../../../../../components/Form/Input/Password';
import { TextInput } from '../../../../../components/Form/Input/Text/TextInput';

export const ChangeUserPasswordForm = ({
  errors,
  register
}: {
  errors: FieldErrors<AdminChangePasswordRequest>;
  register: UseFormRegister<AdminChangePasswordRequest>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput
          errors={errors}
          name={'userEmail'}
          register={register}
          title={t('form:input.email')}
        />
        <PasswordInput
          errors={errors}
          name={'newPassword'}
          register={register}
          title={t('form:input.newPassword')}
        />
      </GS.GridItem>
    </GS.GridRow>
  );
};
