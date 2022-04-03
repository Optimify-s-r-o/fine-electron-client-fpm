import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';
import * as Yup from 'yup';
import * as GS from 'constants/globalStyles';
import { JobDto, JobUpdateRequest } from '../../../../../api/generated';
import { FileLinksResponse } from '../../../../../api/generated/api';
import { Button } from '../../../../../components/Form/Button';
import * as S from '../../../components/main/styled';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import AttributesTable from 'components/Table/AttributesTable';
import { useEffect } from 'react';
import { DateFormat } from 'components/Moment';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import { useJob } from '../index';
import { toast } from 'react-toastify';

const JobEditGeneral = () => {
  const { t } = useTranslation(['form', 'toast', 'project']);
  const { language, getAttributeTranslation, getJobTranslation } = useJobTranslationsContext();
  const { editId } = useParams();
  const { data: jobMainData, loading: jobMainDataLoading } = useJob();

  const [update, { loading }] = useApi<JobUpdateRequest, JobDto>();

  const [getJobPreviewLinks, { data: jobPreviewLinksData, loading: jobPreviewLinksLoading }] =
    useApi<FileLinksResponse>();

  useEffectAsync(async () => {
    if (editId) {
      await getJobPreviewLinks(() => API.JobsApi.fineProjectManagerApiJobsIdPreviewsGet(editId));
    }
  }, [editId]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<JobUpdateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  useEffect(() => {
    if (!jobMainData) return;

    reset({ id: jobMainData.id, name: jobMainData.name, description: jobMainData.description });
  }, [jobMainData, reset]);

  const onSubmit = async (data: JobUpdateRequest) => {
    try {
      await update(() => API.JobsApi.fineProjectManagerApiJobsPut(data));
      toast.success(t('toast:job.savedSuccessfully', { name: data.name }));
    } catch (e) {
      toast.error(t('toast:job.failedToSave', { name: data.name }));
    }
  };

  return (
    <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
      <S.ContentWrapper>
        <>
          <GS.GridRow columns={2}>
            <GS.GridItem>
              <TextInput
                errors={errors}
                name={'name'}
                register={register}
                title={t('form:input.jobName')}
              />
              <TextAreaInput
                name={'description'}
                register={register}
                title={t('form:input.jobDescription')}
              />
              <Button loading={jobMainDataLoading || loading}>{t('form:button.save')}</Button>
              <GS.HR />
              {jobMainDataLoading ? (
                'loading'
              ) : (
                <AttributesTable
                  header={{
                    title: t('project:job.attributeName'),
                    value: t('project:job.attributeValue')
                  }}
                  attributes={
                    jobMainData?.attributes?.map((e) => ({
                      title: getAttributeTranslation(e.normalizedName as string, e, language),
                      value: e.value + ' ' + e.unit
                    })) ?? []
                  }
                />
              )}
            </GS.GridItem>
            <GS.GridItem>
              <AttributesTable
                attributes={[
                  {
                    title: t('project:job.type'),
                    value: getJobTranslation(jobMainData?.type, language)
                  },
                  {
                    title: t('project:job.created'),
                    value: <DateFormat date={jobMainData?.createdAt ?? ''} />
                  },
                  {
                    title: t('project:job.updated'),
                    value: <DateFormat date={jobMainData?.updatedAt ?? ''} />
                  }
                ]}
              />
              {jobPreviewLinksLoading ? (
                'loading'
              ) : (jobPreviewLinksData?.files ?? []).length > 0 ? (
                <>
                  <GS.HR />

                  <GS.H2>{t('project:job.previews')}</GS.H2>
                  <GS.Card noPadding>
                    <PreviewWrapper>
                      <Carousel
                        infiniteLoop
                        showThumbs={false}
                        dynamicHeight
                        statusFormatter={(current: number, total: number) => {
                          return t('project:job.previewItemOf', { current, total });
                        }}>
                        {jobPreviewLinksData?.files?.map((e, key) => (
                          <div key={key}>
                            <img src={e.link} alt="asd" />
                          </div>
                        ))}
                      </Carousel>
                    </PreviewWrapper>
                  </GS.Card>
                </>
              ) : (
                ''
              )}
            </GS.GridItem>
          </GS.GridRow>
        </>
      </S.ContentWrapper>
    </S.MainFormContent>
  );
};

export default JobEditGeneral;

const PreviewWrapper = styled.div`
  position: relative;

  border-radius: 7px;

  overflow: hidden;

  .carousel.carousel-slider {
    .control-dots {
      .dot {
        display: none;
      }
    }

    .carousel-status {
      margin: 0;
      padding: 8px;

      right: 30px;

      font-size: 13px;
    }

    .control-arrow {
      color: ${(props) => props.theme.colors.primary.default};

      opacity: 0.9;
    }
  }
`;
