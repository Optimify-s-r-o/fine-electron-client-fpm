import ReactSelect from 'react-select';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Column } from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';

export type ReactSelectOption = {
  label: string;
  value: string;
};
export const Select = ({
  options,
  label,
  name,
  formik,
  selectWidth
}: {
  options: ReactSelectOption[];
  label: string;
  name: string;
  formik: any;
  selectWidth?: number;
}) => {
  const { t } = useTranslation(['form']);
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? 'rgba(19,33,150,0.95)'
          : state.isFocused
          ? '#717AA3'
          : 'white',
        color: state.isFocused ? 'white' : state.isSelected ? 'white' : 'black',
        padding: 5,
        ':active': {
          ...provided[':active'],
          backgroundColor: 'rgba(19,33,150,0.95)'
        }
      }),
      control: (provided: any) => ({
        ...provided,
        minWidth: selectWidth ? selectWidth : 150,
        border: 0,
        boxShadow: 'none',
        background: '#132196'
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided
      })
    }),
    []
  );

  return (
    <Column>
      {label && <Title htmlFor={name}>{label}</Title>}
      <MedSelect
        onChange={(option: any) => formik.setFieldValue(name, option?.value)}
        options={options}
        value={options?.find((i: ReactSelectOption) => i?.value === formik.values[name])}
        styles={customStyles}
        placeholder={t('form:select.placeholder')}
      />
    </Column>
  );
};

const Title = styled.label`
  font-size: 15px;
  color: ${(props) => props.theme.text.blue};
  padding-bottom: 3px;
  padding-left: 1px;
`;

const MedSelect = styled(ReactSelect)`
  > div {
    border: 1px solid ${(props) => props.theme.border.blue};
    border-radius: 15px;
    background-color: white !important;
  }

  > div:hover {
    border: 1px solid ${(props) => props.theme.border.blue};
    background-color: white !important;
  }

  > div:active,
  > div:focus {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.border.blue};
    background-color: white !important;
  }

  div[id^='react-select'] > div {
    padding: 9px 0;
  }
`;
