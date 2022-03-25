import {Center, Row} from "../../../../../constants/globalStyles";
import styled from "styled-components";

export const Tabs = () => {
  return(
      <Wrapper>
        <Tab>project test rwsdsd</Tab>
        <Tab>project test</Tab>
        <Tab>project test</Tab>
        <Tab>project test</Tab>
        <Tab>project test</Tab>
      </Wrapper>
  )
}

const Wrapper = styled(Row)`
  background-color: ${(props) => props.theme.colors.background.secondaryMenu};
  height: 25px;
  width: 100%;
`

const Tab = styled(Center)`
  min-width: 100px;
  height: 100%;

  cursor: pointer;
  
  padding: 0 10px;
  
  color: #969696;

  border-right: 1px solid #e5e5e5;
`