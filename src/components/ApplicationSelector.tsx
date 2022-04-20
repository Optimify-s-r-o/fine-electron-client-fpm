import { ApplicationDto } from 'api/generated';
import { GridItem, GridRow } from 'constants/globalStyles';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';
import styled from 'styled-components';
import ApplicationIcon from './ApplicationIcon';

const ApplicationSelector = ({ onClick }: { onClick: (application: ApplicationDto) => void }) => {
  const { applications } = useApplicationContext();

  return (
    <GridRow columns={3}>
      {applications.map((app, key) => (
        <GridItem key={key}>
          <ApplicationButton
            onClick={() => {
              onClick(app);
            }}
            type="button">
            <ApplicationIcon application={app} />
            <ApplicationName>{app.name}</ApplicationName>
          </ApplicationButton>
        </GridItem>
      ))}
    </GridRow>
  );
};

export default ApplicationSelector;

const ApplicationButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  width: 100%;

  padding: 32px 8px;

  background-color: transparent;
  border: 1px solid ${(props) => props.theme.common.lightGray};
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.common.lightGray};
  }
`;

const ApplicationName = styled.div``;
