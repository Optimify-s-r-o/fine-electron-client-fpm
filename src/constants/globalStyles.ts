import styled from 'styled-components';
import { device } from './theme';
import '../../node_modules/react-context-menu-hooks/src/ContextMenu.css';

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

export const CenterFullHeight = styled(Center)`
  height: 100%;
`;

export const FormFieldHelp = styled.p`
  margin: 8px 0 0;

  color: #727272;
  font-size: 13px;
`;

export const CardHeader = styled.div`
  margin-bottom: 5px;

  color: #727272;
  font-size: 13px;
`;

export const Card = styled.div<{
  fullSize?: boolean;
  topMargin?: boolean;
  noPadding?: boolean;
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
