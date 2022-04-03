import { Row, SpaceBetween } from '../../../../../constants/globalStyles';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';
import { Tab, TabType, useTabContext } from '../../../context/Tab/TabContext';
import { useNavigate } from 'react-router';
import { RoutesPath } from '../../../../../constants/routes';
import { matchPath, useLocation } from 'react-router-dom';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';

const SortableItem = SortableElement(
  ({ value, removeTab }: { value: Tab; removeTab: (tab: Tab) => void }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { getJobIcon, language } = useJobTranslationsContext();
    const name = encodeURIComponent(value.name);

    const path = `${value.type === TabType.PROJECT ? RoutesPath.PROJECTS : RoutesPath.JOBS}/${
      value.id
    }/${name}/general`;

    const handleNavigation = () => {
      navigate(path);
    };

    return (
      <SortableTab
        className="sortable-item"
        onClick={() => handleNavigation()}
        active={!!matchPath(pathname, path) ? 1 : 0}
        type={value.type}>
        <TitleWrapper>
          {value.type === TabType.PROJECT && <FontAwesomeIcon icon={faFolder} />}
          {value.type === TabType.JOB && (
            <Img src={getJobIcon(value.jobType, language)} alt={value.type + ' icon'} />
          )}
          <Title>{value.name}</Title>
        </TitleWrapper>
        <Icon onClick={() => removeTab(value)}>
          <FontAwesomeIcon icon={faTimes} />
        </Icon>
      </SortableTab>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, removeTab }: { items: Tab[]; removeTab: (tab: Tab) => void }) => {
    return (
      <Wrapper className="sortable-container">
        {items.map((value: Tab, index: number) => (
          <SortableItem
            key={`item-${value.id}-${index}`}
            index={index}
            value={value}
            removeTab={removeTab}
          />
        ))}
      </Wrapper>
    );
  }
);

export const Tabs = () => {
  const { tabs, setTabs, removeTab } = useTabContext();

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const temp = arrayMoveImmutable(tabs, oldIndex, newIndex);
    setTabs(temp);
  };
  return (
    <SortableList
      distance={2}
      items={tabs}
      onSortEnd={onSortEnd}
      removeTab={removeTab}
      axis={'x'}
      lockAxis={'x'}
      lockToContainerEdges={true}
      lockOffset={'0%'}
    />
  );
};

const Wrapper = styled(Row)`
  background-color: ${(props) => props.theme.sortablePanel.default};

  height: 3%;
  width: 100%;
`;

const TitleWrapper = styled(Row)`
  align-items: center;
  cursor: default;
`;

const Title = styled.span`
  margin-left: 5px;
  font-size: 14px;

  margin-bottom: 2px;
`;

const SortableTab = styled(SpaceBetween)<{ active: number; type: TabType }>`
  align-items: center;

  min-width: 130px;
  height: 100%;

  padding: 0 10px;

  background-color: #f8f8f8;
  color: #969696;

  border-right: 1px solid #e5e5e5;

  div svg {
    color: ${(props) =>
      props.type === TabType.PROJECT ? 'rgb(255 202 108 / 80%)' : 'rgba(143, 113, 52, 0.8)'};
    width: 14px;
  }

  > span > svg {
    color: #8a8a8a;

    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    `background-color: ${props.theme.common.content};
`}
`;

const Icon = styled.span`
  margin-left: 3px;

  svg {
    width: 12px;
    height: 12px;

    padding: 2px;
  }

  > svg:hover {
    color: #000;
    border-radius: 10px;
    background-color: #e3e3e3;
  }
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;
