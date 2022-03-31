import styled from 'styled-components';
import { Column, Row, SpaceBetween } from '../../../../constants/globalStyles';

export const TitleWrapper = styled(Row)`
  align-items: center;
`;

export const Wrapper = styled(Column)<{ color: string }>`
  height: 100%;

  padding: 4px;
  box-sizing: border-box;

  div > svg:first-child {
    color: ${(props) => props.color};
  }
`;

export const Items = styled.div`
  flex-grow: 1;
`;

export const Item = styled(SpaceBetween)<{ active: boolean }>`
  position: relative;

  align-items: center;

  padding: 0 2px;

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.common.lightGray};
    box-shadow: 0 0 0 2px ${(props) => props.theme.common.lightGray};
  }

  svg {
    height: 15px;

    padding: 2px;

    color: #8a8a8a;

    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    `
      z-index: 1;
      background-color: ${props.theme.colors.primary.default};
      box-shadow: 0 0 0 2px ${props.theme.colors.primary.default};
      color: #fff;

      &:hover {
        background-color: ${props.theme.colors.primary.default};
        box-shadow: 0 0 0 2px ${props.theme.colors.primary.default}, 0 0 1px 1px ${props.theme.colors.primary.active};
      }

      svg {
        color: #fff;
      }
    `}
`;

export const Title = styled.span`
  margin-left: 3px;
  font-size: 14px;

  margin-bottom: 2px;
`;
