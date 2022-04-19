import { faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { JobTranslationDto } from 'api/generated';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import * as GS from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useModal from 'utils/hooks/useModal';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { useJobTranslationsContext } from 'modules/portal/context/JobTranslations/JobTranslationsContext';

const DeleteModal = ({ jobTranslation }: { jobTranslation: JobTranslationDto }) => {
  const modal = useModal();
  const { t } = useTranslation(['toast', 'portal']);
  const { delete: deleteId, deleteLoading } = useJobTranslationsContext();

  return (
    <PlainButton
      loading={false}
      icon={faTrashCan}
      onClick={() =>
        modal.showModal({
          title: t('portal:admin.jobs.deleteHeader'),
          content: (
            <>
              <p>
                {t('portal:admin.jobs.deleteConfirmationText', {
                  name: jobTranslation.translation
                })}
              </p>
            </>
          ),
          footer: (
            <GS.RowEnd>
              <DeleteButton
                loading={deleteLoading}
                onClick={async () => {
                  try {
                    await deleteId(jobTranslation.id);
                    toast.success(
                      t('toast:jobTranslation.deletedSuccessfully', {
                        name: jobTranslation.translation
                      })
                    );
                    modal.closeModal();
                  } catch {
                    toast.error(
                      t('toast:jobTranslation.failedToDelete', {
                        name: jobTranslation.translation
                      })
                    );
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
