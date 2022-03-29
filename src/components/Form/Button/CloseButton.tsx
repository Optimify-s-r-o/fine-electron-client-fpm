import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

export const CloseButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button onClick={onClick} type='button'>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
};

const Button = styled.button`
  line-height: 12px;

  padding: 2px;

  background-color: transparent;
  border: none;
  border-radius: 10px;

  cursor: pointer;

  > svg {
    width: 12px;
    height: 12px;

    color: #8a8a8a;
  }

  &:hover,
  &:focus {
    background-color: #e3e3e3;

    > svg {
      color: ${(props) => props.theme.colors.primary.default};
    }
  }

  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.primary.default};
    outline-offset: 2px;
  }
`;
