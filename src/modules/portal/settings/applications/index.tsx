import { faQuestion } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationDto } from 'api/generated';
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
    <SettingsWrapper>
      <S.MainContent>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.programName'),
                render: (text: string, r: ApplicationDto) => (
                  <>
                    <NameWrapper>
                      {r.icon ? (
                        <img src={r.icon} alt={r.name + ' icon'} />
                      ) : (
                        <div>
                          <FontAwesomeIcon icon={faQuestion} />
                        </div>
                      )}
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
    </SettingsWrapper>
  );
};

export default LocalApplicationsSettings;

const NameWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  > img {
    width: 28px;
    height: 28px;

    margin-right: 16px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;

    margin-right: 16px;

    border: 1px solid ${(props) => props.theme.common.darker};
    border-radius: 3px;
    color: ${(props) => props.theme.common.darker};

    > svg {
      width: 21px;
      height: 21px;
    }
  }
`;
