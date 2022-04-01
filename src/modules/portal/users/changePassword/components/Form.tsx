import { useTranslation } from 'react-i18next';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import * as GS from 'constants/globalStyles';
import { UserChangePasswordRequest } from 'api/generated';
import { PasswordInput } from '../../../../../components/Form/Input/Password';

export const ChangeUserPasswordForm = ({
  errors,
  register
}: {
  errors: FieldErrors<UserChangePasswordRequest>;
  register: UseFormRegister<UserChangePasswordRequest>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <PasswordInput
          errors={errors}
          name={'oldPassword'}
          register={register}
          title={t('form:input.oldPassword')}
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
