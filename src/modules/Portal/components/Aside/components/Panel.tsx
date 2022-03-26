import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";

export type PanelItem = {
    icon: IconDefinition, tooltip: string; isActive: boolean; callback: () => void;
}

export const Panel = ({sections}: { sections: PanelItem[] }) => {
    return (
            <Sections>
                <ReactTooltip/>
                {sections.map((item: PanelItem, key: number) => {
                    return (<SectionWrapper
                            key={key}
                            onClick={() => item.callback()}
                        >
                            <Icon isActive={item.isActive}>
                                <p data-tip={item.tooltip}>
                                    <FontAwesomeIcon icon={item.icon}/>
                                </p>
                            </Icon>
                        </SectionWrapper>);
                })}
            </Sections>
        )
}


const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;

  height: 100%;

  background-color: ${(props) => props.theme.colors.background.secondaryMenu};
  border-right: 1px solid ${(props) => props.theme.border.default};
`;

const SectionWrapper = styled.div`
  position: relative;

  width: 48px;
  height: 44px;

`

const Icon = styled.div<{ isActive?: boolean }>`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 48px;
  height: 48px;

  svg {
    font-size: 20px;
    color: ${(props) => props.theme.panel.default};
  }
  
  &:hover svg {
    color: ${(props) => props.theme.panel.hover};
  }


  ${(props) => props.isActive && `
    
      svg {
          color: ${props.theme.panel.hover};
      }
         `
    }

`;
