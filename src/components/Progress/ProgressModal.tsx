import { ProgressRunFunction } from 'utils/hooks/useProgress';
import { Button } from 'components/Form/Button';
import useModal from 'utils/hooks/useModal';
import Progress from './Progress';
import styled from 'styled-components';
import { useRef } from 'react';

const ProgressModal = ({
  triggerText,
  titleText,
  run
}: {
  triggerText: string;
  titleText: string;
  run: ProgressRunFunction;
}) => {
  const modal = useModal();
  const finished = useRef(false);

  const innerRun: ProgressRunFunction = (addItem, setItemStatus, finish) => {
    run(addItem, setItemStatus, () => {
      finished.current = true;
      finish();
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          modal.showModal({
            title: titleText,
            content: (
              <Wrapper>
                <Progress run={innerRun} />
              </Wrapper>
            ),
            onClose: () => {
              return finished.current;
            }
          });
        }}>
        {triggerText}
      </Button>
    </>
  );
};

export default ProgressModal;

const Wrapper = styled.div`
  margin: -16px -32px;
`;
