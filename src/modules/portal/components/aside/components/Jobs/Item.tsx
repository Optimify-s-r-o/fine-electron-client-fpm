import { MouseEvent, useEffect, useRef } from 'react';
import { useTreeContext } from '../../../../context/Tree/TreeContext';
import { TabType, useTabContext } from '../../../../context/Tab/TabContext';
import * as S from '../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt } from '@fortawesome/pro-solid-svg-icons';
import { JobDto } from '../../../../../../api/generated';

export const JobRow = ({ job }: { job: JobDto }) => {
  const itemRef = useRef(null);
  const { selectedJobId, selectJob } = useTreeContext();
  const { addTab } = useTabContext();

  useEffect(() => {
    (itemRef?.current as any)?.addEventListener('dblclick', handleDoubleClick);

    return () => {
      (itemRef?.current as any)?.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [itemRef]);

  const handleDoubleClick = () => {
    selectJob(job.id);
    addTab({ id: job.id, type: TabType.JOB, name: job.name });
  };

  //TODO MARA
  // je potreba pridat strankovani - tam chybi i UI
  // pridat routovani
  // umoznit pohyb sipek
  // Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek

  const handleSelection = (_event: MouseEvent<HTMLDivElement>) => {
    selectJob(job.id);
  };

  return (
    <S.Item
      ref={itemRef}
      active={selectedJobId === job.id ? 1 : 0}
      key={job.id}
      onClick={handleSelection}>
      <S.TitleWrapper>
        <FontAwesomeIcon icon={faHomeAlt} />
        <S.Title>{job.name}</S.Title>
      </S.TitleWrapper>
    </S.Item>
  );
};
