import * as GS from 'constants/globalStyles';
import { MouseEvent } from 'react';

import { useEffectAsync } from '../../../../utils/useEffectAsync';
import * as S from '../../components/main/styled';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
import { SettingsWrapper } from '../components/SettingsWrapper';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';

const System = () => {
  const { executeApplication } = useExecutableApplicationContext();
  const { applications } = useApplicationContext();

  const triggerApplication = (id: string) => (_event: MouseEvent<HTMLButtonElement>) => {
    executeApplication(id);
  };

  return (
    <SettingsWrapper>
      <S.MainContent>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <GS.Card>
                {applications?.map((e) => {
                  return (
                    <div>
                      <button onClick={triggerApplication(e.id)}>{e.name}</button>
                    </div>
                  );
                })}
              </GS.Card>
            </GS.GridItem>
          </GS.GridRow>
        </S.ContentWrapper>
      </S.MainContent>
    </SettingsWrapper>
  );
};

export default System;
