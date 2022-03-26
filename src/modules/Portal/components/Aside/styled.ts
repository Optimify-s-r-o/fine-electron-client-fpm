import styled from "styled-components";
import {Column, Row, SpaceBetween} from "../../../../constants/globalStyles";

export const TitleWrapper = styled(Row)`
  align-items: center;
`

export const Wrapper = styled(Column)<{color: string}>`
  padding: 4px;
  box-sizing: border-box;

  svg:first-child {
    color: ${props => props.color};
  }


  svg {
    height: 15px;

    padding: 2px;

    color: #8a8a8a;

    cursor: pointer;
  }
`

export const Item = styled(SpaceBetween)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #eae9e9;
    border-radius: 5px;
  }
`

export const Title = styled.span`
  margin-left: 3px;
  font-size: 14px;

  margin-bottom: 2px;
`