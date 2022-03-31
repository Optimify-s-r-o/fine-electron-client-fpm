import { faQuestion } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationDto } from 'api/generated';
import styled from 'styled-components';

const ApplicationIcon = ({ application }: { application: ApplicationDto }) => {
  return (
    <>
      {application.icon ? (
        <Img src={application.icon} alt={application.name + ' icon'} />
      ) : (
        <Div>
          <FontAwesomeIcon icon={faQuestion} />
        </Div>
      )}
    </>
  );
};

export default ApplicationIcon;

const Img = styled.img`
  width: 28px;
  height: 28px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 26px;

  border: 1px solid ${(props) => props.theme.common.darker};
  border-radius: 7px;
  color: ${(props) => props.theme.common.darker};

  > svg {
    width: 21px;
    height: 21px;
  }
`;
