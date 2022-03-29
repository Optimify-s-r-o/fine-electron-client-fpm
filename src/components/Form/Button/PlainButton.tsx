import styled from 'styled-components';
import { Loader } from './Loader';
import { MouseEventHandler, ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ButtonLevel = 1 | 2 | 3;

export const PlainButton = ({
  fullWidth = false,
  level = 2,
  loading = false,
  children,
  type = 'submit',
  withMargin = false,
  icon,
  onClick,
}: {
  fullWidth?: boolean;
  loading: boolean;
  level?: ButtonLevel;
  children: ReactNode;
  type?: 'button' | 'submit';
  withMargin?: boolean;
  icon?: IconDefinition;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ButtonElement
      type={type}
      fullWidth={fullWidth}
      level={level}
      withMargin={withMargin}
      hasIcon={!!icon}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {loading && (
        <LoaderWrapper>
          <Loader size={24} />
        </LoaderWrapper>
      )}
    </ButtonElement>
  );
};

const getPadding = (level: ButtonLevel, hasIcon?: boolean) => {
  switch (level) {
    case 1:
      return '14px 24px 14px ' + (hasIcon ? '51px' : '24px');
    case 2:
      return '8px 16px 8px ' + (hasIcon ? '39px' : '16px');
    case 3:
    default:
      return '6px 12px 6px ' + (hasIcon ? '33px' : '12px');
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
  hasIcon?: boolean;
}>`
  position: relative;

  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  min-width: 150px;

  padding: ${(props) => getPadding(props.level, props.hasIcon)};

  border: 0;
  border-radius: 7px;
  background-color: transparent;
  line-height: 20px;
  color: ${(props) => props.theme.colors.primary.default};
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

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.common.lightGray};
    cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};

    &:before {
      left: -2px;
      right: -2px;
    }
  }

  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.primary.default};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.defaultActive};
  }

  > svg {
    position: absolute;

    left: 16px;
    top: 10px;

    width: 15px;
    height: 15px;
  }
`;
