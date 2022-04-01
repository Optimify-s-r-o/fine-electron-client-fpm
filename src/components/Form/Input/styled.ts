import styled from 'styled-components';
import { SpaceBetween } from '../../../constants/globalStyles';

export const RightNode = styled.span`
  font-size: 13px;
`;

export const Wrapper = styled(SpaceBetween)`
  margin-bottom: 5px;
`;

export const Title = styled.label`
  font-size: 13px;
  color: #727272;
  padding-left: 1px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 13px;
`;

const InputStyles = (props: any) => `
  box-sizing: border-box;

  width: 100%;

  padding: 9px 16px 10px;

  border: 1px solid #d0d0d0;
  border-radius: 7px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
  font-family: Roboto;

  outline: none;


  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c8c8c8;
    font-weight: 300;
  }

  :-ms-input-placeholder {
    color: #c8c8c8;
    font-weight: 300;
  }

  :hover {
    border: 1px solid rgba(129, 134, 131, 0.74);
  }

  :focus, :active {
    border: 1px solid ${props.theme.colors.primary.default};
  }
`;

export const Input = styled.input`
  ${(props) => InputStyles(props)}
`;

export const TextArea = styled.textarea`
  ${(props) => InputStyles(props)}

  line-height: 1.5;

  resize: vertical;
`;
