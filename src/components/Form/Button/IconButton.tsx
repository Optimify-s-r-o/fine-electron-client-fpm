import styled from 'styled-components';
import { Loader } from './Loader';
import { MouseEventHandler } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ButtonLevel = 1 | 2 | 3;

type ButtonStyle = 'primary' | 'delete' | 'plain';

export const IconButton = ({
  level = 2,
  loading = false,
  type = 'submit',
  withMargin = false,
  icon,
  onClick,
  btnStyle = 'plain'
}: {
  loading: boolean;
  level?: ButtonLevel;
  type?: 'button' | 'submit';
  withMargin?: boolean;
  icon: IconDefinition;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnStyle?: ButtonStyle;
}) => {
  return (
    <ButtonElement
      type={type}
      fullWidth={false}
      level={level}
      withMargin={withMargin}
      onClick={onClick}
      btnStyle={btnStyle}>
      <FontAwesomeIcon icon={icon} />
      {loading && (
        <LoaderWrapper btnStyle={btnStyle}>
          <Loader size={25} color={btnStyle === 'plain' ? '#008033' : '#fff'} />
        </LoaderWrapper>
      )}
    </ButtonElement>
  );
};

const getPadding = (level: ButtonLevel) => {
  switch (level) {
    case 1:
      return '14px';
    case 2:
      return '8px';
    case 3:
    default:
      return '6px';
  }
};

export const LoaderWrapper = styled.div<{ btnStyle: ButtonStyle }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  top: 2px;
  left: 2px;

  width: 27px;
  height: 27px;

  background-color: inherit;
  border-radius: 14px;

  > div {
    left: -12px;
  }
`;

const ButtonElement = styled.button<{
  fullWidth: boolean;
  level: ButtonLevel;
  withMargin?: boolean;
  btnStyle: ButtonStyle;
}>`
  position: relative;

  width: 31px;
  height: 31px;

  padding: ${(props) => getPadding(props.level)};

  border: 0;
  border-radius: 16px;
  background-color: ${(props) =>
    props.btnStyle === 'plain'
      ? 'transparent'
      : props.btnStyle === 'delete'
      ? props.theme.colors.danger.default
      : props.theme.colors.primary.default};
  line-height: 15px;
  color: ${(props) => (props.btnStyle === 'plain' ? props.theme.colors.primary.default : '#fff')};
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
    ${(props) =>
      props.btnStyle === 'plain'
        ? `background-color: ${props.theme.common.lightGray};`
        : `
      
        box-shadow: inset 0 0 1px 1px ${
          props.btnStyle === 'delete'
            ? props.theme.colors.danger.hover
            : props.theme.colors.primary.active
        };
      `}

    cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};

    &:before {
      left: -2px;
      right: -2px;
    }
  }

  &:focus {
    outline: ${(props) =>
      props.btnStyle === 'plain'
        ? '1px solid ' + props.theme.colors.primary.default
        : props.btnStyle === 'delete'
        ? '2px solid ' + props.theme.colors.danger.default
        : '2px solid ' + props.theme.colors.primary.default};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.defaultActive};
  }

  > svg {
    width: 15px;
    height: 15px;
  }
`;
