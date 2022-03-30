import * as GS from 'constants/globalStyles';
import { MouseEvent } from 'react';

import { useEffectAsync } from '../../../../utils/useEffectAsync';
import * as S from '../../components/main/styled';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
import { SettingsWrapper } from '../components/SettingsWrapper';

const System = () => {
  const { executeApplication } = useExecutableApplicationContext();

  useEffectAsync(async () => {
    const downloadsPath = await window.API.invoke('ELECTRON_STORE_GET', { name: 'downloads' });
    const documentsPath = await window.API.invoke('ELECTRON_STORE_GET', { name: 'documents' });
    const test = await window.API.invoke('ELECTRON_STORE_GET', { name: 'test' });
    await window.API.invoke('ELECTRON_STORE_SET', { name: 'test', value: 'C://' });
    console.log(downloadsPath);
    console.log(documentsPath);
    console.log(test);
  }, []);

  const triggerApplication = (_event: MouseEvent<HTMLButtonElement>) => {
    executeApplication();
  };

  return (
    <SettingsWrapper>
      <S.MainContent>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <GS.Card>
                <button onClick={triggerApplication}>run app</button>
              </GS.Card>
            </GS.GridItem>
          </GS.GridRow>
        </S.ContentWrapper>
      </S.MainContent>
    </SettingsWrapper>
  );
};

export default System;
