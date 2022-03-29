import * as GS from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faCog } from '@fortawesome/pro-duotone-svg-icons';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { MouseEvent } from 'react';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';

const System = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
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
    <MainWrapper icon={faCog} title={t('portal:menu.system')}>
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
    </MainWrapper>
  );
};

export default System;
