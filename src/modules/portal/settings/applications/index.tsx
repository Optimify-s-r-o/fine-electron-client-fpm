import { faCog, faDatabase, faQuestion } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest } from 'api/generated';
import { Button } from 'components/Form/Button';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { Input } from 'components/Form/Input/styled';
import { CardTable } from 'components/Table/CardTable';
import { Row } from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';

const PathField = ({
  path,
  onPathChanged
}: {
  path: string;
  onPathChanged: (newPath: string) => void;
}) => {
  const { t } = useTranslation(['form']);
  const pathInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Row>
      <input
        type="file"
        ref={pathInputRef}
        accept=".exe"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          if (file) onPathChanged((file as unknown as { path: string }).path);
        }}
      />
      <Input value={path} readOnly />
      <MarginLeft>
        <PlainButton
          loading={false}
          onClick={() => {
            pathInputRef.current?.click();
          }}>
          {t('form:table.programPathChange')}
        </PlainButton>
      </MarginLeft>
    </Row>
  );
};

const LocalApplicationsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { applications, loading } = useApplicationContext();

  const { handleSubmit } = useForm<ProjectCreateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onSubmit = async (data: ProjectCreateRequest) => {
    console.log(data);
  };

  const onPathChanged = (newPath: string, record: any) => {
    // TODO karel
    console.log(newPath, record);
  };

  return (
    <MainWrapper
      icon={faCog}
      title={t('portal:settings.title')}
      navigation={[
        {
          path: RoutesPath.SYSTEM,
          active: false,
          text: t('portal:settings.tabs.system'),
          icon: faDatabase
        },
        {
          path: RoutesPath.LOCAL_APPLICATIONS_SETTINGS,
          active: true,
          text: t('portal:settings.tabs.applicationsSettings'),
          icon: faDatabase
        },
        {
          path: RoutesPath.UPDATE,
          active: false,
          text: t('portal:settings.tabs.update'),
          icon: faDatabase
        }
      ]}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.programName'),
                render: (text: string, r: any) => (
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
                render: (_t: undefined, r: any) => (
                  <PathField
                    path={'TODO karel'}
                    onPathChanged={(newPath) => {
                      onPathChanged(newPath, r);
                    }}
                  />
                )
              }
            ]}
            dataSource={applications}
            emptyTableText={loading ? t('form:table.loading') : t('form:table.noProgramsUser')}
          />
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={false}>{t('form:button.save')}</Button>
        </S.ButtonsWrapper>
      </S.MainFormContent>
    </MainWrapper>
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

const MarginLeft = styled.span`
  margin-left: 16px;
`;
