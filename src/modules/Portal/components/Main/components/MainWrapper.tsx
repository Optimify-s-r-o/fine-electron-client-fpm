import styled from "styled-components";
import {Column, Row} from "constants/globalStyles";
import {ReactNode} from "react";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Navigation, NavigationItem} from "./Navigation";

export const MainWrapper = ({
                                actionNode, icon, children, navigation, title, titleNode
                            }: { actionNode?: ReactNode, icon?: IconDefinition, children: ReactNode, navigation: NavigationItem[], title?: string, titleNode?: ReactNode }) => {
    return (<Wrapper>
        <PageHeader>
            <PageTitle>
                <TitleSection>
                    {titleNode ? titleNode : <TitleWrapper>
                        {icon && <FontAwesomeIcon icon={icon} color={"#737373"}/>}
                        {title && <TitleName>{title}</TitleName>}
                    </TitleWrapper>}
                </TitleSection>
                {actionNode && <PageTitleActions>
                    {actionNode}
                </PageTitleActions>}
            </PageTitle>
            <Navigation
                items={navigation}></Navigation>
        </PageHeader>
        {children}
    </Wrapper>)
}

export const Wrapper = styled(Column)`
  height: 97%;
`

export const TitleWrapper = styled(Row)`
  align-items: center;

  svg {
    color: ${(props) => props.theme.header.color};
  }
`

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background-color: ${(props) => props.theme.header.default};
`;


export const PageTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 12px 24px;

  color: ${(props) => props.theme.header.color};
  font-size: 1.5rem;
  font-weight: 500;

  > svg {
    margin-right: 16px;
  }
`;

export const PageTitleActions = styled.div`
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -2px;
  margin-bottom: -1px;

  font-size: 1rem;
`;

export const TitleSection = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const TitleName = styled.div`
  margin: 0 2px 0 8px;
  color: ${(props) => props.theme.header.color};
`;

