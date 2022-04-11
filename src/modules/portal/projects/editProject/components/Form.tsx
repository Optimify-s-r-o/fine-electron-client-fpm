import { ProjectJobsDto, ProjectUpdateRequest } from 'api/generated';
import { Button } from 'components/Form/Button';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import AttributesTable from 'components/Table/AttributesTable';
import * as GS from 'constants/globalStyles';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as S from '../../../components/main/styled';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';
import { Jobs } from './Jobs';

export const ProjectForm = ({
  data,
  errors,
  loading,
  register,
  saving
}: {
  data: ProjectJobsDto | null | undefined;
  loading: boolean;
  register: UseFormRegister<ProjectUpdateRequest>;
  errors: FieldErrors<ProjectUpdateRequest>;
  saving: boolean;
}) => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);
  const { getJobTranslation, language } = useJobTranslationsContext();
  return (
    <S.ContentWrapper>
      <>
        <GS.GridRow columns={2}>
          <GS.GridItem>
            <TextInput
              errors={errors}
              name={'name'}
              register={register}
              title={t('form:input.projectName')}
            />
            <TextAreaInput
              name={'description'}
              register={register}
              title={t('form:input.projectDescription')}
            />
            <Button loading={saving}>{t('form:button.save')}</Button>
          </GS.GridItem>
          <GS.GridItem>
            <AttributesTable
              header={{ title: t('project:main.aboutProject') }}
              alignWithInput
              attributes={[
                {
                  title: t('project:main.jobCount'),
                  value: data?.jobInformation?.openableCount.toString()
                },
                ...Object.entries(data?.jobInformation?.otherJobs ?? {}).map((e, key) => ({
                  title: getJobTranslation(e[0], language),
                  value: e[1].toString()
                }))
              ]}
            />
          </GS.GridItem>
        </GS.GridRow>

        <Jobs project={data} />
      </>
    </S.ContentWrapper>
  );
};
