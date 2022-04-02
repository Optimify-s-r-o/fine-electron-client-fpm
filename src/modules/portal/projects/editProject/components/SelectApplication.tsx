import { useApplicationContext } from '../../../context/Applications/ApplicationsContext';
import { ApplicationDto } from '../../../../../api/generated';
import ApplicationIcon from '../../../../../components/ApplicationIcon';
import { Column } from 'constants/globalStyles';
import styled from 'styled-components';
import { MouseEvent } from 'react';
import { useExecutableApplicationContext } from '../../../context/ExecutableApplications/ExecutableApplicationsContext';

export const SelectApplication = ({ projectId }: { projectId: string }) => {
  const { applications } = useApplicationContext();
  const { createJob } = useExecutableApplicationContext();

  const openApplication =
    (application: ApplicationDto) => async (_e: MouseEvent<HTMLDivElement>) => {
      if (!projectId) return;

      await createJob(projectId, application.code);
    };

  return (
    <Wrapper>
      {applications?.map((e: ApplicationDto, index: number) => {
        return (
          <ItemWrapper key={index} onClick={openApplication(e)}>
            <ApplicationIcon application={e} />
            <Title>{e.name}</Title>
          </ItemWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 0 0 33%;
  }
`;

const ItemWrapper = styled(Column)`
  align-items: center;
  justify-content: center;

  margin: 20px 0;
  padding: 20px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.common.content};
  box-sizing: border-box;

  &:hover {
    border: 1px solid ${(props) => props.theme.common.secondaryMenu};
  }
`;

const Title = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.primaryText.default};

  margin-top: 10px;
`;
