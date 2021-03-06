import { AuthWrapper } from '../../components/AuthWrapper';
import * as S from '../../styled';
import { ExternalLink } from '../../styled';
import { TextInput } from '../../../../components/Form/Input/Text/TextInput';
import { RowEnd } from '../../../../constants/globalStyles';
import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { SignInInput } from '../index';
import { PasswordInput } from '../../../../components/Form/Input/Password';

export const SinInForm = ({
  errors,
  onSubmit,
  handleSubmit,
  loading,
  register
}: {
  errors: FieldErrors<SignInInput>;
  onSubmit: (data: SignInInput) => void;
  handleSubmit: UseFormHandleSubmit<SignInInput>;
  loading: boolean;
  register: UseFormRegister<SignInInput>;
}) => {
  const { t } = useTranslation(['auth', 'form', 'common']);

  const openWebBrowser = async () => {
    await window.API.openWebBrowser('https://www.fine.cz/geotechnicky-software/');
  };

  return (
    <AuthWrapper>
      <S.Title>{t('auth:signIn:title')}</S.Title>

      <S.CreateNewUserWrapper>
        <S.CreateNewUserLabel>{t('auth:signIn.createNewUser')}</S.CreateNewUserLabel>
        <ExternalLink onClick={() => openWebBrowser()}>
          {t('auth:signIn.newUserInstruction')}
        </ExternalLink>
      </S.CreateNewUserWrapper>

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name={'server'}
          register={register}
          title={t('form:input.server')}
          errors={errors}
          tabIndex={1}
        />
        <TextInput
          name={'email'}
          register={register}
          title={t('form:input.email')}
          errors={errors}
          tabIndex={2}
        />
        <PasswordInput
          name={'password'}
          register={register}
          title={t('form:input.password')}
          errors={errors}
          tabIndex={3}
        />
        <RowEnd>
          <Button loading={loading} withMargin>
            {t('form:button.signIn')}
          </Button>
        </RowEnd>
      </S.Form>
    </AuthWrapper>
  );
};
