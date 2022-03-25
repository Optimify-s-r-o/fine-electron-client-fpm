import {useState} from "react";
import styled from "styled-components";
import {Column, Row, SpaceBetween} from "../../../../../constants/globalStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/pro-solid-svg-icons";
import {faAngleRight} from "@fortawesome/pro-light-svg-icons";

export const Projects = () => {
    const [state] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])
    return (<Wrapper>
        {state.map((item, key) => {
            return (<Item key={key}>
                <TitleWrapper>
                    <FontAwesomeIcon
                        icon={faFolder}
                    />
                    <Title>{item}</Title>
                </TitleWrapper>
                <FontAwesomeIcon icon={faAngleRight}/>
            </Item>)
        })}
    </Wrapper>)
}

const TitleWrapper = styled(Row)`
  align-items: center;
`

const Wrapper = styled(Column)`
  padding: 4px 0px;

  svg:first-child {
    color: rgb(255 202 108 / 80%);
    width: 14px;
  }


  svg {
    width: 12px;
    height: 12px;

    padding: 2px;

    color: #8a8a8a;

    cursor: pointer;
  }
`

const Item = styled(SpaceBetween)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  
  border-bottom: 1px solid #f1f1f1;
`

const Title = styled.span`
  margin-left: 3px;
  font-size: 14px;

  margin-bottom: 2px;
`