import * as GS from 'constants/globalStyles';
import { MouseEvent } from 'react';

import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
import { SettingsWrapper } from '../components/SettingsWrapper';

const System = () => {
  const { executeApplication } = useExecutableApplicationContext();
  const { applications } = useApplicationContext();

  const triggerApplication = (code: string) => (_event: MouseEvent<HTMLButtonElement>) => {
    executeApplication('jobId', code);
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
                      <button onClick={triggerApplication(e.code)}>{e.name}</button>
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
