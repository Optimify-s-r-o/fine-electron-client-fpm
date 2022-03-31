import * as GS from 'constants/globalStyles';
import * as S from '../../components/main/styled';
import { useState } from 'react';
import { useEffectAsync } from '../../../../utils/useEffectAsync';

export enum State {
  PENDING,
  DOWNLOADING,
  NEW_VERSION_TO_DOWNLOAD,
  IS_UPDATED,
  DOWNLOADED,
  UPDATING
}

//TODO RICHARD
const Update = () => {
  const [version, setVersion] = useState('0.0.0');
  const [latest, setLatest] = useState(null);
  const [updatingState, setUpdatingState] = useState(State.PENDING);

  useEffectAsync(async () => {
    const appVersion = await window.API.invoke('APP_VERSION');
    setVersion(appVersion);
  }, []);

  console.log(updatingState);
  useEffectAsync(async () => {
    const response = await window.API.invoke('CHECK_FOR_UPDATE');

    console.log(response);
    console.log(response.version);

    const responseVersion = response.version;

    if (version && responseVersion && responseVersion !== version) {
      setLatest(responseVersion);
      setUpdatingState(State.NEW_VERSION_TO_DOWNLOAD);
    } else {
      setUpdatingState(State.IS_UPDATED);
    }
  }, [version]);

  const updateApp = async () => {
    setUpdatingState(State.UPDATING);
    await window.API.invoke('DOWNLOAD_UPDATE');
  };

  return (
    <S.MainContent>
      <S.ContentWrapper>
        <GS.GridRow columns={1}>
          <GS.GridItem fill={1}>
            <div>current: {version}</div>
            <div>latest: {latest}</div>
            <button onClick={updateApp}>DOWNLOAD UPDATE {latest}</button>
          </GS.GridItem>
        </GS.GridRow>
      </S.ContentWrapper>
    </S.MainContent>
  );
};

export default Update;
