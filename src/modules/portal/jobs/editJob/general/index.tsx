import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { faArrowLeft, faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import AspectRatio from 'components/AspectRatio';
import { IconButton } from 'components/Form/Button/IconButton';
import { Loader } from 'components/Form/Button/Loader';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { DateFormat } from 'components/Moment';
import AttributesTable from 'components/Table/AttributesTable';
import * as GS from 'constants/globalStyles';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';
import * as Yup from 'yup';

import { JobDto, JobUpdateRequest } from '../../../../../api/generated';
import { FileLinksResponse, JobAttributeDto } from '../../../../../api/generated/api';
import { Button } from '../../../../../components/Form/Button';
import * as S from '../../../components/main/styled';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';
import { useTreeContext } from '../../../context/Tree/TreeContext';

const JobEditGeneral = () => {
  const { t } = useTranslation(['form', 'toast', 'project']);
  const { language, getAttributeTranslation, getJobTranslation } = useJobTranslationsContext();
  const { editId } = useParams();
  const { selectedJob } = useTreeContext();
  const [update, { loading }] = useApi<JobUpdateRequest, JobDto>();

  const [getJobPreviewLinks, { data: jobPreviewLinksData, loading: jobPreviewLinksLoading }] =
    useApi<FileLinksResponse>();
  const [currentPreviewItem, setCurrentPreviewItem] = useState(0);

  useEffectAsync(async () => {
    if (editId) {
      await getJobPreviewLinks(() => API.JobsApi.fineProjectManagerApiJobsIdPreviewsGet(editId));
    }
    setCurrentPreviewItem(0);
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
    if (!selectedJob || selectedJob.id !== editId) return;

    reset({ id: selectedJob.id, name: selectedJob.name, description: selectedJob.description });
  }, [selectedJob, editId, reset]);

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
              <Button loading={loading}>{t('form:button.save')}</Button>
              <GS.HR />
              {selectedJob === null ? (
                'loading'
              ) : (
                <AttributesTable
                  header={{
                    title: t('project:job.attributeName'),
                    value: t('project:job.attributeValue')
                  }}
                  attributes={
                    selectedJob?.attributes !== undefined && selectedJob?.attributes !== null
                      ? selectedJob.attributes.map((e: JobAttributeDto) => ({
                          title: getAttributeTranslation(e.normalizedName as string, e, language),
                          value: e.value + ' ' + e.unit
                        }))
                      : []
                  }
                />
              )}
            </GS.GridItem>
            <GS.GridItem>
              {jobPreviewLinksLoading ? (
                <>
                  <GS.CardHeader>{t('project:job.previews')}</GS.CardHeader>
                  <GS.Card noPadding>
                    <PreviewWrapper>
                      <AspectRatio ratio={0.75}>
                        <GS.CenterFullHeight>
                          <Loader size={64} color={'#727272'} />
                        </GS.CenterFullHeight>
                      </AspectRatio>
                    </PreviewWrapper>
                  </GS.Card>
                  <ControlsWrapper isPreview>
                    <IconButton
                      loading={false}
                      icon={faArrowLeft}
                      type="button"
                      disabled={currentPreviewItem === 0}
                      onClick={() => {
                        setCurrentPreviewItem(currentPreviewItem - 1);
                      }}
                    />
                    <span>
                      {t('project:job.previewItemOf', {
                        current: '1',
                        total: '2'
                      })}
                    </span>
                    <IconButton
                      loading={false}
                      icon={faArrowRight}
                      type="button"
                      disabled={currentPreviewItem + 2 > (jobPreviewLinksData?.files?.length ?? 0)}
                      onClick={() => {
                        setCurrentPreviewItem(currentPreviewItem + 1);
                      }}
                    />
                  </ControlsWrapper>

                  <GS.HR />
                </>
              ) : (jobPreviewLinksData?.files ?? []).length > 0 ? (
                <>
                  <GS.CardHeader>{t('project:job.previews')}</GS.CardHeader>
                  <GS.Card noPadding>
                    <PreviewWrapper>
                      <AspectRatio ratio={0.75}>
                        <Carousel
                          infiniteLoop
                          showThumbs={false}
                          showArrows={false}
                          showStatus={false}
                          selectedItem={currentPreviewItem}>
                          {jobPreviewLinksData?.files?.map((e) => (
                            <AspectRatio ratio={0.75}>
                              <div
                                key={e.key}
                                style={{
                                  backgroundImage: `url(${e.link})`,
                                  backgroundSize: 'contain',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  width: '100%',
                                  height: '100%'
                                }}></div>
                            </AspectRatio>
                          ))}
                        </Carousel>
                      </AspectRatio>
                    </PreviewWrapper>
                  </GS.Card>
                  <ControlsWrapper>
                    <IconButton
                      loading={false}
                      icon={faArrowLeft}
                      type="button"
                      disabled={currentPreviewItem === 0}
                      onClick={() => {
                        setCurrentPreviewItem(currentPreviewItem - 1);
                      }}
                    />
                    {t('project:job.previewItemOf', {
                      current: currentPreviewItem + 1,
                      total: jobPreviewLinksData?.files?.length ?? 0
                    })}
                    <IconButton
                      loading={false}
                      icon={faArrowRight}
                      type="button"
                      disabled={currentPreviewItem + 2 > (jobPreviewLinksData?.files?.length ?? 0)}
                      onClick={() => {
                        setCurrentPreviewItem(currentPreviewItem + 1);
                      }}
                    />
                  </ControlsWrapper>

                  <GS.HR />
                </>
              ) : (
                ''
              )}
              <AttributesTable
                header={{ title: t('project:job.meta') }}
                alignWithInput={
                  (jobPreviewLinksData?.files ?? []).length === 0 && !jobPreviewLinksLoading
                }
                attributes={[
                  {
                    title: t('project:job.type'),
                    value: getJobTranslation(selectedJob?.type, language)
                  },
                  {
                    title: t('project:job.created'),
                    value: <DateFormat date={selectedJob?.createdAt ?? ''} />
                  },
                  {
                    title: t('project:job.updated'),
                    value: <DateFormat date={selectedJob?.updatedAt ?? ''} />
                  }
                ]}
              />
            </GS.GridItem>
          </GS.GridRow>
        </>
      </S.ContentWrapper>
    </S.MainFormContent>
  );
};

export default JobEditGeneral;

const ControlsWrapper = styled(GS.Center)<{ isPreview?: boolean }>`
  gap: 8px;

  margin-top: 17px;

  color: #727277;
  font-size: 13px;

  opacity: ${(props) => (props.isPreview ? '0' : '1')};
`;

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
