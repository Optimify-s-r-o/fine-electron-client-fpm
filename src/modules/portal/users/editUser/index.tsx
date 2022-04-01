import * as GS from 'constants/globalStyles';
import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faUserPlus } from '@fortawesome/pro-duotone-svg-icons';
import { useApi } from '../../../../utils/hooks/useApi';
import { AdminEditUserRequest, UserDto } from '../../../../api/generated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import API from '../../../../utils/api';
import { EditUserForm } from './components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../../constants/routes';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { useEffect } from 'react';

const EditUser = () => {
  const { t } = useTranslation(['portal', 'form', 'toast']);

  const { email } = useParams<{ email: string }>();

  const navigate = useNavigate();

  const [editUser] = useApi<UserDto, AdminEditUserRequest>();
  const [getUser, { data }] = useApi<UserDto, AdminEditUserRequest>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<AdminEditUserRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        newEmail: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  useEffectAsync(async () => {
    if (!email) return;
    await getUser(() => API.UsersApi.fineProjectManagerApiUsersEmailGet(email));
  }, [email]);

  useEffect(() => {
    if (!data) return;

    reset({
      oldEmail: data?.email,
      newEmail: data?.email,
      phoneNumber: data?.phoneNumber,
      roles: data?.userRoles
    });
  }, [data]);

  const onSubmit = async (data: AdminEditUserRequest) => {
    try {
      await editUser(() => API.UsersApi.fineProjectManagerApiUsersAdminUserEditPut(data));
      navigate(RoutesPath.LIST_OF_USERS);
      toast.success(t('toast:users.userCreatedSuccessfully'));
    } catch (e) {}
  };

  return (
    <MainWrapper icon={faUserPlus} title={t('portal:menu.editUser')}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <EditUserForm control={control} errors={errors} register={register} />
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

export default EditUser;
