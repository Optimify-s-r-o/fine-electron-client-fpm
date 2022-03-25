import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export const Panel = ({sections}: { sections: any }) => {
    return (
        <div>
            <Sections>
                <ReactTooltip/>
                {sections?.map((section: any, key: number) => {
                    return (
                        <SectionWrapper
                            key={key}
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                section.callback(e);
                            }}
                        >
                            <Icon>
                                <p data-tip={section.tooltip}>
                                    <FontAwesomeIcon icon={section.icon}/>
                                </p>
                            </Icon>
                        </SectionWrapper>
                    );
                })}
            </Sections>
        </div>
    )
}


const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;

  height: calc(100vh - 30px);

  background-color: ${(props) => props.theme.colors.background.secondaryMenu};
  border-right: 1px solid ${(props) => props.theme.border.default};
`;

const SectionWrapper = styled.div`
  position: relative;

  width: 48px;
  height: 44px;

`

const Icon = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 48px;
  height: 48px;

  svg {
    font-size: 20px;
    color: ${(props) => props.theme.panel.icon};
  }
  
`;
