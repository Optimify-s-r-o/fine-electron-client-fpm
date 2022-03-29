import { Row, SpaceBetween } from '../../../../../constants/globalStyles';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';

const SortableItem = SortableElement(({ value }: { value: any }) => {
  return (
    <Tab className="sortable-item">
      <TitleWrapper>
        <FontAwesomeIcon icon={faFolder} />
        <Title>{value}</Title>
      </TitleWrapper>
      <FontAwesomeIcon icon={faTimes} />
    </Tab>
  );
});

const SortableList = SortableContainer(({ items }: { items: any }) => {
  return (
    <Wrapper className="sortable-container">
      {items.map((value: string, index: number) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </Wrapper>
  );
});

export const Tabs = () => {
  const [state, setState] = useState<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const temp = arrayMoveImmutable(state, oldIndex, newIndex);
    setState(temp);
  };
  return (
    <SortableList
      items={state}
      onSortEnd={onSortEnd}
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
`;

const Title = styled.span`
  margin-left: 3px;
  font-size: 14px;

  margin-bottom: 2px;
`;

const Tab = styled(SpaceBetween)`
  align-items: center;

  min-width: 100px;
  height: 100%;

  cursor: pointer;

  padding: 0 10px;

  background-color: #f8f8f8;
  color: #969696;

  border-right: 1px solid #e5e5e5;

  svg {
    width: 12px;
    height: 12px;

    padding: 2px;
  }

  div svg {
    color: rgb(255 202 108 / 80%);
    width: 14px;
  }

  > svg {
    color: #8a8a8a;

    cursor: pointer;
  }

  > svg:hover {
    color: #000;
    border-radius: 10px;
    background-color: #e3e3e3;
  }
`;
