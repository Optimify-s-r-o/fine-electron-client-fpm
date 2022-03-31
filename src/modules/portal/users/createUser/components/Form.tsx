import { useTranslation } from 'react-i18next';
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import * as GS from 'constants/globalStyles';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { UserCreateRequest } from 'api/generated';
import { PasswordInput } from 'components/Form/Input/Password';

export const CreateUserForm = ({
  errors,
  control,
  register,
  watch
}: {
  errors: FieldErrors<UserCreateRequest>;
  register: UseFormRegister<UserCreateRequest>;
  control: Control<UserCreateRequest>;
  watch: UseFormWatch<UserCreateRequest>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput
          errors={errors}
          name={'userName'}
          register={register}
          title={t('form:input.email')}
        />
        <TextInput
          errors={errors}
          name={'phoneNumber'}
          register={register}
          title={t('form:table.phone')}
        />
        <PasswordInput
          errors={errors}
          name={'password'}
          register={register}
          title={t('form:input.password')}
        />
        ROLES TODO
      </GS.GridItem>
    </GS.GridRow>
  );
};
