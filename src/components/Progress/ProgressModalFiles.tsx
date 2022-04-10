import { ProgressRunFunction } from 'utils/hooks/useProgress';
import { PlainButton } from 'components/Form/Button/PlainButton';
import useModal from 'utils/hooks/useModal';
import Progress from './Progress';
import styled from 'styled-components';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';

export type ProgressRunFunctionWithFiles = (
  files: File[] | null,
  ...params: Parameters<ProgressRunFunction>
) => ReturnType<ProgressRunFunction>;

const ProgressModalFiles = ({
  triggerText,
  triggerIcon,
  titleText,
  run
}: {
  triggerText: string;
  triggerIcon?: IconDefinition;
  titleText: string;
  run: ProgressRunFunctionWithFiles;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modal = useModal();
  const finished = useRef(false);
  const files = useRef<FileList | null>(null);

  const innerRun: ProgressRunFunction = (addItem, setItemStatus, finish) => {
    run(files.current ? Array.from(files.current) : [], addItem, setItemStatus, () => {
      finished.current = true;
      files.current = null;
      finish();
    });
  };

  return (
    <label>
      <PlainButton
        type="button"
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
        icon={triggerIcon}>
        {triggerText}
      </PlainButton>
      <input
        ref={fileInputRef}
        id="import-data"
        type="file"
        multiple
        style={{ display: 'none' }}
        autoComplete={'off'}
        tabIndex={-1}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            files.current = e.target.files;
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
          }
        }}
      />
    </label>
  );
};

export default ProgressModalFiles;

const Wrapper = styled.div`
  margin: -16px -32px;
`;
