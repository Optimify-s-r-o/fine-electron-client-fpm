import { faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { ApplicationDto } from 'api/generated';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import * as GS from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import API from 'utils/api';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';
import { PlainButton } from 'components/Form/Button/PlainButton';

const DeleteModal = ({ application }: { application: ApplicationDto }) => {
  const modal = useModal();
  const { t } = useTranslation(['form', 'portal']);
  const [deleteApplication, { loading: deleteLoading }] = useApi();
  const { refetch } = useApplicationContext();

  const deleteApplicationHandler = async (id: string) => {
    toast.info(t('portal:admin.applications.deletingInfo'));

    try {
      await deleteApplication(() =>
        API.ApplicationsApi.fineProjectManagerApiApplicationsIdDelete(id)
      );
      toast.success(t('portal:admin.applications.deletingDone'));

      return true;
    } catch {
      return false;
    }
  };

  return (
    <PlainButton
      loading={false}
      icon={faTrashCan}
      onClick={() =>
        modal.showModal({
          title: t('form:table.applicationDelete'),
          content: (
            <>
              <p>
                {t('portal:admin.applications.deleteConfirmationTextPart1', {
                  name: application.name
                })}
              </p>

              <p>{t('portal:admin.applications.deleteConfirmationTextPart2')}</p>
            </>
          ),
          footer: (
            <GS.RowEnd>
              <DeleteButton
                loading={deleteLoading}
                onClick={async () => {
                  const success = await deleteApplicationHandler(application.id);
                  if (success) {
                    await refetch();
                    modal.closeModal();
                  }
                }}>
                {t('form:table.delete')}
              </DeleteButton>
            </GS.RowEnd>
          )
        })
      }>
      {t('form:table.delete')}
    </PlainButton>
  );
};

export default DeleteModal;
