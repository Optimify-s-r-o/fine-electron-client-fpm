import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { ApplicationDto } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import adminNav from '../adminNav';

const JobsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={adminNav(t, RoutesPath.ADMIN_JOBS_SETTINGS)}>
      <S.MainFormContent>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.jobName'),
                render: (t: string, _r: any) => t,
                width: '300px',
                dataIndex: 'name'
              },
              {
                title: t('form:table.jobCode'),
                render: (t: string, _r: any) => t,
                dataIndex: 'code'
              },
              {
                title: t('form:table.jobAttributesCount'),
                render: (t: string, _r: any) => t,
                dataIndex: 'attributes'
              },
              {
                title: '',
                render: (_t: undefined, r: ApplicationDto) => (
                  <GS.FloatRight>
                    <PlainButton loading={false} onClick={() => {}}>
                      {t('form:table.jobEdit')}
                    </PlainButton>
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={[]}
            emptyTableText={false ? t('form:table.loading') : t('form:table.noJobs')}
          />
        </S.ContentWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default JobsSettings;
