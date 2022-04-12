import { faPencil } from '@fortawesome/pro-light-svg-icons';
import { ApplicationDto } from 'api/generated';
import { IconButton } from 'components/Form/Button/IconButton';
import { ExtensionsSelect } from 'components/Form/Select/ExtensionsSelect';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useModal from 'utils/hooks/useModal';
import * as GS from 'constants/globalStyles';
import { Button } from 'components/Form/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ExtensionModal = ({
  extensions,
  application
}: {
  extensions: Array<string>;
  application: ApplicationDto;
}) => {
  const { setApplicationExtensions, updateLoading, loading } = useApplicationContext();
  const modal = useModal();
  const { t } = useTranslation(['form', 'toast']);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    shouldUnregister: true
  });

  useEffect(() => {
    reset({ extensions });
  }, [extensions, reset]);

  return (
    <IconButton
      loading={false}
      btnStyle="plain"
      icon={faPencil}
      type="button"
      onClick={() => {
        modal.showModal({
          title: t('form:modal.extensions.extensionsHeader'),
          content: (
            <>
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
              <Button loading={updateLoading || loading}>{t('form:button.save')}</Button>
            </GS.RowEnd>
          ),
          onSubmit: handleSubmit(async () => {
            const newExtensions = getValues().extensions;
            const newApplication = { ...application, extensions: newExtensions };

            await setApplicationExtensions(newApplication);
            modal.closeModal();
            toast.success(t('toast:application.extensionsUpdated'));
          })
        });
      }}
    />
  );
};

export default ExtensionModal;
