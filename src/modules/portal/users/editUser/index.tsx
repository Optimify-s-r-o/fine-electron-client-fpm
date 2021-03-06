import * as GS from 'constants/globalStyles';
import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faUser } from '@fortawesome/pro-duotone-svg-icons';
import { useApi } from '../../../../utils/hooks/useApi';
import { EditUserRequest, UserDto } from '../../../../api/generated';
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

  const [editUser] = useApi<UserDto, EditUserRequest>();
  const [getUser, { data }] = useApi<UserDto, EditUserRequest>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<EditUserRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required(t('form:validation.required'))
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
      email: data?.email,
      phoneNumber: data?.phoneNumber
    });
  }, [data, reset]);

  const onSubmit = async (data: EditUserRequest) => {
    try {
      await editUser(() => API.UsersApi.fineProjectManagerApiUsersPut(data));
      navigate(RoutesPath.LIST_OF_USERS);
      toast.success(t('toast:common.changesSavedSuccessfully'));
    } catch (e) {}
  };

  return (
    <MainWrapper icon={faUser} title={t('portal:menu.editUser')}>
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
