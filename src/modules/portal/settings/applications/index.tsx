import { ApplicationDto } from 'api/generated';
import ApplicationIcon from 'components/ApplicationIcon';
import { CardTable } from 'components/Table/CardTable';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { SettingsWrapper } from '../components/SettingsWrapper';
import { PathField } from './components/PathField';

const LocalApplicationsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { applications, loading } = useApplicationContext();

  return (
    <S.MainContent>
      <S.ContentWrapper>
        <CardTable
          columns={[
            {
              title: t('form:table.programName'),
              render: (text: string, r: ApplicationDto) => (
                <>
                  <NameWrapper>
                    <ApplicationIcon application={r} />
                    {text}
                  </NameWrapper>
                </>
              ),
              dataIndex: 'name'
            },
            {
              title: t('form:table.programPath'),
              render: (_t, record: ApplicationDto) => <PathField application={record} />
            }
          ]}
          dataSource={applications}
          emptyTableText={loading ? t('form:table.loading') : t('form:table.noProgramsUser')}
        />
      </S.ContentWrapper>
    </S.MainContent>
  );
};

export default LocalApplicationsSettings;

const NameWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 16px;
`;
