import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { Input } from 'components/Form/Input/styled';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ApplicationDto } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import adminNav from '../adminNav';
import Icon from './Icon';
import CreateModal from './Modal/CreateModal';
import DeleteModal from './Modal/DeleteModal';
import EditModal from './Modal/EditModal';

const ApplicationsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { applications, loading } = useApplicationContext();

  const extensionsRender = (extensions: Array<string>, application: ApplicationDto) =>
    extensions.length === 0 ? (
      <NotSet>{t('form:table.programExtensionsNotSet')}</NotSet>
    ) : (
      extensions.join(', ')
    );

  const actionsRender = (_: any, application: ApplicationDto) => (
    <GS.FloatRight>
      <GS.GapAlignCenter>
        <EditModal application={application} />
        <DeleteModal application={application} />
      </GS.GapAlignCenter>
    </GS.FloatRight>
  );

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={adminNav(t, RoutesPath.ADMIN_APPLICATIONS_SETTINGS)}>
      <S.ContentWrapper>
        <CardTable
          columns={[
            {
              title: t('form:table.programName'),
              render: (t: string) => t,
              width: '300px',
              dataIndex: 'name'
            },
            {
              title: t('form:table.programCode'),
              render: (t: string) => t,
              dataIndex: 'code'
            },
            {
              title: t('form:table.programExtension'),
              render: extensionsRender,
              dataIndex: 'extensions'
            },
            {
              title: t('form:table.programIcon'),
              render: (url: string, application: any) => <Icon url={url} record={application} />,
              dataIndex: 'icon'
            },
            {
              title: <Input placeholder={t('form:input.searchPlaceholder')} />,
              render: actionsRender
            }
          ]}
          dataSource={applications}
          emptyTableText={loading ? t('form:table.loading') : t('form:table.noPrograms')}
          extraRow={
            <GS.Center>
              <CreateModal />
            </GS.Center>
          }
        />
      </S.ContentWrapper>
    </MainWrapper>
  );
};

export default ApplicationsSettings;

const NotSet = styled.span`
  color: #727272;
`;
