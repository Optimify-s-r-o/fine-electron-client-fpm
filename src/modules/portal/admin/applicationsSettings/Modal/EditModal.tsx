import { faPencil } from '@fortawesome/pro-light-svg-icons';
import { ApplicationDto } from 'api/generated';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { ExtensionsSelect } from 'components/Form/Select/ExtensionsSelect';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useModal from 'utils/hooks/useModal';
import * as GS from 'constants/globalStyles';
import { Button } from 'components/Form/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { TextInput } from 'components/Form/Input/Text/TextInput';

const EditModal = ({ application }: { application: ApplicationDto }) => {
  const { updateApplication, updateLoading, loading } = useApplicationContext();
  const modal = useModal();
  const { t } = useTranslation(['form', 'toast']);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    shouldUnregister: true
  });

  useEffect(() => {
    reset({ extensions: application.extensions, name: application.name });
  }, [application, reset]);

  return (
    <PlainButton
      loading={false}
      icon={faPencil}
      type="button"
      onClick={() => {
        modal.showModal({
          title: t('form:modal.extensions.extensionsHeader'),
          content: (
            <>
              <TextInput register={register} name="name" title={t('form:table.programName')} />
              <GS.HR />
              <ExtensionsSelect
                title={t('form:table.programExtension')}
                control={control}
                errors={errors}
                name="extensions"
              />
              <GS.FormFieldHelp>{t('form:select.extensionsHelp')}</GS.FormFieldHelp>
            </>
          ),
          footer: (
            <GS.RowEnd>
              <Button loading={updateLoading || loading}>{t('form:table.programChange')}</Button>
            </GS.RowEnd>
          ),
          onSubmit: handleSubmit(async () => {
            const newApplication = {
              ...application,
              name: getValues().name,
              extensions: getValues().extensions
            };

            await updateApplication(newApplication);
            modal.closeModal();
            toast.success(t('toast:application.updated'));
          })
        });
      }}>
      {t('form:table.edit')}
    </PlainButton>
  );
};

export default EditModal;
