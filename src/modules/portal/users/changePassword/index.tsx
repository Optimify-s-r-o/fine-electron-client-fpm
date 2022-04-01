import * as GS from 'constants/globalStyles';
import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faLock } from '@fortawesome/pro-duotone-svg-icons';
import { useApi } from '../../../../utils/hooks/useApi';
import { UserChangePasswordRequest, UserDto } from '../../../../api/generated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import API from '../../../../utils/api';
import { ChangeUserPasswordForm } from './components/Form';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../../../constants/routes';

const ChangePassword = () => {
  const { t } = useTranslation(['portal', 'form', 'toast']);
  const navigate = useNavigate();

  const [editUser] = useApi<UserDto, UserChangePasswordRequest>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserChangePasswordRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        oldPassword: Yup.string().required(t('form:validation.required')),
        newPassword: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onSubmit = async (data: UserChangePasswordRequest) => {
    try {
      await editUser(() => API.UsersApi.fineProjectManagerApiUsersPasswordPut(data));
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
