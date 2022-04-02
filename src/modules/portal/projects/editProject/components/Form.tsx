import * as S from '../../../components/main/styled';
import * as GS from 'constants/globalStyles';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { Button } from 'components/Form/Button';
import { Jobs } from './Jobs';
import { useTranslation } from 'react-i18next';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectJobsDto, ProjectUpdateRequest } from 'api/generated';

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
  return (
    <S.ContentWrapper>
      {loading ? (
        ''
      ) : (
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
              <GS.H2>{t('project:main.aboutProject')}</GS.H2>
              <GS.KeyValueTable>
                <tbody>
                  <tr>
                    <td>{t('project:main.jobCount')}</td>
                    <td>{data?.jobInformation?.openableCount}</td>
                  </tr>
                  {Object.entries(data?.jobInformation?.otherJobs ?? {}).map((e, key) => (
                    <tr key={key}>
                      <td>{e[0]}</td>
                      <td>{e[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </GS.KeyValueTable>
            </GS.GridItem>
          </GS.GridRow>

          <Jobs jobs={data?.jobs} />
        </>
      )}
    </S.ContentWrapper>
  );
};
