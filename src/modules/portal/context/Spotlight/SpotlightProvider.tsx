import { SpotlightContext } from './SpotlightContext';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import { useTreeContext } from '../Tree/TreeContext';
import { useTranslation } from 'react-i18next';
import { useKeyPress } from '../../../../utils/keyHandler/useKeyPress';

export type SpotlightInput = {
  spotlight: string;
};

export const SpotlightProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation(['form']);

  const [show, setShow] = useState<boolean>(false);
  const { queryProjects } = useTreeContext();

  useKeyPress('Escape', (_event) => setShow(false), []);

  const onSubmit = async (data: SpotlightInput) => {
    setShow(false);

    if (data?.spotlight) {
      await queryProjects(`name=${data.spotlight}`);
    }
  };

  const { register, handleSubmit } = useForm<SpotlightInput>();

  const showSpotlight = () => {
    setShow(true);
    document.getElementById('spotlight')?.focus();
  };

  const closeSpotlight = () => {
    setShow(false);
  };

  return (
    <SpotlightContext.Provider value={{ showSpotlight, closeSpotlight }}>
      {children}
      <SpotlightWrapper show={show}>
        <Overlay onClick={closeSpotlight} />
        <ModalWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              <InputContainer>
                <Input
                  {...register('spotlight')}
                  id={'spotlight'}
                  type={'text'}
                  placeholder={t('form:input.spotlight')}
                  autoFocus
                />
                <Icon icon={faSearch} onClick={handleSubmit(onSubmit)} />
              </InputContainer>
            </ModalContent>
          </form>
        </ModalWrapper>
      </SpotlightWrapper>
    </SpotlightContext.Provider>
  );
};

const InputContainer = styled.div`
  position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;

  left: 20px;
  top: 0;
  bottom: 0;

  margin: auto;

  color: #b0b0b0;

  font-size: 25px;
  cursor: pointer;
`;

const SpotlightWrapper = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};

  position: fixed;
  z-index: 9999;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Overlay = styled.div`
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.36);
`;

const ModalWrapper = styled.div`
  position: absolute;

  top: 20%;

  left: 0;
  right: 0;
  margin: auto;

  width: 600px;

  background-color: ${(props) => props.theme.colors.background.content};
  border-radius: 12px;
  box-shadow: 0 2px 7px 0 rgb(5 34 97 / 10%);

  overflow: hidden;

  > form {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
  }
`;

const ModalContent = styled.div`
  flex-grow: 1;
`;

export const Input = styled.input`
  box-sizing: border-box;

  width: 100%;

  padding: 16px 65px;
  font-size: 20px;

  border: 1px solid #d0d0d0;
  border-radius: 7px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);

  outline: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #b0b0b0;
    font-weight: 300;
    font-size: 20px;
  }

  :-ms-input-placeholder {
    color: #b0b0b0;
    font-weight: 300;
  }
`;
