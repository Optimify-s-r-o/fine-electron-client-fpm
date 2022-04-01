import { useApi } from '../../../../../utils/hooks/useApi';
import { UserDto } from '../../../../../api/generated';
import { useEffectAsync } from '../../../../../utils/useEffectAsync';
import API from '../../../../../utils/api';
import { CardTable } from '../../../../../components/Table/CardTable';
import { Input } from '../../../../../components/Form/Input/styled';
import * as GS from '../../../../../constants/globalStyles';
import { IconButton } from '../../../../../components/Form/Button/IconButton';
import { faArrowRight, faLock, faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { MouseEvent } from 'react';
import { DeleteButton } from '../../../../../components/Form/Button/DeleteButton';
import { toast } from 'react-toastify';
import useModal from '../../../../../utils/hooks/useModal';
import { useTranslation } from 'react-i18next';
import { RoutesPath } from '../../../../../constants/routes';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../../../auth/context/AuthContext';

export const List = () => {
  const modal = useModal();
  const navigate = useNavigate();

  const { t } = useTranslation(['portal', 'form', 'toast']);

  const { isAdmin, user } = useAuthContext();

  const [getUsers, { data, loading }] = useApi<UserDto[]>();
  const [deleteUser] = useApi<UserDto[]>();

  useEffectAsync(async () => {
    await refetch();
  }, []);

  const refetch = async () => {
    await getUsers(() => API.UsersApi.fineProjectManagerApiUsersGet());
  };

  const deleteUserByEmail = (email: string) => async (_e: MouseEvent<HTMLButtonElement>) => {
    modal.closeModal();

    await deleteUser(() => API.UsersApi.fineProjectManagerApiUsersPost({ email }));

    toast.success(t('toast:users.deactivatedSuccessfully'));

    await refetch();
  };

  const onDelete = (r: UserDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    modal.showModal({
      title: t('form:modal.users.deleteHeader'),
      content: <>{t('form:modal.users.deleteContent', { email: r.email })}</>,
      footer: (
        <GS.FloatRight>
          <DeleteButton loading={false} onClick={deleteUserByEmail(r.email)}>
            {t('form:button.deactivateUser')}
          </DeleteButton>
        </GS.FloatRight>
      )
    });
  };

  const onViewUser = (user: UserDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    navigate(`${RoutesPath.PORTAL}/edit-user/${user.email}`);
  };

  const onViewUserByAdmin = (user: UserDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    navigate(`${RoutesPath.PORTAL}/edit-user-by-admin/${user.email}`);
  };

  const onPasswordChange = (user: UserDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    navigate(`${RoutesPath.PORTAL}/user-password/${user.email}`);
  };

  const onPasswordChangeByAdmin = (user: UserDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    navigate(`${RoutesPath.PORTAL}/user-password-by-admin/${user.email}`);
  };

  return (
    <CardTable
      columns={[
        {
          title: t('form:table.email'),
          render: (text: string, _r: UserDto) => <>{text}</>,
          dataIndex: 'email'
        },
        {
          title: t('form:table.phone'),
          render: (text: string, _r: UserDto) => <>{text}</>,
          dataIndex: 'phoneNumber'
        },
        {
          title: t('form:table.state'),
          render: (text: boolean, _r: UserDto) => (
            <>{t(text ? 'form:table.inactive' : 'form:table.active')}</>
          ),
          dataIndex: 'isDisabled'
        },
        {
          title: <Input placeholder={t('form:input.searchPlaceholder')} />,
          dataIndex: 'id',
          render: (t, r: UserDto) => (
            <GS.FloatRight>
              <GS.Gap>
                {isAdmin && (
                  <>
                    <IconButton
                      loading={false}
                      icon={faArrowRight}
                      btnStyle="primary"
                      onClick={onViewUserByAdmin(r)}
                      type="button"
                    />
                    <IconButton
                      loading={false}
                      icon={faLock}
                      onClick={onPasswordChangeByAdmin(r)}
                      type="button"
                    />
                  </>
                )}
                {user?.email === r.email && !isAdmin && (
                  <>
                    <IconButton
                      loading={false}
                      icon={faArrowRight}
                      btnStyle="primary"
                      onClick={onViewUserByAdmin(r)}
                      type="button"
                    />
                    <IconButton
                      loading={false}
                      icon={faLock}
                      onClick={onPasswordChange(r)}
                      type="button"
                    />
                  </>
                )}

                <IconButton loading={false} icon={faTrashCan} onClick={onDelete(r)} type="button" />
              </GS.Gap>
            </GS.FloatRight>
          )
        }
      ]}
      dataSource={data}
      emptyTableText={loading ? t('form:table.loading') : t('form:table.noFiles')}
    />
  );
};
