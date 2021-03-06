import { faHomeAlt } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabType, useTabContext } from 'modules/portal/context/Tab/TabContext';
import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { ContextMenuTriggerArea } from 'react-context-menu-hooks';
import styled from 'styled-components';
import { useEffectAsync } from 'utils/useEffectAsync';

import { JobDto } from '../../../../../../api/generated';
import { useJobTranslationsContext } from '../../../../context/JobTranslations/JobTranslationsContext';
import * as S from '../../styled';
import { jobContextMenuBridge } from './contextMenuBridge';

export const JobRow = ({ job }: { job: JobDto }) => {
  const itemRef = useRef(null);
  const { selectedJobId, selectJob, jobTree } = useTreeContext();
  const { addTab } = useTabContext();
  
  const { getJobIcon, language, loading: iconLoading } = useJobTranslationsContext();

  const [isSelected, setIsSelected] = useState<boolean>(selectedJobId === job.id);

  useEffectAsync( () => {
    if ( jobTree !== undefined ) {
      setIsSelected( selectedJobId === job.id );
    }
  }, [selectedJobId, job, jobTree])

  useEffect(() => {
    const handleDoubleClick = () => {
      selectJob(job);
      addTab({ id: job.id, type: TabType.JOB, name: job.name, jobType: job.type });
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
    selectJob(job);
  };

  return (
    <ContextMenuTriggerArea bridge={jobContextMenuBridge} data={{ job }}>
      <S.Item
        ref={itemRef}
        active={isSelected}
        key={job.id}
        onClick={handleSelection}>
        <S.TitleWrapper>
          {!iconLoading && getJobIcon(job.type, language) ? (
            <Img src={getJobIcon(job.type, language)} alt={job.type + ' icon'} />
          ) : (
            <FontAwesomeIcon icon={faHomeAlt} />
          )}

          <S.Title>{job.name}</S.Title>
        </S.TitleWrapper>
      </S.Item>
    </ContextMenuTriggerArea>
  );
};

const Img = styled.img`
  width: 15px;
  height: 15px;
`;
