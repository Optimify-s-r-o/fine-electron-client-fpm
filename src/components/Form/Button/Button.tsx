import styled from 'styled-components';
import { Loader } from './Loader';
import { MouseEventHandler, ReactNode } from 'react';

type ButtonLevel = 1 | 2 | 3;

export const Button = ({
  fullWidth = false,
  level = 2,
  loading = false,
  disabled = false,
  children,
  type = 'submit',
  withMargin = false,
  onClick
}: {
  fullWidth?: boolean;
  loading?: boolean;
  level?: ButtonLevel;
  children: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  withMargin?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ButtonElement
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      level={level}
      withMargin={withMargin}
      onClick={onClick}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {loading && (
        <LoaderWrapper>
          <Loader size={24} />
        </LoaderWrapper>
      )}
    </ButtonElement>
  );
};

const getPadding = (level: ButtonLevel) => {
  switch (level) {
    case 1:
      return '14px 24px';
    case 2:
      return '8px 16px';
    case 3:
    default:
      return '6px 12px';
  }
};

const ChildrenWrapper = styled.div`
  display: inline-block;
`;

export const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  top: -5px;
  width: 24px;
  height: 24px;
  margin: -8px 0;
`;

const ButtonElement = styled.button<{
  fullWidth: boolean;
  level: ButtonLevel;
  withMargin?: boolean;
}>`
  position: relative;

  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  min-width: 150px;

  padding: ${(props) => getPadding(props.level)};

  border: 0;
  border-radius: 7px;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.background.darker : props.theme.colors.primary.default};
  line-height: 20px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;

  margin-top: ${(props) => (props.withMargin ? '5px' : 0)};

  &:before {
    content: '';
    position: absolute;
    z-index: -1;

    top: -1px;
    right: 50%;
    bottom: -1px;
    left: 50%;

    background-color: rgba(0, 0, 0, 0.1);

    transition: all 0.1s ease-out;
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
    box-shadow: inset 0 0 1px 1px ${(props) => props.theme.colors.primary.active};

    &:before {
      left: -2px;
      right: -2px;
    }
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary.default};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.defaultActive};
    box-shadow: inset 0 0 1px 1px ${(props) => props.theme.colors.primary.active};
  }
`;
