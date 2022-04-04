import styled from 'styled-components';
import { ReactNode, useEffect, useRef, useState } from 'react';

export const SortSelect = <T extends unknown>({
  options,
  selected,
  onSelect
}: {
  options: Array<{
    label: ReactNode;
    value: T;
  }>;
  selected: T;
  onSelect: (newValue: T) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <SelectContainer ref={ref}>
      <Value
        onClick={() => {
          setShowOptions(!showOptions);
        }}>
        {options.find((option) => option.value === selected)?.label ?? ''}
      </Value>
      <Options show={showOptions}>
        {options.map((option, key) => (
          <Option
            key={key}
            onClick={() => {
              onSelect(option.value);
              setShowOptions(false);
            }}
            selected={option.value === selected}>
            {option.label}
          </Option>
        ))}
      </Options>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  z-index: 99;

  svg {
    width: 17px;
    height: 17px;
  }
`;

const Value = styled.button`
  display: inline-block;

  margin: -6px 0;
  padding: 6px 8px;

  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.primary.default};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.common.lightGray};
  }
`;

const Options = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};

  position: absolute;
  z-index: 1;

  top: calc(100% + 6px);
  right: 0;
  left: 0;

  background-color: white;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow};

  overflow: hidden;
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 8px;

  background-color: ${(props) =>
    props.selected ? props.theme.colors.primary.default : 'transparent'};
  color: ${(props) => (props.selected ? 'white' : props.theme.text.gray)};
  text-align: center;

  cursor: pointer;

  svg {
    color: ${(props) => (props.selected ? 'white' : props.theme.text.gray)} !important;
  }

  &:hover {
    background-color: ${(props) =>
      props.selected ? props.theme.colors.primary.hover : props.theme.common.lightGray};
  }
`;
