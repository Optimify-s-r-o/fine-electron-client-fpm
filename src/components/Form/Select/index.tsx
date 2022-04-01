import ReactSelect from 'react-select';
import React from 'react';
import styled from 'styled-components';

import { Column } from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import * as S from '../Input/styled';
import { AdminEditUserRequest } from '../../../api/generated';
import { ErrorMessage } from '../Input/ErrorMessage';

export type ReactSelectOption = {
  label: string;
  value: string;
};
export const Select = ({
  options,
  title,
  name,
  selectWidth,
  control,
  errors,
  isMulti = false
}: {
  options: ReactSelectOption[];
  title: string;
  name: string;
  control: Control<any>;
  selectWidth?: number;
  isMulti?: boolean;
  errors: FieldErrors<AdminEditUserRequest>;
}) => {
  const { t } = useTranslation(['form']);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#008033' : state.isFocused ? '#008033' : 'white',
      color: state.isFocused ? 'white' : state.isSelected ? 'white' : 'black',
      padding: 5,
      ':active': {
        ...provided[':active'],
        backgroundColor: '#008033'
      }
    }),
    control: (provided: any) => ({
      ...provided,
      minWidth: selectWidth ? selectWidth : 150,
      border: 0,
      boxShadow: 'none',
      background: '#008033'
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided
    })
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
              value={options && options.filter((c) => value && value.includes(c?.value))}
              onChange={(val: any) => onChange(val.map((c: any) => c.value))}
              options={options}
              placeholder={t('form:select.placeholder')}
              isMulti={isMulti}
              styles={customStyles}
            />
          );
        }}
      />
      <ErrorMessage name={name} errors={errors} />
    </Column>
  );
};

const SelectContainer = styled(ReactSelect)`
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
