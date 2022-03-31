import { MouseEvent, useEffect, useRef } from 'react';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { TabType, useTabContext } from 'modules/portal/context/Tab/TabContext';
import * as S from '../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt } from '@fortawesome/pro-solid-svg-icons';
import { JobDto } from '../../../../../../api/generated';
import { ContextMenuTriggerArea } from 'react-context-menu-hooks';
import { jobContextMenuBridge } from './contextMenuBridge';

export const JobRow = ({ job }: { job: JobDto }) => {
  const itemRef = useRef(null);
  const { selectedJobId, selectJob } = useTreeContext();
  const { addTab } = useTabContext();

  useEffect(() => {
    const handleDoubleClick = () => {
      selectJob(job.id);
      addTab({ id: job.id, type: TabType.JOB, name: job.name });
    };

    const item = itemRef?.current as any;

    item?.addEventListener('dblclick', handleDoubleClick);

    return () => {
      item?.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [itemRef, addTab, job, selectJob]);

  //TODO MARA
  // je potreba pridat strankovani - tam chybi i UI
  // pridat routovani
  // umoznit pohyb sipek
  // Pozor na to, ze muze byt dlouhy nazev, zkracujme ho aby se vesel na jeden radek

  const handleSelection = (_event: MouseEvent<HTMLDivElement>) => {
    selectJob(job.id);
  };

  return (
    <ContextMenuTriggerArea bridge={jobContextMenuBridge} data={{ job }}>
      <S.Item
        ref={itemRef}
        active={selectedJobId === job.id}
        key={job.id}
        onClick={handleSelection}>
        <S.TitleWrapper>
          <FontAwesomeIcon icon={faHomeAlt} />
          <S.Title>{job.name}</S.Title>
        </S.TitleWrapper>
      </S.Item>
    </ContextMenuTriggerArea>
  );
};
