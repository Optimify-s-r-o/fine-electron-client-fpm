import * as GS from 'constants/globalStyles';
import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faLock } from '@fortawesome/pro-duotone-svg-icons';
import { useApi } from '../../../../utils/hooks/useApi';
import { AdminChangePasswordRequest, UserDto } from '../../../../api/generated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import API from '../../../../utils/api';
import { ChangeUserPasswordForm } from './components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../../constants/routes';
import { useEffect } from 'react';

const ChangePassword = () => {
  const { t } = useTranslation(['portal', 'form', 'toast']);

  const { email } = useParams<{ email: string }>();

  const navigate = useNavigate();

  const [editUser] = useApi<UserDto, AdminChangePasswordRequest>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AdminChangePasswordRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        userEmail: Yup.string().required(t('form:validation.required')),
        newPassword: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  useEffect(() => {
    reset({
      userEmail: email as string,
      newPassword: ''
    });
  }, [reset, email]);

  const onSubmit = async (data: AdminChangePasswordRequest) => {
    try {
      await editUser(() => API.UsersApi.fineProjectManagerApiUsersAdminSetPasswordPut(data));
      navigate(RoutesPath.LIST_OF_USERS);
      toast.success(t('toast:common.passwordChangedSuccessfully'));
    } catch (e) {}
  };

  return (
    <MainWrapper icon={faLock} title={t('portal:menu.changeUserPassword')}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <ChangeUserPasswordForm errors={errors} register={register} />
            </GS.GridItem>
          </GS.GridRow>
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={isSubmitting}>{t('form:button.save')}</Button>
        </S.ButtonsWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default ChangePassword;
