import * as GS from 'constants/globalStyles';
import { Row } from 'constants/globalStyles';
import * as S from '../../components/main/styled';
import { MouseEvent, useState } from 'react';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/Form/Button';

export enum State {
  CHECKING,
  UPDATING,
  UP_TO_DATE,
  NEW_VERSION_TO_DOWNLOAD
}

const Update = () => {
  const { t } = useTranslation(['settings']);

  const [version, setVersion] = useState(null);
  const [latest, setLatest] = useState(null);
  const [updatingState, setUpdatingState] = useState(State.CHECKING);

  useEffectAsync(async () => {
    const appVersion = await window.API.invoke('APP_VERSION');
    setVersion(appVersion);
  }, []);

  useEffectAsync(async () => {
    const response = await window.API.invoke('CHECK_FOR_UPDATE');

    const responseVersion = response.version;

    setLatest(responseVersion);

    if (version && responseVersion && responseVersion !== version) {
      setUpdatingState(State.NEW_VERSION_TO_DOWNLOAD);
    } else {
      setUpdatingState(State.UP_TO_DATE);
    }
  }, [version]);

  const updateApp = async (_e: MouseEvent<HTMLButtonElement>) => {
    setUpdatingState(State.UPDATING);
    await window.API.invoke('DOWNLOAD_UPDATE');
  };

  return (
    <S.MainContent>
      <S.ContentWrapper>
        <GS.GridRow columns={1}>
          <GS.GridItem fill={1}>
            <GS.Column>
              <Text>
                <Label>{t('settings:installedVersion')}</Label>
                <Version>v{version}</Version>
              </Text>
              <Text>
                <Label>{t('settings:latestVersion')}</Label>
                {!latest || updatingState === State.CHECKING ? (
                  <Status status={State.CHECKING}>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                    <Label>{t('settings:checkingForUpdates')}</Label>
                  </Status>
                ) : (
                  <Version>v{latest}</Version>
                )}
              </Text>
              {updatingState === State.NEW_VERSION_TO_DOWNLOAD ||
              updatingState === State.UPDATING ? (
                <ButtonWrapper>
                  <Button loading={updatingState === State.UPDATING} onClick={updateApp}>
                    {t('settings:downloadVersion', { version: latest })}
                  </Button>
                  {updatingState === State.UPDATING && <Label>{t('settings:notification')}</Label>}
                </ButtonWrapper>
              ) : updatingState === State.UP_TO_DATE ? (
                <Status status={updatingState}>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <Label>{t('settings:upToDate')}</Label>
                </Status>
              ) : (
                <></>
              )}
            </GS.Column>
          </GS.GridItem>
        </GS.GridRow>
      </S.ContentWrapper>
    </S.MainContent>
  );
};

export default Update;

const Status = styled(Row)<{ status: State }>`
  align-items: center;

  padding-top: 3px;

  svg {
    width: 19px;
    height: 19px;

    margin-right: 5px;

    color: ${(props) =>
      props.status === State.CHECKING
        ? props.theme.common.darkGray
        : props.status === State.UPDATING
        ? props.theme.common.darkGray
        : props.status === State.UP_TO_DATE
        ? props.theme.colors.primary.default
        : props.theme.colors.primary.default};
  }
`;

const Text = styled(Row)`
  margin: 5px 0;
`;

const Version = styled.span`
  font-weight: bold;
`;

const Label = styled.span`
  margin-right: 7px;
`;

const ButtonWrapper = styled.div`
  margin-top: 7px;
`;
