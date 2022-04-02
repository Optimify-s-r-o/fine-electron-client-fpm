import { faUserPlus } from '@fortawesome/pro-duotone-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as GS from 'constants/globalStyles';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { UserCreateRequest, UserDto } from '../../../../api/generated';
import { Button } from '../../../../components/Form/Button';
import { RoutesPath } from '../../../../constants/routes';
import API from '../../../../utils/api';
import { useApi } from '../../../../utils/hooks/useApi';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { CreateUserForm } from './components/Form';

const CreateUser = () => {
  const { t } = useTranslation( ['portal', 'form', 'toast'] );
  const navigate = useNavigate();
  const [createUser] = useApi<UserDto, UserCreateRequest>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<UserCreateRequest>( {
    resolver: yupResolver(
      Yup.object().shape( {
        userName: Yup.string().required( t( 'form:validation.required' ) ),
        password: Yup.string().required( t( 'form:validation.required' ) )
      } )
    )
  } );

  const onSubmit = async ( data: UserCreateRequest ) => {
    try {
      data.email = data.userName;
      await createUser( () => API.UsersApi.fineProjectManagerApiUsersAdminCreatePost( data ) );
      navigate( RoutesPath.LIST_OF_USERS );
      toast.success( t( 'toast:users.userCreatedSuccessfully' ) );
    } catch ( e ) { }
  };

  return (
    <MainWrapper icon={faUserPlus} title={t( 'portal:menu.createUser' )}>
      <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <CreateUserForm control={control} errors={errors} register={register} />
            </GS.GridItem>
          </GS.GridRow>
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={isSubmitting}>{t( 'form:button.createUser' )}</Button>
        </S.ButtonsWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default CreateUser;
