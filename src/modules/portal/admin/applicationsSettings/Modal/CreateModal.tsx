import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { ApplicationCreateRequest, ApplicationDto } from 'api/generated';
import { ExtensionsSelect } from 'components/Form/Select/ExtensionsSelect';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useModal from 'utils/hooks/useModal';
import * as GS from 'constants/globalStyles';
import { Button } from 'components/Form/Button';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useApi } from 'utils/hooks/useApi';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { toast } from 'react-toastify';
import API from 'utils/api';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';

const CreateModal = () => {
  const [createApplication, { loading: createLoading }] = useApi<
    ApplicationCreateRequest,
    ApplicationDto
  >();
  const { refetch } = useApplicationContext();
  const modal = useModal();
  const { t } = useTranslation(['form', 'toast']);
  const { control, register, handleSubmit } = useForm<ApplicationDto>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    ),
    shouldUnregister: true
  });

  const createApplicationHandler = async (request: ApplicationCreateRequest) => {
    toast.info(t('portal:admin.applications.creatingInfo'));
    if (!request.extensions) request.extensions = [];
    try {
      await createApplication(() =>
        API.ApplicationsApi.fineProjectManagerApiApplicationsPost(request)
      );
      toast.success(t('portal:admin.applications.creatingDone'));

      return true;
    } catch {
      toast.error(t('portal:admin.applications.creatingFailed'));
      return false;
    }
  };

  return (
    <PlainButton
      loading={false}
      icon={faPlus}
      type="button"
      onClick={() => {
        modal.showModal({
          title: t('form:table.programAdd'),
          content: (
            <>
              <TextInput register={register} name="name" title={t('form:table.programName')} />
              <TextInput register={register} name="code" title={t('form:table.programCode')} />
              <ExtensionsSelect
                title={t('form:table.programExtension')}
                control={control}
                name="extensions"
              />
              <GS.FormFieldHelp>{t('form:select.extensionsHelp')}</GS.FormFieldHelp>
            </>
          ),
          footer: (
            <>
              <Button loading={createLoading}>{t('form:table.programAdd')}</Button>
            </>
          ),
          onSubmit: handleSubmit(async (request: ApplicationCreateRequest) => {
            const success = await createApplicationHandler(request);
            if (success) {
              await refetch();
              modal.closeModal();
            }
          })
        });
      }}>
      {t('form:table.programAdd')}
    </PlainButton>
  );
};

export default CreateModal;
