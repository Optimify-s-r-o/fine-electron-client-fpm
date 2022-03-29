import styled from 'styled-components';
import { device } from './theme';

//FLEXBOX COMPONENTS
export const Flex = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const ColumnStart = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const ColumnCenter = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ColumnEnd = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const SpaceBetween = styled(Row)`
  flex-direction: row;
  justify-content: space-between;
`;

export const RowStart = styled(Row)`
  justify-content: flex-start;
`;

export const RowCenter = styled(Row)`
  justify-content: center;
`;

export const RowEnd = styled(Row)`
  justify-content: flex-end;
  align-items: end;
`;

export const RowAlignEnd = styled(Row)`
  align-items: flex-end;
`;

export const Center = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div<{
  fullSize?: boolean;
  topMargin?: boolean;
  noPadding?: number;
}>`
  box-sizing: border-box;

  height: ${(props) => (props.fullSize ? '100%' : 'auto')};

  margin-top: ${(props) => (props.topMargin ? '16px' : 'inherit')};
  padding: ${(props) => (props.noPadding ? '0px' : '8px 16px')};

  background-color: ${(props) => props.theme.common.content};
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.common.contentText};
`;

export const GridRow = styled.div<{ columns: number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.contentText};

  & > * {
    width: ${(props) => 100 / props.columns}%;

    @media ${device.large} {
      ${(props) => (props.columns > 2 ? `width: 50%;` : `width: 100%`)}
    }

    @media ${device.medium} {
      ${(props) => props.columns > 2 && `width: 100%;`}
    }
  }
  & + & {
    margin-top: 0;
  }
`;

export const GridColumn = styled.div<{ columns: number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.contentText};

  & > * {
    width: ${(props) => 100 / props.columns}%;

    @media ${device.large} {
      ${(props) => (props.columns > 2 ? `width: 50%;` : `width: 100%`)}
    }

    @media ${device.medium} {
      ${(props) => props.columns > 2 && `width: 100%;`}
    }
  }
  & + & {
    margin-top: 0;
  }
`;

export const GridItem = styled.div<{
  fill?: number;
  alignSelf?: string;
  smallerDisplayHide?: boolean;
  padding?: boolean;
}>`
  box-sizing: border-box;
  padding: 8px;

  ${(props) => props.hasOwnProperty('alignSelf') && `align-self: ${props.alignSelf};`}

  ${(props) => props.padding === false && `padding: 0;`}

  ${(props) => props.fill && `flex-grow: 1;`}


  @media ${device.large} {
    ${(props) => props.smallerDisplayHide && `display: none;`}
  }
`;

export const Form = styled.form`
  flex: 1 1 auto;
  height: 100%;
`;

export const FloatRight = styled.div`
  float: right;
`;
