import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";

export type PanelItem = {
    icon: IconDefinition, tooltip: string; isActive: boolean; callback: () => void;
}

export const Panel = ({sections}: { sections: PanelItem[] }) => {
    return (<div>
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
        </div>)
}


const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;

  height: calc(100vh - 32px);

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

  &:hover {
    &:before {
      content: '';
      position: absolute;
      background-color: ${props => props.theme.panel.hover};
      width: 8px;
      height: 30px;
      border-radius: 5px;
      top: 9px;
      bottom: 0;
      left: -3px;
    }
  }

  &:hover svg {
    color: ${(props) => props.theme.panel.hover};
  }


  ${(props) => props.isActive && `
      &:before{
          content: '';
          position: absolute;
          background-color: ${props.theme.panel.hover};
          width: 8px;
          height: 30px;
          border-radius: 5px;
          top: 9px;
          bottom: 0;
          left: -3px;
    }
    
      svg {
          color: ${props.theme.panel.hover};
      }
         `
    }

`;
