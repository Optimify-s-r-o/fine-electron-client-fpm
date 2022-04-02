import { CloseButton } from 'components/Form/Button/CloseButton';
import { createContext, FormEventHandler, ReactNode, useContext, useState } from 'react';
import styled from 'styled-components';

interface Modal {
  content: ReactNode;
  footer?: ReactNode;
  title?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onClose?: () => boolean;
}

interface UseModalHook {
  showModal: (modal: Modal) => void;
  closeModal: () => void;
}

const ModalContext = createContext<UseModalHook>({
  showModal: () => {},
  closeModal: () => {}
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const showModal = (modal: Modal) => {
    setModals([...modals, modal]);
  };

  const closeModal = () => {
    const onClose = modals[modals.length - 1]?.onClose;
    if (!onClose || onClose()) setModals(modals.slice(0, -1));
  };

  const ModalInside = ({ modal }: { modal: Modal }) => (
    <>
      <ModalHeader>
        <span>{modal.title}</span>
        <CloseButton onClick={closeModal} />
      </ModalHeader>
      <ModalContent>{modal.content}</ModalContent>
      {modal?.footer && <ModalFooter>{modal.footer}</ModalFooter>}
    </>
  );

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <ModalContainer show={modals.length > 0}>
        <Overlay onClick={closeModal} />
        {modals.map((modal, key) => (
          <ModalWrapper key={key}>
            {modal.onSubmit ? (
              <form onSubmit={modal.onSubmit}>
                <ModalInside modal={modal} />
              </form>
            ) : (
              <ModalInside modal={modal} />
            )}
            {key !== modals.length - 1 && <ModalOverlay onClick={closeModal} />}
          </ModalWrapper>
        ))}
      </ModalContainer>
    </ModalContext.Provider>
  );
};

const useModal = (): UseModalHook => {
  const context = useContext(ModalContext);
  return context;
};

export default useModal;

const ModalContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

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

  background-color: rgba(0, 0, 0, 0.25);
`;

const ModalWrapper = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  min-width: 500px;
  min-height: 250px;

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

const ModalHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 12px 12px 32px;

  border-bottom: 1px solid ${(props) => props.theme.common.lightGray};
  color: #727272;

  > span {
    flex-grow: 1;
  }

  > button {
    border-radius: 99px;

    > svg {
      width: 23px;
      height: 23px;
    }
  }
`;

const ModalContent = styled.div`
  flex-grow: 1;
  padding: 16px 32px;
`;

const ModalFooter = styled.div`
  padding: 12px 32px;

  border-top: 1px solid ${(props) => props.theme.common.lightGray};
`;

const ModalOverlay = styled.div`
  position: absolute;

  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;

  background-color: rgba(0, 0, 0, 0.25);
`;
