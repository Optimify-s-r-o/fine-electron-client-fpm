import * as S from '../../../components/main/styled';
import { Button } from '../../../../../components/Form/Button';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { JobCreateRequest } from '../../../../../api/generated';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const JobEditGeneral = () => {
  const { t } = useTranslation(['form']);

  const { editId } = useParams();
  const { handleSubmit } = useForm<JobCreateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onSubmit = async (data: JobCreateRequest) => {
    console.log(data);
  };

  return (
    <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
      <S.ContentWrapper>TODO EDIT JOB {editId}</S.ContentWrapper>
      <S.ButtonsWrapper>
        <Button loading={false}>{t('form:button.save')}</Button>
      </S.ButtonsWrapper>
    </S.MainFormContent>
  );
};

export default JobEditGeneral;
