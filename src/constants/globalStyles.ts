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

export const RowAlignCenter = styled(Row)`
  align-items: center;
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
  border-radius: 7px;
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
  padding: 16px;

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

export const H2 = styled.h2`
  margin: 0 0 1rem;

  color: ${(props) => props.theme.header.color};
  font-size: 21px;
  font-weight: 400;
`;

export const KeyValueTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  font-size: 13px;

  tbody {
    background-color: ${(props) => props.theme.common.content};
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.common.contentText};
  }

  td {
    padding: 9px 16px 10px;

    border-bottom: 1px solid #e4e4e45c;

    white-space: nowrap;
  }

  td:first-child {
    color: ${(props) => props.theme.header.color};
  }

  td:last-child {
    width: 100%;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:first-child td:first-child {
    border-top-left-radius: 7px;
  }

  tr:first-child td:last-child {
    border-top-right-radius: 7px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 7px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 7px;
  }
`;

export const HR = styled.hr`
  margin: 16px 0;

  border: none;
  border-top: 1px solid ${(props) => props.theme.common.lightGray};
`;

export const Gap = styled(Row)`
  gap: 8px;
`;

export const GapAlignCenter = styled(RowAlignCenter)`
  gap: 8px;
`;
