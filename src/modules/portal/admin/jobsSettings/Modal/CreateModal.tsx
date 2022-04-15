import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { JobTranslationDto } from 'api/generated';
import { Button } from 'components/Form/Button';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { Center, FloatRight, Gap, HR } from 'constants/globalStyles';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useModal from 'utils/hooks/useModal';
import { toast } from 'react-toastify';
import { CloseButton } from 'components/Form/Button/CloseButton';
import { useJobTranslationsContext } from 'modules/portal/context/JobTranslations/JobTranslationsContext';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

const CreateModalContent = () => {
  const { t } = useTranslation(['form', 'toast']);
  const modal = useModal();

  const { create, createLoading } = useJobTranslationsContext();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<JobTranslationDto>({
    resolver: yupResolver(
      Yup.object().shape({
        type: Yup.string().required(t('form:validation.required')),
        translation: Yup.string().required(t('form:validation.required')),
        language: Yup.string().required(t('form:validation.required'))
      })
    ),
    shouldUnregister: true
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'attributes' });

  const onSubmit = async () => {
    const values = getValues();

    try {
      await create(values);

      toast.success(t('toast:job.savedSuccessfully', { name: values.translation }));
      modal.closeModal();
    } catch {
      toast.error(t('toast:job.failedToSave', { name: values.translation }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <TextInput
          title={t('form:table.jobName')}
          name="translation"
          register={register}
          errors={errors}
        />
        <TextInput
          title={t('form:table.jobCode')}
          name="type"
          register={register}
          errors={errors}
        />
        <div></div>
      </Row>
      <Row>
        <TextInput
          title={t('form:table.jobTranslationLanguage')}
          name="language"
          register={register}
          errors={errors}
        />
        <div></div>
      </Row>
      <HR />
      {fields.map((field, key) => (
        <Row key={field.id}>
          <TextInput
            title={t('form:modal.translations.normalizedName')}
            register={register}
            name={`attributes.${key}.normalizedName`}
            errors={errors}
          />
          <TextInput
            title={t('form:modal.translations.translation')}
            register={register}
            name={`attributes.${key}.translation`}
            errors={errors}
          />
          <div>
            <CloseButton
              onClick={() => {
                remove(key);
              }}
            />
          </div>
        </Row>
      ))}
      <Center>
        <PlainButton
          type="button"
          icon={faPlus}
          onClick={() => {
            append({
              normalizedName: '',
              translation: ''
            });
          }}>
          {t('form:button.addTranslation')}
        </PlainButton>
      </Center>
      <HR />

      <FloatRight>
        <Button loading={createLoading}>{t('form:button.save')}</Button>
      </FloatRight>
    </form>
  );
};

const CreateModal = () => {
  const { t } = useTranslation(['form']);
  const modal = useModal();

  return (
    <PlainButton
      loading={false}
      icon={faPlus}
      type="button"
      onClick={() => {
        modal.showModal({
          title: t('form:table.jobTranslationAdd'),
          content: <CreateModalContent />
        });
      }}>
      {t('form:table.jobTranslationAdd')}
    </PlainButton>
  );
};

export default CreateModal;

const Row = styled(Gap)`
  > *:not(:last-child) {
    width: 300px;
  }

  > *:last-child {
    display: flex;
    align-items: center;

    width: 16px;

    padding: 17px 0 13px;
  }
`;
