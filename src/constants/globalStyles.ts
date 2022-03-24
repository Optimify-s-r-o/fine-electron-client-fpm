import styled from "styled-components";

//FLEXBOX COMPONENTS
export const Flex = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`


export const Row = styled(Flex)`
  flex-direction: row;
  align-items: center;
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
