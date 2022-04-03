import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { SortSelect } from 'components/Form/Select/SortSelect';

const Sort = <T extends unknown>({
  items,
  initialValue,
  onSelect
}: {
  items: Array<{
    label: ReactNode;
    value: T;
  }>;
  initialValue: T;
  onSelect: (newValue: T) => void;
}) => {
  const { t } = useTranslation(['portal']);

  const [selected, setSelected] = useState(initialValue);

  const onSelectInner = (newValue: T) => {
    setSelected(newValue);
    onSelect(newValue);
  };

  return (
    <Wrapper>
      {t('portal:menu.sort')}:
      <SortSelect options={items} selected={selected} onSelect={onSelectInner} />
    </Wrapper>
  );
};

export default Sort;

const Wrapper = styled.div`
  display: flex;
  gap: 2px;
`;
