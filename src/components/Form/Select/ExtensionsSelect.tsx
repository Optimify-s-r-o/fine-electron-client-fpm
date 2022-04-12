import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import styled from 'styled-components';
import { Column } from 'constants/globalStyles';
import { Control, Controller, FieldError } from 'react-hook-form';
import * as S from '../Input/styled';
import { ErrorMessage } from '../Input/ErrorMessage';
import { KeyboardEvent, useRef, useState } from 'react';

interface Option {
  readonly label: string;
  readonly value: string;
}

export const ExtensionsSelect = ({
  title,
  name,
  control,
  errors
}: {
  title: string;
  name: string;
  control: Control<any>;
  errors?: {
    extensions?: {
      value?: FieldError;
      label?: FieldError;
    }[];
  };
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minWidth: '100%',
      border: 0,
      boxShadow: 'none',
      background: '#008033'
    }),
    input: (provided: any) => ({
      ...provided,
      fontSize: 13
    }),
    multiValue: (provided: any) => {
      return {
        ...provided,
        backgroundColor: 'rgba(0, 0, 0, .05)',
        borderRadius: 5
      };
    },
    multiValueLabel: (provided: any) => ({
      ...provided,
      paddingRight: 6,
      color: '#008033'
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#8a8a8a',
      borderRadius: 5,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#dd0000',
        color: 'white'
      }
    })
  };

  const validate = (input: string) => {
    return input.charAt(0) === '.';
  };

  const [inputValue, setInputValue] = useState('');
  const innerValue = useRef<Option[]>([]);

  const handleChange = (
    value: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>,
    onChange: (value: string[]) => void
  ) => {
    innerValue.current = value as Option[];
    onChange(value.map((item) => item.value));
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        event.preventDefault();
        if (!inputValue || !validate(inputValue)) return;
        setInputValue('');
        const newValue = value
          ? [
              ...value.map((item) => ({ value: item, label: item })),
              { value: inputValue, label: inputValue }
            ]
          : [{ value: inputValue, label: inputValue }];
        innerValue.current = newValue;
        onChange(newValue.map((item) => item.value));
    }
  };

  return (
    <Column>
      {title && (
        <S.Wrapper>
          <S.Title htmlFor={name}>{title}</S.Title>
        </S.Wrapper>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <SelectContainer
              value={value ? value.map((item: string) => ({ value: item, label: item })) : []}
              inputValue={inputValue}
              onChange={(...props: any) => {
                handleChange(props[0], props[1], onChange);
              }}
              onInputChange={handleInputChange}
              onKeyDown={(event) => {
                handleKeyDown(event, value, onChange);
              }}
              placeholder=""
              isMulti
              isClearable
              styles={customStyles}
              components={{
                DropdownIndicator: null
              }}
              menuIsOpen={false}
            />
          );
        }}
      />
      <ErrorMessage name={name} errors={errors} />
    </Column>
  );
};

const SelectContainer = styled(CreatableSelect)`
  > div {
    border: 1px solid #d0d0d0;

    border-radius: 7px;

    background-color: white !important;
  }

  > div:hover {
    border: 1px solid rgba(129, 134, 131, 0.74);
    background-color: white !important;
  }

  div[id^='react-select'] > div {
    padding: 9px 0;
  }
`;
