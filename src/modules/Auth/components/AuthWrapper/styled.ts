import styled from "styled-components";
import {Center, Column, SpaceBetween} from "constants/globalStyles";
import {Link as ReactRouterLink} from "react-router-dom";

export const Wrapper = styled(Center)`
  background-color: rgb(243, 241, 241);
  min-height: 100vh;
`

export const Content = styled(Column)`
   padding: 15px 0;
`

export const Border = styled(Column)`
  position: relative;
  
  border-radius: 0 12px 12px;

  padding: 30px;
  min-width: 500px;
  min-height: 300px;

  background-color: ${props => props.theme.colors.background.content};
  box-shadow: 0 2px 7px 0 rgb(5 34 97 / 10%);
`

export const HelpDesk = styled.div`
  border-top: 1px solid #f1f1f1;
  align-items: center;
  text-align: center;
  padding-top: 12px;
  margin-top: 20px;
`

export const Info = styled.span`
  font-size: 10px;
  color: #3a3a3a;
`

export const Panel = styled(SpaceBetween)`
  position: absolute;
  top: -37px;
  left: 0;
`

export const LanguageWrapper = styled(Column)`
  position: absolute;
  right: -60px;
  top: 50px;
`

export const Language = styled(Center)<{active: number}>`
  width: 60px;
  height: 50px;
  
  cursor: pointer;
  
  background-color: ${(props) => props.theme.background.language.default};
  
  &:hover{
    background-color: ${(props) => props.theme.background.language.hover};
  }

  ${(props) =>
    props.active && `
            background-color: ${props.theme.background.language.active};
            
            &:hover {
                 background-color: ${props.theme.background.language.active};
            }
            
         `
}
`

export const Link = styled(ReactRouterLink)<{active: number}>`
	position: relative;
	display: block;
	border-radius: 3px 3px 0 0;
    background-color: ${(props) => props.theme.background.environment.default};
	color: ${(props) => props.theme.colors.contentText};
	margin-bottom: 0;
	padding: 8px 24px;
	text-decoration: none;
  
	&:hover {
		background-color: ${(props) => props.theme.background.environment.hover};
	}

	${(props) =>
    props.active && `
            background-color: ${props.theme.background.environment.active};
            
            &:hover {
                 background-color: ${props.theme.background.environment.active};
            }
            
         `
}
`;

export const Enviroment = styled.span`
  margin-left: 7px;
`
