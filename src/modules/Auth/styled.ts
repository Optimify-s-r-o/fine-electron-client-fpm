import styled from "styled-components";
import {Row} from "constants/globalStyles";

export const CreateNewUserWrapper = styled(Row)`
  margin-bottom: 18px;
  margin-top: 2px;
`

export const CreateNewUserLabel = styled.span`
  padding-right: 3px;
  color: ${props => props.theme.text.gray};
`

export const Welcome = styled.h2`
  font-size: 1.4em;
  margin-top: 0.7em;
  margin-bottom: 0.2em;
  font-weight: 500;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  color: ${props => props.theme.text.primary};
  font-weight: 500;
  margin-top: 0;
`;

export const ExternalLink = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.text.primary};

  &:hover {
    text-decoration: underline;
  }
`

export const Form = styled.form`
  margin-top: 0.2rem;
`