import { UserCreateRequest } from 'api/generated';
import { PasswordInput } from 'components/Form/Input/Password';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import * as GS from 'constants/globalStyles';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RolesSelect } from '../../../../../components/Form/Select/Roles';

export const CreateUserForm = ( {
  errors,
  register,
  control
}: {
  errors: FieldErrors<UserCreateRequest>;
  register: UseFormRegister<UserCreateRequest>;
  control: Control<UserCreateRequest>;
} ) => {
  const { t } = useTranslation( ['auth', 'form', 'common'] );

  return (
    <GS.GridRow columns={2}>
      <GS.GridItem>
        <TextInput
          errors={errors}
          name={'userName'}
          register={register}
          title={t( 'form:input.email' )}
        />
        <TextInput
          errors={errors}
          name={'phoneNumber'}
          register={register}
          title={t( 'form:table.phone' )}
        />
        {/*TODO Richie nebo mara - kontrola ze je heslo heslo delsi nez 5 znaku a ze je zadanej email*/}
        <PasswordInput
          errors={errors}
          name={'password'}
          register={register}
          title={t( 'form:input.password' )}
        />
        <RolesSelect control={control} errors={errors} />
      </GS.GridItem>
    </GS.GridRow>
  );
};
